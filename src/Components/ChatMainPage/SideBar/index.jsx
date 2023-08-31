

import {setShowSideBar, setShowUserChat, setShowUserProfile } from '../../../Slices/userSlice';
import { accessChat } from '../../../Services/Operations/ChatAPI';
import { search } from '../../../Services/Operations/ProfileAPI';
import useOnClickOutside from '../../../Hooks/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from '../../../Hooks/windowSize';
import {VscLayoutSidebarRight} from 'react-icons/vsc';
import UsersDisplay from '../../Common/UsersDisplay';
import { useEffect, useRef, useState } from 'react';
import NotificationBell from './NotificationBell';
import {MdOutlineGroupAdd} from 'react-icons/md';
import CreateGroup from '../Group/CreateGroup';
import { useNavigate } from 'react-router-dom';
import {FiLogOut} from 'react-icons/fi';
import {ImSearch} from 'react-icons/im';
import {ImCross} from 'react-icons/im';
import ContactInfo from '../ChatRoom/ChatHeading/ContactInfo';




const Sidebar = () => {
  
  const {user, showUserProfile} = useSelector((state) => state.profile);
  const [showCreateGroup,setShowCreateGroup] = useState(false);
  const [searchedUsers,setSearchedUsers] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const [searchValue,setSearchValue] = useState("");
  const windowSize = useWindowSize();
  const searchResultsRef = useRef(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const outsideSideBarClick = useRef();
  const [showFullImage, setShowFullImage] = useState(false);


  const fetchSearchedData = async(value) => {
    const response = await search({searchValue:value});
    setSearchedUsers(response);
  }

  const handleChange = (value) => {
    setSearchValue(value);
    fetchSearchedData(value);
  }

  const handleClick = async(item) =>{ 
    const response = await accessChat({userId:item._id},token);
    dispatch(setShowUserChat(response));
    dispatch(setShowSideBar(false))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleClickOutside = (event) => {

    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) { //checks if the event.target element (i.e., the element that triggered the click event) is a descendant of the element referred to by the searchResultsRef.current reference.
      setSearchedUsers([]);
      setSearchValue("")
    }
  }

  const logout = () => {
    localStorage.removeItem('user');
    navigate("/");
  }


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  },[])

  useOnClickOutside(outsideSideBarClick,() => {
    dispatch(setShowSideBar(false));
  })

  return (
  <>
    <div className='flex flex-col items-center justify-center'  ref={outsideSideBarClick}>
      <div className='flex items-center justify-between w-full px-4 border-b border-white border-opacity-20'>
        <div className='flex items-center whitespace-nowrap text-lg font-bold w-full p-2'>
          <img
            src={user?.profileImage} 
            alt='avatar' 
            className='object-cover w-9 rounded-full aspect-square'
            onClick={() => dispatch(setShowUserProfile(true))}
            />
        </div>
        <NotificationBell/>
        <MdOutlineGroupAdd className='text-2xl text-white cursor-pointer' onClick={() => {setShowCreateGroup((prev) => !prev)}}/>
        {
          windowSize.width > 426 && windowSize.width < 769 && (
            <VscLayoutSidebarRight 
              className='text-white ml-2 text-xl cursor-pointer'
              onClick={() => dispatch(setShowSideBar(false))}  
            />
          )
        }
        <FiLogOut 
          className='text-2xl text-white cursor-pointer ml-2'
          onClick={() => {
            logout();
          }}
          />
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-4 px-4'>
        <div className="input-field h-9 text-xs border-purple-900">
          <p className='icons'><ImSearch/></p>
          <input 
            type='text' 
            placeholder='Search or start new chat'
            value={searchValue}
            onChange={(event) => handleChange(event.target.value)}
            /> 
        </div>
      </form>

      {/* Search Results */}
      <div ref={searchResultsRef} className='w-[90%] tablet:w-[38%] tablet-md:w-[33%] laptop:w-[30%] laptop-md:w-[26%] absolute top-[25%] tablet:top-[24.5%] laptop-lg:top-[21%] rounded-xl bg-[#eee2e2]'>
      {
        searchedUsers && searchedUsers.map((item,index) => (
          <div 
            key={index}
            onClick={() => handleClick(item)}
          >
            {
              item.userName !== user.userName &&
              <div className={`py-1 text-black text-opacity-60 px-4 text-xs ${index !== searchedUsers.length-1 ? "border-b border-[#91819e]" : ""}`}>
                <p className='text-sm font-bold'>{item?.userName}</p>
                <p className='text-[#3b485e]'>{item?.email}</p>
              </div>
            }
          </div>
        ))
      }
      </div>

      {/* Sidebar Chats */}
      <UsersDisplay/>
    </div>
    {showCreateGroup && <CreateGroup setShowCreateGroup={setShowCreateGroup}/>}
    {showUserProfile &&  
      <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto'>
        <ContactInfo/>
      </div>
    }
  </>
    
    
  )
}

export default Sidebar