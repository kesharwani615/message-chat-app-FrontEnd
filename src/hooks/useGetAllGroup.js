/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Conversation from '../components/sidebar/Conversation';

const useGetAllGroup = () => {

    const [loading,setLoading] = useState(false);
    const [grpConversations,setGrpConversations]=useState([]);


    useEffect(()=>{
        const getAllGrp= async ()=>{
         const token=localStorage.getItem('token');
         try {
           const res=await fetch('http://localhost:5000/api/group/allGroups',{
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
