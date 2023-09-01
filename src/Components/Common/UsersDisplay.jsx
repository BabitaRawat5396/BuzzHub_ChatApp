
import { setLoading, setNotification, setShowSideBar, setShowUserChat } from '../../Slices/userSlice';
import { fetchUsersAllChats } from '../../Services/Operations/ChatAPI';
import { formatTimestamp } from '../../utils/TimeConversion';
import { useDispatch, useSelector } from 'react-redux';
import GroupImage from '../../Assets/GroupImage.png';
import useWindowSize from '../../Hooks/windowSize';
import { useEffect, useState } from 'react';


const UsersDisplay = () => {

  const {user, refreshSideBar, notification} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const windowSize = useWindowSize();
  const dispatch = useDispatch();
  
  const fetchProfiles = async() => {
    const response = await fetchUsersAllChats(token);
    setUsers(response);
  }

  useEffect(() => {
    
    fetchProfiles();
  },[refreshSideBar])

  useEffect(() => {
    dispatch(setLoading(true));
    
    fetchProfiles();
    dispatch(setLoading(false))

  },[]);

  const truncateWords = (text, maxWords) => {
    const words = text.split(' ');
    const truncatedText = words.slice(0, maxWords).join(' ');
    return truncatedText + (words.length > maxWords ? ' ...' : '');
  };

  
  return (
    <div className='w-full my-2 px-4'>
      {
        users && users.map((item,index) => (
          <div key={index} 
            className='mt-1 text-sm'
            onClick={() =>  {
              const updatedNotifications = notification.filter((notif) => notif.chat === item);
              dispatch(setNotification(updatedNotifications));
              dispatch(setShowUserChat(item));
              if(windowSize.width < 768){
                dispatch(setShowSideBar(false))
              }
            }}>
            {
              item.userName !== user.userName && 
              (
                item.isGroupChat ? (
                <div
                  className='flex items-center gap-4 pt-2 w-full cursor-pointer'
                  >
                  <img
                    src={item?.groupImage || GroupImage}
                    alt='avatar' 
                    className='object-cover w-9 rounded-full aspect-square'
                    />
                  <div className={`w-full ${index !== users.length -1 ? "border-b border-white border-opacity-20 pb-3" : ""}`}>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p className='text-white'>{item?.chatName}</p>
                        <p className='text-xs text-slate-600'><span className=' font-bold text-slate-700'>{item?.latestMessage?.sender?.userName}</span>: {truncateWords(item?.latestMessage?.content, 6)}</p>
                      </div>
                      <p className='whitespace-nowrap text-xs text-slate-600'>{item?.latestMessage?.createdAt && formatTimestamp(item?.latestMessage?.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  className='flex items-center gap-4 pt-2 w-full cursor-pointer'
                  >
                  <img
                    src={item?.users[0]?._id === user._id ? item?.users[1]?.profileImage  : item?.users[0]?.profileImage} 
                    alt='avatar' 
                    className='object-cover w-9 rounded-full aspect-square'
                    />
                  <div className={`w-full ${index !== users.length -1 ? "border-b border-white border-opacity-20 pb-3" : ""}`}>
                    <div className='flex justify-between items-center'>
                      <p className=' whitespace-nowrap text-white'>{item?.users[0]._id === user._id ? item?.users[1]?.userName  : item?.users[0]?.userName }</p>
                      <p className='whitespace-nowrap text-xs text-slate-600'>{item?.latestMessage?.createdAt && formatTimestamp(item?.latestMessage?.createdAt)}</p>
                    </div>
                    <p className='text-xs text-slate-600'>{truncateWords(item?.latestMessage?.content, 5)}</p>
                  </div>
                </div>
              )
              )
            }
            
          </div>
        ))
      }
      </div>
  )
}

export default UsersDisplay