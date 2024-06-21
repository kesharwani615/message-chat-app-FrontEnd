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
  
  const storedData = localStorage.getItem("chat-user");
  const parsedData = storedData ? JSON.parse(storedData) : {};
  
  const { token = null, userDetail = null } = parsedData;  

    const [Auth,setAuth]=useState( token || null);
   const [AuthUser,setAuthUser]=useState(userDetail || null);


  return (
    <>
     <AuthContext.Provider value={{Auth,setAuth,AuthUser,setAuthUser}}>
      {children}  
    </AuthContext.Provider>
    </>
  )
}

