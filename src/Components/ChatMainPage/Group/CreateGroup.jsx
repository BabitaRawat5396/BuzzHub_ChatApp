
import { useForm } from 'react-hook-form'
import SearchUsersToAdd from './SearchUsersToAdd';
import {GiCrossMark} from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { createGroupChat } from '../../../Services/Operations/ChatAPI';


const CreateGroup = ({setShowCreateGroup}) => {

  const {handleSubmit, register, setValue, formState:{errors}} = useForm();
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const createGroup = (data) => {
    const formData = new FormData();
    formData.append("name",data.groupName);
    formData.append("users",JSON.stringify(data.selectedUsers));
    dispatch(createGroupChat(formData,token));
  }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm'>
      <div className='bg-[#ecacb9] w-10/12 tablet-sm:w-8/12 tablet:w-6/12 tablet-md:w-5/12 blur-background p-5 rounded-2xl text-[#7c799a]'>
        <p className='flex justify-end'><GiCrossMark className='cursor-pointer' onClick={() => setShowCreateGroup((prev) => !prev)}/></p>
        <div className='flex flex-col items-center gap-5'>
          <h1 className='text-2xl text-center'>Create group chat</h1>
          <form onSubmit={handleSubmit(createGroup)} className=' flex flex-col gap-3 w-full px-6'>
            <input
              type='text'
              placeholder='Group Name'
              className='outline-none h-9 rounded-xl px-4 text-xs text-black bg-[#ebcad1] w-full'
              {...register("groupName",{required: "Please enter group name."})}
            />  
            <SearchUsersToAdd
              register={register}
              setValue={setValue}
            />
            <button type='submit' className=' bg-[#7c799a] px-5 py-2 rounded-xl text-[#e7a0af] outline-none'>Create Chat</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup