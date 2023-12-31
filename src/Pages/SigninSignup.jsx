
import { useState } from 'react';
import LoginForm from '../Components/Auth/LoginForm';
import SignupForm from '../Components/Auth/SignupForm';
import { ColorRing } from 'react-loader-spinner';
import { useSelector } from 'react-redux';


const SigninSignupForm = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
	const {loading} = useSelector((state) => state.auth)

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

	
  return (
    <div>
			{
				loading ? 
					<div className='flex items-center justify-center h-screen'>
						<ColorRing
								visible={true}
								height="80"
								width="80"
								ariaLabel="blocks-loading"
								wrapperStyle={{}}
								wrapperClass="blocks-wrapper"
								colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
							/>
					</div> :
					<div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
						<div className="forms-container">
							<div className="signin-signup">
								<LoginForm setIsSignUpMode={setIsSignUpMode}/>
								<SignupForm setIsSignUpMode={setIsSignUpMode}/>
							</div>
						</div>

						<div className="panels-container">
							<div className="panel left-panel">
								<div className="content">
									<h3>New here ?</h3>
									<p>
										Join the conversation and connect with friends from all around the world. 
										Sign in now to experience the thrill of instant messaging, share your thoughts, and 
										never miss a moment. Let's get chatting!
									</p>
									<button className="btn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
										Sign up
									</button>
								</div>
								<img src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png" className="image" alt="" />
							</div>
							<div className="panel right-panel">
								<div className="content">
									<h3>One of us ?</h3>
									<p>
									Welcome back! We're thrilled to have you here.Dive into conversations with friends and connect with new people from all around the world. Happy chatting!
									</p>
									<button className="btn transparent" id="sign-in-btn" onClick={handleSignInClick}>
										Sign in
									</button>
								</div>
								<img src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"  className="image" alt="" />
							</div>
						</div>
					</div>
			}
		</div>

  )
}

export default SigninSignupForm