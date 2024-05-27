/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import './App.css'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import Home from './pages/home/Home.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/useAuthContext.jsx'
import { useEffect, useState } from 'react'
import axios from "axios";


function App() {
const {Auth,setAuth}=useAuthContext();
// console.log('Auth:',Auth)


  return (
    <div  className='p-4 h-screen flex items-center justify-center'>
    <Routes>
      <Route path='/' element={Auth ?<Home/>:<Navigate to={'/login'}/>} />
      <Route path='/signup' element={Auth?<Navigate to={'/'}/>:<Signup/>} />
      <Route path='/login' element={Auth?<Navigate to={'/'}/>:<Login/>} />
      
    </Routes>
    <Toaster/>  
  </div>
  )
}

export default App
