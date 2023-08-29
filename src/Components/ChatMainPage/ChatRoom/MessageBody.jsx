
import { isLastMessage } from '../../../utils/ChatLogics';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const MessageBody = ({allMessages}) => {

  const {user} = useSelector((state) => state.profile);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[allMessages]);

  return (
    <div className='flex flex-col'>
    {
      allMessages && allMessages.map((message, index) => (
        <div key={index} ref={scrollRef} className={`my-1 ${message.sender._id === user._id ? 'ml-auto' : 'mr-auto'}`}>
          <div className='flex'>
            {
              message.sender._id !== user._id && isLastMessage(allMessages,message ,index) ? (
                <div className={`text-center mb-1`}>
                  <img src={message.sender.profileImage} alt={`${message.sender.name}'s Profile`}
                    className="w-8 h-8 rounded-full object-cover inline-block mr-2"/>
                </div> ) : (
                <div className='w-11'></div>)
            }
            <div className={` text-xs px-3 py-2 rounded-2xl ${ message.sender._id === user._id ? 'bg-[#7c799a] text-white': 'bg-slate-700 text-white'}`}>
              <p>{message.content}</p>

            </div>
          </div>
        </div>)
      )
    }
    </div>
          
  )
}

export default MessageBody