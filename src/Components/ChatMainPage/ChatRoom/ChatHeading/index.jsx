
import { setShowSideBar, setShowUserChat } from '../../../../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import GroupImage from '../../../../Assets/GroupImage.png';
import useWindowSize from '../../../../Hooks/windowSize';
import {BsThreeDotsVertical} from 'react-icons/bs';
import {MdArrowBackIos} from 'react-icons/md';
import {BiSearchAlt2} from 'react-icons/bi';
import { useState } from 'react';
import ProfileInfo from './ProfileInfo';


const ChatHeading = ({isTyping}) => {

  const { showUserChat,user } = useSelector((state) => state.profile);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showProfileInfo, setShowProfileInfo] = useState(false);


  const windowSize = useWindowSize();
  const dispatch = useDispatch();

  return (
    <div className='h-full flex text-white items-center text-lg justify-between font-bold px-7 p-4 space-x-4 bg-[#7c799a] border-l border-[#93839f]'>
      {
        showUserChat.isGroupChat ? (
          <div className='flex items-center whitespace-nowrap gap-4'>
            {
              windowSize.width < 769 && (
                <MdArrowBackIos
                  className='cursor-pointer'
                  onClick={() => {
                    if(windowSize.width < 426){
                      dispatch(setShowUserChat(null))
                    }else{
                      dispatch(setShowSideBar(true))
                    }
                  }}
                />
              )
            }
            <img
              src={GroupImage} 
              alt='avatar' 
              className='object-cover w-9 rounded-full aspect-square'
              />
            <div>
              <p className='text-white text-sm'>{showUserChat?.chatName}</p>
              {
                isTyping ? (
                  <p className='text-xs text-white'>typing...</p>
                ) : (
                  <></>
                )
              }
            </div>
          </div>
        ) : (
          <div className='flex items-center whitespace-nowrap gap-4'>
            {
              windowSize.width < 769 && (
                <MdArrowBackIos
                  className='text-white cursor-pointer'
                  onClick={() => {
                    if(windowSize.width < 426){
                      dispatch(setShowUserChat(null))
                    }else{
                      dispatch(setShowSideBar(true))
                    }
                  }}
              />
              )
            } 
            <img
              src={showUserChat?.users[0]?._id === user._id ? showUserChat?.users[1]?.profileImage  : showUserChat?.users[0]?.profileImage} 
              alt='avatar' 
              className='object-cover w-9 rounded-full aspect-square'
              />
            <div>
              <p className='text-white text-sm'>{showUserChat?.users[0]._id === user._id ? showUserChat?.users[1]?.userName  : showUserChat?.users[0]?.userName }</p>
              {
                isTyping ? (
                  <p className='text-xs text-white'>typing...</p>
                ) : (
                  <></>
                )
              }
            </div>
          </div>
        )
      }
      <div className='flex items-center gap-2'>
        {
          showSearchInput && (
            <input
              type='text'
              placeholder='Search...'
              className={`outline-none px-2 py-1 font-normal rounded-md bg-white text-xs search-input ${showSearchInput ? 'show' : ''}`}
            />
          )
        }
        <BiSearchAlt2
          className='text-lg cursor-pointer'
          onClick={() => setShowSearchInput(prev => !prev)}
        />
        <BsThreeDotsVertical 
          className='cursor-pointer'
          onClick={() => setShowProfileInfo(prev => !prev)}
          />
          {
            showProfileInfo && (
              <ProfileInfo/>
            )
          }
      </div>
    </div>
  )
}

export default ChatHeading