import { search } from '../../../Services/Operations/ProfileAPI';
import {GiCrossMark} from 'react-icons/gi';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';


const SearchUsersToAdd = ({register,setValue}) => {

  const {user} = useSelector((state) => state.profile);

  const [searchedUsers,setSearchedUsers] = useState([]);
  const [searchValue,setSearchValue] = useState("");
  const [selectedUsers,setSelectedUsers] = useState([]);
  const searchResultsRef = useRef(); 

  const fetchSearchedData = async(value) => {
    const response = await search({searchValue:value});
    setSearchedUsers(response);
  }

  const handleChange = (value) => {
    setSearchValue(value);
    fetchSearchedData(value);
    setValue("")
  }

  const addSelectedUsers = (user) => {
    if(!selectedUsers.includes(user)){
      const updatedSelectedUsers = [...selectedUsers, user];
      setSelectedUsers(updatedSelectedUsers);
    }else{
      toast.error("User Already Selected")
    }
    
  }

  const removeSelectedUsers = (item) =>{

    const updatedSelectedUsers = selectedUsers.filter(user => user !== item);
    setSelectedUsers(updatedSelectedUsers);

  }

  const handleClickOutside = (event) => {
    if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) { 
      setSearchedUsers([]);
      setSearchValue("")
    }
  }

  useEffect(() => {
    setValue("selectedUsers",selectedUsers);

  },[selectedUsers]);

  useEffect(() => {
    register("selectedUsers");
    // Add a click event listener to the document
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  },[]);
  
  return (
    <div className='w-full'>
      <input 
        type='text' 
        placeholder='Search and add user'
        className='outline-none h-9 w-full rounded-xl px-4 text-xs bg-[#ebcad1] text-black'
        value={searchValue}
        onChange={(event) => handleChange(event.target.value)}
      />
      <div ref={searchResultsRef} className='pt-2 px-2 flex gap-2 flex-wrap'>
      {
        selectedUsers && selectedUsers.map((item,index) => (
          <div key={index} className='bg-[#f9bcc1] w-fit px-2 py-1 rounded-full text-xs flex gap-2 items-center'>
            <p>{item?.userName}</p>
            <GiCrossMark className='text-xs cursor-pointer' onClick={() => {removeSelectedUsers(item)}}/>
          </div>
        ))
      }
      </div>
      <div className=' max-h-32 overflow-scroll scroll-smooth'>
      {
        searchedUsers && searchedUsers.map((item,index) => (
          <div 
            key={index}
            onClick={() => addSelectedUsers(item)}
            className=' cursor-pointer'
          >
            {
              item.userName !== user.userName &&
              <div className="bg-[#f6f0f0] p-2 rounded-xl mx-1 my-2 text-sm flex gap-4">
                <img
                  src={item?.profileImage} 
                  alt='avatar' 
                  className='object-cover w-9 rounded-full aspect-square'
                  />
                <div>
                  <p>{item?.userName}</p>
                  <p className='text-xs'>Email: {item?.email}</p>
                </div>
            </div>
            }
          </div>
        ))
      }
      </div>
      
    </div>
  )
}

export default SearchUsersToAdd