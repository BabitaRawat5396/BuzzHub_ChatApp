import { Route, Routes } from 'react-router-dom';
import './App.css';
import SigninSignupForm from './Pages/SigninSignup';
import ChatMainPage from './Pages/ChatMainPage';


function App() {
  return (
    <div className='min-h-screen w-screen'>
      <Routes>
        <Route path='/' element={<SigninSignupForm/>}/>
        <Route path='/chat' element={<ChatMainPage/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
