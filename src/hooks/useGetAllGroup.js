/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Conversation from '../components/sidebar/Conversation';
import useConversation from "../zustand/useConversation";


const useGetAllGroup = () => {

    const [loading,setLoading] = useState(false);
    const [grpConversations,setGrpConversations]=useState([]);
    const {url} = useConversation();


    useEffect(()=>{
        const getAllGrp= async ()=>{
         const {token}=JSON.parse(localStorage.getItem('chat-user'));
         try {
           const res=await fetch(`${url}/api/group/allGroups`,{
             method:'GET',
             headers: {
               'Authorization':token,
           }
           });
           const data = await res.json();
           console.log("groups:",data);
   
           if(data.error){
             throw new Error(data.error); 
           }
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
