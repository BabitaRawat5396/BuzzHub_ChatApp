
import { setRefreshSideBar, setShowContactInfo, setShowUserChat, setShowUserProfile } from '../../../../Slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {MdModeEditOutline} from 'react-icons/md';
import { useState } from 'react';
import {RxCross2} from 'react-icons/rx';
import GroupSettings from './GroupSettings';
import { renameGroup } from '../../../../Services/Operations/ChatAPI';
import { ColorRing } from 'react-loader-spinner';
import {TiTick} from 'react-icons/ti'

const ContactInfo = () => {
  
  const {showUserChat, user, showUserProfile} = useSelector((state) => state.profile);
  const [showFullImage, setShowFullImage] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(showUserChat?.isGroupChat ? showUserChat?.chatName : showUserChat?.users[0]._id === user._id ? showUserChat?.users[1]?.userName  : showUserChat?.users[0]?.userName);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  

  const handleSaveClick = async () => {
    setLoading(true);
    const data = {
      chatId:showUserChat._id,
      name:newName
    }
    const response = await renameGroup(data,token);
    dispatch(setRefreshSideBar(response));
    dispatch(setShowUserChat(response));
    setEditMode(false);
    setLoading(false);
  };
  
  return (
    <div className='w-full bg-[#f0f0f0]'>
      <div>
        <div className=' h-[3.3rem] p-2 bg-[#7c799a] border-l overflow-auto border-white border-opacity-20 text-white flex gap-10 items-center '>
          <RxCross2 className='cursor-pointer' onClick={() => {
            if(showUserProfile){
              dispatch(setShowUserProfile(false))
            }else{
              dispatch(setShowContactInfo(false))
            }
          }}/>
          <p>Contact Info</p>
        </div>
        <div className='flex flex-col items-center gap-3 py-10'>
          <img
            onClick={() => setShowFullImage(true)}
            src={showUserProfile ? user?.profileImage : showUserChat?.isGroupChat ? showUserChat?.groupImage : showUserChat?.users[0]?._id === user._id ? showUserChat?.users[1]?.profileImage  : showUserChat?.users[0]?.profileImage} 
            alt="Selected User's Image" 
            className='object-cover w-[55%] tablet-xs:w-[50%] tablet-sm:w-[45%] tablet-sm-more:w-[36%] tablet:w-[40%] tablet-md:w-[35%] laptop:w-[30%] rounded-full aspect-square'
            />
          <div className='flex flex-col items-center'>
            <div className='text-base flex gap-2 items-center text-slate-700'>
              {
                loading ? 
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  /> : showUserChat?.isGroupChat ? (
                    editMode ? (
                    <div className='flex border-b-2 border-[#7c799a]'>
                      <input
                        type='text'
                        value={newName}
                        className=' outline-none bg-[#f0f0f0]'
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    <TiTick className='cursor-pointer' onClick={handleSaveClick}/>
                    </div>
                  ) : (
                  <>
                    <p>{newName}</p>
                    <MdModeEditOutline className='cursor-pointer' onClick={() => setEditMode(true)} />
                  </>
                  )
                  ) : <p>{showUserProfile ? user?.userName : newName}</p>
              }
            </div>
            <p className='text-sm text-slate-500'>{showUserProfile ? user?.email : showUserChat?.isGroupChat ? `Group: ${showUserChat?.users.length} participants` : showUserChat?.users[0]._id === user._id ? showUserChat?.users[1]?.email  : showUserChat?.users[0]?.email }</p>
          </div>
        </div>
        {
          (showUserProfile || showUserChat?.isGroupChat) && (
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
            src={showUserProfile ? user?.profileImage : showUserChat?.isGroupChat ? showUserChat?.groupImage : showUserChat?.users[0]?._id === user._id ? showUserChat?.users[1]?.profileImage  : showUserChat?.users[0]?.profileImage} 
            alt="Selected User's Image" 
            className='object-cover w-11/12 tablet-xs:w-8/12 tablet-sm:w-7/12 tablet:w-5/12 laptop:w-4/12 rounded-sm aspect-square'
          />
        </div>
      )}
    </div>
  )
}

export default ContactInfo