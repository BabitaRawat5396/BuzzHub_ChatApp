import { deleteChat } from '../../../../Services/Operations/ChatAPI';
import { setRefreshSideBar, setShowContactInfo, setShowSideBar, setShowUserChat } from '../../../../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileInfo = () => {

  const {showUserChat,user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeleteChat = async() => {
    const response = await deleteChat({
      userId:showUserChat?.users[0]._id === user._id ? showUserChat?.users[1]?._id  : showUserChat?.users[0]?._id,
      isGroupChat:showUserChat?.isGroupChat,
      chatId:showUserChat._id
    },token)
    dispatch(setRefreshSideBar(response))
    dispatch(setShowUserChat(null))
    dispatch(setShowSideBar(true));
  }

  return (
    <div className='absolute bg-[#7c799a] border border-white w-52 py-6 text-sm top-12 right-5 rounded-lg'>
      <p 
        className='border-b px-6 pb-2 cursor-pointer'
        onClick={() => dispatch(setShowContactInfo(true))}
        >Contact Info</p>
      <p 
        className='border-b px-6 py-3 cursor-pointer'
        onClick={() => dispatch(setShowUserChat(false))}
        > 
        Close Chat</p>
      <p className='px-6 pt-2' onClick={handleDeleteChat}>Delete Chat</p>
    </div>
  )
}

export default ProfileInfo