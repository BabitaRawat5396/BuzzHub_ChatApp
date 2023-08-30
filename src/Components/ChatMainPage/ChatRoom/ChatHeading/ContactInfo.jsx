
import { setRefreshSideBar, setShowContactInfo, setShowUserChat } from '../../../../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {MdModeEditOutline} from 'react-icons/md';
import { useState } from 'react';
import {RxCross2} from 'react-icons/rx';
import GroupSettings from './GroupSettings';


const ContactInfo = () => {
  const {showUserChat, user} = useSelector((state) => state.profile);
  const [showFullImage, setShowFullImage] = useState(false)
  const dispatch = useDispatch();
  

  
  return (
    <div className='w-full bg-[#f0f0f0]'>
      <div>
        <div className=' h-[3.3rem] p-2 bg-[#7c799a] border-l overflow-auto border-white border-opacity-20 text-white flex gap-10 items-center '>
          <RxCross2 className='cursor-pointer' onClick={() => dispatch(setShowContactInfo(false))}/>
          <p>Contact Info</p>
        </div>
        <div className='flex flex-col items-center gap-3 py-10'>
          <img
            onClick={() => setShowFullImage(true)}
            src={showUserChat?.isGroupChat ? showUserChat?.groupImage : showUserChat?.users[0]?._id === user._id ? showUserChat?.users[1]?.profileImage  : showUserChat?.users[0]?.profileImage} 
            alt="Selected User's Image" 
            className='object-cover w-[55%] tablet-xs:w-[50%] tablet-sm:w-[45%] tablet-sm-more:w-[36%] tablet:w-[40%] tablet-md:w-[35%] laptop:w-[30%] rounded-full aspect-square'
            />
          <div className='flex flex-col items-center'>
            <div className='text-base flex gap-2 items-center text-slate-700'>
              <p>{showUserChat?.isGroupChat ? showUserChat?.chatName : showUserChat?.users[0]._id === user._id ? showUserChat?.users[1]?.userName  : showUserChat?.users[0]?.userName }</p>
              <MdModeEditOutline/>
            </div>
            <p className='text-sm text-slate-500'>{showUserChat?.isGroupChat ? `Group: ${showUserChat?.users.length} participants` : showUserChat?.users[0]._id === user._id ? showUserChat?.users[1]?.email  : showUserChat?.users[0]?.email }</p>
          </div>
        </div>
        {
          showUserChat?.isGroupChat && (
            <GroupSettings/>
          )
        }
      </div>
      {showFullImage && (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm'>
          <div className=' place-content-end text-2xl font-bold px-6 w-full text-white flex'>
            <RxCross2 
              className='cursor-pointer' 
              onClick={() => setShowFullImage(false)}
            />
          </div>
          <img
            src={showUserChat?.isGroupChat ? showUserChat?.groupImage : showUserChat?.users[0]?._id === user._id ? showUserChat?.users[1]?.profileImage  : showUserChat?.users[0]?.profileImage} 
            alt="Selected User's Image" 
            className='object-cover w-11/12 tablet-xs:w-8/12 tablet-sm:w-7/12 tablet:w-5/12 laptop:w-4/12 rounded-sm aspect-square'
          />
        </div>
      )}
    </div>
  )
}

export default ContactInfo