/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useNavigate } from 'react-router-dom';



const useGetConversation = () => {
    const [loading,setLoading] = useState(false);
    const [conversations,setConversations]=useState([]);
    const { url }= useConversation();
    const navigate = useNavigate()

    useEffect(()=>{
      const getAllUser= async ()=>{
      const {token}=(JSON.parse(localStorage.getItem('chat-user')) || '');
      
      try {

        const res = await fetch(`${url}/api/user/`,{
          method:'GET',
          headers: {
            'Authorization':token,
        }
        });

        // console.log("res:",res)
        if(res.status === 401){
        localStorage.removeItem('chat-user')
        navigate('/login');
        }

        const data = await res.json();


        // if(data.error){
        //   throw new Error(data.error);
        // }
        setConversations(data);

      } catch (error) {
        // toast.error(error);
      }
    }
      getAllUser();
    },[]);
  

  return {loading,conversations};
}

export default useGetConversation;
