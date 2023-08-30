
import { setRefreshSideBar,  setShowUserChat } from '../../../../Slices/userSlice';
import { updateGroupProfile } from '../../../../Services/Operations/ChatAPI';
import SetProfileImage from '../../../Auth/SetProfileImage';
import { useDispatch, useSelector } from 'react-redux';
import { ProgressBar } from 'react-loader-spinner';
import {AiOutlineUpload} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const GroupSettings = () => {
  const {register, setValue, handleSubmit,reset,formState:{isSubmitSuccessful}} = useForm();
  const {showUserChat} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const [preview,setPreview] = useState(false);
  const [loading,setloading] = useState(false);
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    setloading(true)
    const formData = new FormData();
    formData.append("chatId",showUserChat._id);
    formData.append("profileImage", data.profileImage);
    const response = await updateGroupProfile(formData,token);
    if(response.length>0){
      dispatch(setShowUserChat(response));
      dispatch(setRefreshSideBar(response));
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
  return (
    <div>
      <div className='h-2 bg-white'></div>
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
      
      <div className='h-2 bg-white'></div>
      <div className='text-slate-500'>
        <h2 className=' text-slate-600 p-2'>{showUserChat?.users.length} participants</h2>
        {
          showUserChat?.users.length>0 && (
            showUserChat?.users.map((user,index) => (
              <div key={index} className='flex justify-between text-sm items-center px-3 py-1'>
                <div className='flex gap-3 items-center'>
                  <img
                    src={user.profileImage}
                    alt='user Image'
                    className='object-cover w-9 rounded-full aspect-square'
                  />
                  <p>{user.userName}</p>
                </div>
                <div>
                {
                  showUserChat?.groupAdmin._id === user._id && 
                  <p className='text-xs text-green-700'>Admin</p>
                }
                </div>
              </div>
            ) )
          )
        }
      </div>
    </div>
  )
}

export default GroupSettings