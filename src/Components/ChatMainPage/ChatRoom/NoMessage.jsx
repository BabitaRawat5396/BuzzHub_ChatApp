
import {VscLayoutSidebarRight} from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import NoChat from '../../../Assets/NoChat.png'
import useWindowSize from '../../../Hooks/windowSize'
import { setShowSideBar } from '../../../Slices/userSlice';

const MessageStartPage = () => {

  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  return (
    <div className='bg-[#efe5e5] text-[#91819e] h-full pt-2'>
      {
        windowSize.width > 426 && windowSize.width < 768 && (
          <VscLayoutSidebarRight 
              className=' ml-2 text-lg'
              onClick={() => dispatch(setShowSideBar(true))}  
            />
        )
      }
      <div className=' flex flex-col justify-center items-center h-full'>
        <img src={NoChat} alt='NOChatMessage' className=' h-60 lg:h-92'/>
        <h1 className='font-logo text-3xl font-bold text-shadow-black mb-1'>buzzHub</h1>
        <p className=' text-xs lg:text-sm w-8/12 text-center'>Connect with your friends and loved ones in an instant! Start messaging now and stay in touch effortlessly, 
          no matter the distance. Share moments, laughter, and heartfelt conversations with those who matter most to 
          you.
        </p>
      </div>
    </div>
    
  )
}

export default MessageStartPage