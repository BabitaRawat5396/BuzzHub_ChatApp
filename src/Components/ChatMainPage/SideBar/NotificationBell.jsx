
import { setNotification, setShowSideBar, setShowUserChat } from '../../../Slices/userSlice';
import useOnClickOutside from '../../../Hooks/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
// import {Effect} from 'react-notification-badge';
import {AiFillBell} from 'react-icons/ai';
import { useRef, useState } from 'react';


const NotificationBell = () => {

  const {notification} = useSelector((state) => state.profile);
  const [showNotificationBar, setShowNotificationBar] = useState(false);
  const dispatch = useDispatch();
  const notificationRef = useRef();

  useOnClickOutside(notificationRef,() => {
    setShowNotificationBar(false)
  });


  return (
    <div ref={notificationRef}>
      <div
        className='cursor-pointer relative'
        onClick={() => setShowNotificationBar(prev => !prev)}
        >
        {/* <NotificationBadge count={notification.length} effect={Effect.SCALE}/> */}
        {
          notification.length > 0 && (
          <span className='bg-red-500 text-white text-xs px-[0.3rem] rounded-full absolute left-[40%] top-0'>
            {notification.length}
          </span>
        )}
        <AiFillBell 
          className='text-lg mr-2 text-white'
          />
      </div>
      <div 
        className={`bg-red-300 text-red-100 text-xs whitespace-nowrap 
          absolute z-10 rounded-lg ${notification.length ? "left-[25%] tablet:left-[15%]" : "left-[50%] tablet:left-[20%] laptop:left-[18%]" }`}>
        {
          showNotificationBar && (notification.length ? (
            <div>
            {
              notification.map((notif,index) => (
                <div key={index} 
                  className={`py-2 px-3 cursor-pointer ${index !== notification.length-1 ? "border-b border-red-200" : ""}`}
                  onClick={() => {
                    dispatch(setShowUserChat(notif.chat));
                    dispatch(setNotification(notification.filter((n) => n !== notif)));
                    dispatch(setShowSideBar(false))
                  }}>
                {
                  notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : 
                  `New Message from ${notif.sender.userName}`
                }
                </div>
              ))
            }
            </div>
          ) : (
            <p className='p-1'>No Notifications</p>
          ))
        }
      </div>
    </div>
  )
}

export default NotificationBell