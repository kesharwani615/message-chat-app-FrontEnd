/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{createContext, useContext, useState} from 'react'

const AuthContext=createContext();

//it is using like hook and returning this useContext(AuthContext); so that we can access directly these values Auth,setAuth
export const useAuthContext = () =>{
  return useContext(AuthContext);
}

export const AuthContextArea = ({children}) => {
  console.log(JSON.parse(localStorage.getItem("userDetail")));
  console.log(localStorage.getItem("token"));

  const user=JSON.parse(localStorage.getItem("userDetail"))
  const [Auth,setAuth]=useState(localStorage.getItem("token") || null);
   const [AuthUser,setAuthUser]=useState(user || null);


  return (
    <>
     <AuthContext.Provider value={{Auth,setAuth,AuthUser,setAuthUser}}>
      {children}  
    </AuthContext.Provider>
    </>
  )
}

