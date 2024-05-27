/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";


const useGetConversation = () => {
    const [loading,setLoading] = useState(false);
    const [conversations,setConversations]=useState([]);

    useEffect(()=>{
      const getAllUser= async ()=>{
      const token=localStorage.getItem('token');
      try {
        const res=await fetch('http://localhost:5000/api/user/',{
          method:'GET',
          headers: {
            'Authorization':token,
        }
        });
        const data = await res.json();
        console.log("data:",data);

        if(data.error){
          throw new Error(data.error); 
        }
        setConversations(data);

      } catch (error) {
        toast.error(error);
      }
    }
      getAllUser();
    },[]);
  

  return {loading,conversations};
}

export default useGetConversation;
