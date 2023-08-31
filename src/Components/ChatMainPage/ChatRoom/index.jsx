
import { addMessage, getAllMessages } from '../../../Services/Operations/MessageAPI';
import { setNotification, setRefreshSideBar, setShowSideBar } from '../../../Slices/userSlice';
import ChatRoomBackground from '../../../Assets/ChatRoomBackground.jpg';
import useOnClickOutside from '../../../Hooks/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import ChatHeading from '../ChatRoom/ChatHeading';
import { BsEmojiSmile } from 'react-icons/bs';
import MessageStartPage from './NoMessage';
import {VscSend} from 'react-icons/vsc';
import MessageBody from './MessageBody';
import Picker from '@emoji-mart/react';
import io from 'socket.io-client';
import data from '@emoji-mart/data';
import ContactInfo from './ChatHeading/ContactInfo';

const ChatRoom = () => {

  const { showUserChat, user, notification, showContactInfo } = useSelector((state) => state.profile);
  const [showEmojiPalette, setShowEmojiPalette] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const {token}  = useSelector((state) => state.auth);
  const [allMessages, setAllMessages] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [message,setMessage] = useState("");
  const selectedChatCompare = useRef(null);
  const emojiRef = useRef();
  const dispatch = useDispatch();
  const socket = useRef();

  const handleShowEmoji = () => {
    setShowEmojiPalette(!showEmojiPalette);
  }

  const handleEmojiClick = (emoji) => {
    const selectedEmoji = emoji.native;
    setMessage((prevMessage) => prevMessage + selectedEmoji);
  }

  const typingHandler = (event) => {

    setMessage(event.target.value);

    if(!socketConnected) return;

    if(!typing){
      setTyping(true);
      socket.current.emit("typing",showUserChat._id)
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if(timeDiff >= timerLength && typing){
        socket.current.emit("stop typing", showUserChat._id);
        setTyping(false);
      }
    },timerLength);
  }

  const handleSendMessage = async(e) => {
    e.preventDefault();
    socket.current.emit("stop typing", showUserChat._id);

    const response = await addMessage({chatId:showUserChat._id, content:message},token);
    setMessage("");
    
    socket.current.emit("new message",response);

    setAllMessages([...allMessages,response]);
    dispatch(setRefreshSideBar(response));
  }

  const fetchAllMessages = async() =>{
    const response = await getAllMessages({
      chatId:showUserChat._id,
    });
    
    setAllMessages(response);
    socket.current.emit('join chat',showUserChat._id)
  }

  useOnClickOutside(emojiRef,() => {
    setShowEmojiPalette(false);
  });

  
  useEffect(() => {
    if(showUserChat){
      fetchAllMessages();
    }
    selectedChatCompare.current = showUserChat;
  },[showUserChat]);

  useEffect(() => {
    socket.current = io("https://buzzhub-backend.onrender.com");
    socket.current.emit("setup",user);
    socket.current.on("connected",() => setSocketConnected(true));
    socket.current.on("typing",() => setIsTyping(true));
    socket.current.on("stop typing",() => setIsTyping(false));
  },[]);
  
  useEffect(() => {
    socket.current.on("message recieved",(newMessageRecieved) => {

      // if some other user has messaged and it's chat is not opened only then notification will be send
      if(!selectedChatCompare.current  || selectedChatCompare.current._id !== newMessageRecieved.chat._id){
        if (!notification.includes(newMessageRecieved)) {
          dispatch(setNotification([...notification, newMessageRecieved]));
          dispatch(setRefreshSideBar(true))
        }

      }else{
        setAllMessages(prevMessages => [...prevMessages, newMessageRecieved]);
      }
    })
  }, [])

  
  return (
    <div className='h-full w-full bg-[#f0f0f0] '>
      {
        showUserChat ? (showContactInfo ? <ContactInfo/> : (
          <div className='h-full grid grid-rows-[11.5%,77%,11.5%] '>

            {/* Chat Heading Section*/}
            <ChatHeading isTyping={isTyping}/>

            {/* Chat Messages Section */}
            <div className='bg-[#f8f8f8] overflow-y-auto'
              style={{ 
                backgroundImage: `url(${ChatRoomBackground})`, 
                backgroundSize: '40%',
                backgroundRepeat: 'no-repeat', 
                backgroundPosition: 'center bottom',
              }}>
              <MessageBody allMessages={allMessages} typing={typing}/>
            </div>
            
            {/* Chat Input Section */}
            <div className='w-full flex items-center gap-3 px-4 bg-[#91819e] py-2'>
              <div className='relative' ref={emojiRef}>
                <BsEmojiSmile 
                  onClick={handleShowEmoji} 
                  className=' text-2xl text-[#eee2e2] rounded-full inline-flex justify-center items-center cursor-pointer'
                  />
                  <div>
                  {
                    showEmojiPalette && (
                      <div className='absolute bottom-10' style={{ maxHeight:'365px', overflow: 'auto' }}>
                        <Picker data={data} onEmojiSelect={handleEmojiClick} />
                      </div>
                    )
                  }
                </div>
              </div>
              <form onSubmit={handleSendMessage} className='w-full contents '>
                <input 
                  type='text' 
                  placeholder='Type your message here...' 
                  className=' py-2 bg-transparent w-full outline-none border px-4 bg-white rounded-xl text-sm'
                  value={message}
                  onChange={typingHandler}
                  />
                <button type='submit'> <VscSend className='text-2xl text-white rounded-full'/> </button>
              </form>
              
            </div>
          </div>
        )) : (
          <MessageStartPage/>
        )
      }
    </div>
  );
};

export default ChatRoom;
