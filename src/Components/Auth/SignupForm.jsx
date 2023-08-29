import { signUp } from '../../Services/Operations/AuthAPI';
import {BsFillPersonFill} from 'react-icons/bs';
import SetProfileImage from './SetProfileImage';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {MdEmail} from 'react-icons/md';
import {FaLock} from 'react-icons/fa';
import { useEffect, useState } from 'react';

const SignupForm = ({setIsSignUpMode}) => { 

  const {register, setValue, handleSubmit,reset,formState:{isSubmitSuccessful}} = useForm();
  const [preview,setPreview] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("profileImage", data.profileImage);
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    dispatch(signUp(formData,navigate)).then(()=>{
      setIsSignUpMode(false);
    });
    setPreview(false);
  }
  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        userName:'',
        email:'',
        password:'',
        profileImage:''
      })
      setPreview(false);

    }
  },[reset,isSubmitSuccessful]);
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sign-up-form mb-32">
			<h2 className="title">Sign up</h2>
			<div className="input-field">
        <p className='icons'><BsFillPersonFill/></p>
				<input 
          type="text" 
          placeholder="Username" 
          {...register("userName",{required:"Please enter your username."})}
          />
			</div>
			<div className="input-field">
				<p className='icons'><MdEmail/></p>
				<input 
          type="email" 
          placeholder="Email" 
          {...register("email",{required:"Please enter your email."})}
          />
			</div>
			<div className="input-field">
        <p className='icons'><FaLock/></p>
				<input 
          type="password" 
          placeholder="Password" 
          {...register("password",{required:"Please enter your password."})}
          />
			</div>
      <SetProfileImage
        register={register}
        setValue={setValue}
        preview={preview}
        setPreview={setPreview}
      />
			<input 
        type="submit" 
        className="button bg-gradient-to-r from-[#7c799a] to-[#e68485]" 
        value="Sign up"
        />
		</form>
  )
}

export default SignupForm