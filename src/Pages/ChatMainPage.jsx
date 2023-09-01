
import { useSelector } from 'react-redux'
import ChatRoom from '../Components/ChatMainPage/ChatRoom'
import Sidebar from '../Components/ChatMainPage/SideBar'
import useWindowSize from '../Hooks/windowSize'
import { ColorRing } from 'react-loader-spinner'

const ChatMainPage = () => {

  const {showUserChat, showSideBar, loading} = useSelector((state) => state.profile)

  const windowSize = useWindowSize();

  return (
    <div>
    {
      loading ? 
        (
          <div className='flex items-center justify-center h-screen'>
						<ColorRing
								visible={true}
								height="80"
								width="80"
								ariaLabel="blocks-loading"
								wrapperStyle={{}}
								wrapperClass="blocks-wrapper"
								colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
							/>
					</div>
        ) : 
        <div className='min-h-screen flex w-full bg-[#f0f2f5] bg-opacity-30'>
        {
        windowSize.width < 427 ? (
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
              <div className='w-full h-screen overflow-auto'>
                <ChatRoom/>
              </div>
            </>
            ) : (
              <div className='flex w-full h-screen '>
                <div className='tablet:w-[70%] tablet-md:w-[60%] laptop:w-[50%] laptop-md:w-[40%] bg-[#7c799a] overflow-auto'>
                  <Sidebar/>
                </div>
                <div className='w-full h-screen overflow-auto '>
                  <ChatRoom/>
                </div>
              </div>
            )
          )
        }
        </div>
    }
    </div>
  );
}

export default ChatMainPage