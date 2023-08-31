
import { setRefreshSideBar,  setShowUserChat } from '../../../../Slices/userSlice';
import { removeFromGroup, updateGroupProfile } from '../../../../Services/Operations/ChatAPI';
import SetProfileImage from '../../../Auth/SetProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import {AiOutlineUpload} from 'react-icons/ai';
import {AiOutlineUserAdd} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SearchPopUp from './SearchPopUp';
import {AiFillDelete} from 'react-icons/ai';
import { changeProfilePicture } from '../../../../Services/Operations/ProfileAPI';

const GroupSettings = () => {
  const {register, setValue, handleSubmit,reset,formState:{isSubmitSuccessful}} = useForm();
  const {showUserChat, user, showUserProfile} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const [showSearchbar, setShowSearchBar] = useState(false);
  const [preview,setPreview] = useState(false);
  const [loading,setloading] = useState(false);
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    let response;
    setloading(true);

    const formData = new FormData();
    formData.append("profileImage", data.profileImage);

    if(showUserProfile){
      formData.append("userId",user._id);
      response = await changeProfilePicture(formData,dispatch);
      if(response){
        dispatch(setRefreshSideBar(response));
      }
    }else{
      formData.append("chatId",showUserChat._id);
      response = await updateGroupProfile(formData,token);

      if(response.length>0){
        dispatch(setShowUserChat(response));
        dispatch(setRefreshSideBar(response));
      }
    }
    setloading(false)
  }

  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        profileImage:''
      })
      setPreview(false);
    }
  },[reset,isSubmitSuccessful]);

  const handleDeleteUser = async(item) => {
    const data ={
      chatId:showUserChat._id,
      userId:item._id
    }

    const response = await removeFromGroup(data,token);
    dispatch(setShowUserChat(response));
  } 

  return (
    <>
      <div>
        <div className='flex flex-col items-start border-t-8 border-white'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-2 items-center'>
              <SetProfileImage
                register={register}
                setValue={setValue}
                preview={preview}
                setPreview={setPreview}
              />
              <button type='submit'>
              {
                loading ? 
                  <ProgressBar
                    height="40"
                    // width="100"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{
                      padding: 0, // Set padding to 0 to remove it
                    }}
                    wrapperClass="progress-bar-wrapper"
                    borderColor = '#7c799a'
                    barColor = '#aaa'
                  /> : <AiOutlineUpload className=' text-[#7c799a]'/>
              }          
              </button>
            </div>
          </form>
        </div>
        {
          !showUserProfile && 
          <div className='text-slate-500 border-t-8 border-white'>
            <h2 className=' text-slate-600 p-2'>{showUserChat?.users.length} participants</h2>
            {
              showUserChat?.groupAdmin?._id === user._id && 
                <div className="flex gap-2 px-3 items-center pb-4" onClick={() => setShowSearchBar(true)}>
                  <p className='p-3 bg-[#aaa] rounded-full'><AiOutlineUserAdd/></p>
                  <p className='text-sm leading-6 tracking-wide cursor-pointer'>Add participants</p>
                </div>
            }
            {
              showUserChat?.users.length>0 && (
                showUserChat?.users.map((item,index) => (
                  <div key={index} className='flex justify-between text-sm items-center px-3 py-1'>
                    <div className='flex gap-3 items-center'>
                      <img
                        src={item.profileImage}
                        alt='user Image'
                        className='object-cover w-9 rounded-full aspect-square'
                      />
                      <p>{item.userName}</p>
                    </div>
                    <div>
                    {
                      showUserChat?.groupAdmin._id === item._id && 
                      <p className='text-xs text-green-700 bg-green-200 px-2 py-[0.16rem] rounded-md'>Admin</p>
                    }
                    {
                      showUserChat?.groupAdmin._id === user._id && showUserChat?.groupAdmin._id !== item._id && 
                      <AiFillDelete onClick={() => handleDeleteUser(item)} className='cursor-pointer'/>
                    }
                    </div>
                  </div>
                ) )
              )
            }
          </div>
        }
        
      </div>
      {showSearchbar && <SearchPopUp setShowSearchBar={setShowSearchBar}/>}
    </>
  )
}

export default GroupSettings