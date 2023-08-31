
import { addToGroup } from '../../../../Services/Operations/ChatAPI';
import { setShowUserChat } from '../../../../Slices/userSlice';
import SearchUsersToAdd from '../../Group/SearchUsersToAdd';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {ImCross} from 'react-icons/im';
import {TiTick} from 'react-icons/ti';

const SearchPopUp = ({setShowSearchBar}) => {
  const {handleSubmit, register, setValue} = useForm();
  const {showUserChat} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();


  const handleAddPeople = async(data) => {
    const formData = new FormData();
    formData.append("chatId",showUserChat._id);
    formData.append("users",JSON.stringify(data.selectedUsers));
    const response = await addToGroup(formData,token);
    dispatch(setShowUserChat(response))
  }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm'>
      <div className='w-10/12 tablet-xs:w-8/12 tablet:w-7/12 tablet-md:w-6/12  bg-white rounded-xl'>
        <div className='flex gap-6 items-center bg-[#7c799a] h-10 rounded-t-xl text-white px-6 py-8'>
          <ImCross onClick={() => setShowSearchBar(false)}/>
          <p className=' text-sm tablet:text-lg font-bold whitespace-nowrap'>Add participants</p>
        </div>
        <form className='py-5' onSubmit={handleSubmit(handleAddPeople)}>
          <div className='flex w-full gap-3 items-center'>
            <SearchUsersToAdd
              register={register}
              setValue={setValue}
            />
            <button type='submit' className='p-1 tablet:p-[0.65rem]  bg-[#b9b9b9] rounded-full'>
              <TiTick/>
            </button>
          </div>
        </form>
        
      </div>
    </div>
  )
}

export default SearchPopUp