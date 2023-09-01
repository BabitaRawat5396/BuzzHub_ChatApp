import { useForm } from 'react-hook-form';
import {MdEmail} from 'react-icons/md'
import {FaLock} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logIn } from '../../Services/Operations/AuthAPI';

const LoginForm = () => {

  const {register,handleSubmit,reset,formState:{isSubmitSuccessful}} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async(data) => {
    dispatch(logIn(data,navigate,dispatch));
  }

  useEffect(() => {
    if(isSubmitSuccessful){
      reset({
        email:'',
        password:''
      })
    }
  },[reset,isSubmitSuccessful]);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="sign-in-form"
      >
			<h2 className="title">Sign in</h2>
			<div className="input-field">
        <p className='icons'><MdEmail/></p>
				<input 
          type="text" 
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
			<input type="submit" value="Login" 
        className="bg-gradient-to-r from-[#7c799a] to-[#e68485] button"/>
		</form>
  )
}

export default LoginForm