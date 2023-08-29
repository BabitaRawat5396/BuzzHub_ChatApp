import { deleteChat } from '../../../../Services/Operations/ChatAPI';
import { setRefreshSideBar, setShowUserChat } from '../../../../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileInfo = () => {

  const {showUserChat,user} = useSelector((state) => state.profile)
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDeleteChat = async() => {
    console.log("showUserChat",showUserChat);
    const response = await deleteChat({
      userId:showUserChat?.users[0]._id === user._id ? showUserChat?.users[1]?._id  : showUserChat?.users[0]?._id,
      isGroupChat:showUserChat?.isGroupChat,
      token
    })
    dispatch(setRefreshSideBar(response))
  }

  return (
    <div className='absolute bg-slate-700 py-6 text-sm top-12 right-5 rounded-lg'>
      <p className='border-b px-6 pb-2'>Contact Info</p>
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