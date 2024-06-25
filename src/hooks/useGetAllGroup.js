/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Conversation from '../components/sidebar/Conversation';
import useConversation from "../zustand/useConversation";
import { useNavigate } from 'react-router-dom';


const useGetAllGroup = () => {

    const [loading,setLoading] = useState(false);
    const [grpConversations,setGrpConversations]=useState([]);
    const {url} = useConversation();
    const navigate = useNavigate()


    useEffect(()=>{
        const getAllGrp= async ()=>{
         const {token}=(JSON.parse(localStorage.getItem('chat-user')) || {token:''});

         try {
           const res=await fetch(`${url}/api/group/allGroups`,{
             method:'GET',
             headers: {
               'Authorization':token,
           }
           });

           if(res.status === 401){
            localStorage.removeItem('chat-user')
            navigate('/login');
            }

           const data = await res.json();
          //  console.log("groups:",data);
   
           setGrpConversations(data);
           
        }catch(error){
         toast.error(error);
        }
      }
    getAllGrp();
   },[]);
  return {loading,grpConversations};
}

export default useGetAllGroup
