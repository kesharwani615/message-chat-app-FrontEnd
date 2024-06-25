/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import './App.css'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import Home from './pages/home/Home.jsx'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/useAuthContext.jsx'
import { useEffect, useState } from 'react'
import axios from "axios";
import NotFound from './404NotFound.jsx'
import { parse } from 'postcss'
import { jwtDecode } from 'jwt-decode'


function App() {
const {Auth,setAuth,setAuthUser}=useAuthContext();
const [tokenExpTime , setTokenExpTime] = useState();
const navigate = useNavigate()
const [diffSeconds,setdiffSeconds] = useState();
const {pathname} = useLocation()

console.log(pathname)


useEffect(()=>{
  const ParsedData = JSON.parse(localStorage.getItem('chat-user'));
  setAuth(ParsedData?.token);
  setAuthUser(ParsedData?.userDetail)
},[])


  const parseToken = JSON.parse(localStorage.getItem('chat-user'));
  const token = parseToken?.token || false;
  
  if (token) {
    const decodedToken = jwtDecode(token);
    let intervalId;
  
    const checkTokenExpiration = () => {
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const diffInSeconds = Math.floor(decodedToken.exp - currentTimeInSeconds);
      console.log(diffInSeconds);
      setdiffSeconds(diffInSeconds);
  
      if (diffInSeconds <= 0) {
        clearInterval(intervalId);
        localStorage.removeItem('chat-user');
        setAuth(null);
        setAuthUser(null);
      }
    };
  
    intervalId = setInterval(checkTokenExpiration, 1000);
  }



  return (
    <div  className='p-4 h-screen flex items-center justify-center'>
    <Routes>
      <Route path='/' element={Auth ?<Home/>:<Navigate to={'/login'}/>} />
      <Route path='/signup' element={Auth?<Navigate to={'/'}/>:<Signup/>} />
      <Route path='/login' element={Auth?<Navigate to={'/'}/>:<Login/>} />
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
    <Toaster/>  
  </div>
  )
}

export default App
