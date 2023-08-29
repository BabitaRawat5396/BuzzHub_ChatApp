
import { useSelector } from 'react-redux'
import ChatRoom from '../Components/ChatMainPage/ChatRoom'
import Sidebar from '../Components/ChatMainPage/SideBar'
import useWindowSize from '../Hooks/windowSize'

const ChatMainPage = () => {

  const {showUserChat, showSideBar} = useSelector((state) => state.profile)
  const windowSize = useWindowSize();

  return (
    <div className='min-h-screen flex w-full bg-[#f0f2f5] bg-opacity-30'>
      {
        windowSize.width < 426 ? (
          !showUserChat ? (
            <div className='bg-[#7c799a] w-full'>
              <Sidebar/> 
            </div>
        ) : (
          <div className='h-screen w-full'>
          <ChatRoom/>
          </div>
        )
        ) : (
          windowSize.width > 426 && windowSize.width < 769 ? (
          <>
          <div className={`overflow-auto absolute top-0 bottom-0 left-0 z-10 bg-[#7c799a] w-[320px] ${showSideBar ? "" : "hidden"}`}>
            <Sidebar/>
          </div>
          <div className='w-full h-screen overflow-hidden'>
            <ChatRoom/>
          </div>
          </>
        ) : (
          <div className='flex w-full h-screen'>
            <div className='tablet:w-[70%] tablet-md:w-[60%] laptop:w-[50%] laptop-md:w-[40%] bg-[#7c799a] overflow-auto'>
              <Sidebar/>
            </div>
            <div className='w-full'>
              <ChatRoom/>
            </div>
          </div>
        )
        )
      }
      
    </div>
  )
}

export default ChatMainPage