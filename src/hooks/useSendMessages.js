/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast'
import { useSocketContext } from '../context/SocketContext';
// import { Socket } from 'socket.io-client';

function useSendMessages() {
  const { socket } = useSocketContext();
   const [loading,setLoading]=useState(false);
   const {messages,setMessage,selectedConversation}=useConversation();
    
   const isGroup=selectedConversation?.isGroup!==undefined?true:false;

  //  console.log("messages:",messages)

   const sendMessage=async(getMessage)=>{
    console.log(getMessage);
    const token=localStorage.getItem('token');

    try {
    const res = await fetch(`http://localhost:5000/api/${isGroup?"group":"message"}/sendMessage/${selectedConversation._id}`,{
    method: "POST",
    headers: { "Content-Type": "application/json",'Authorization':token, },
    body: JSON.stringify({getMessage}),
    });

    const data=await res.json();
    console.log(data)
    let actData;

    if(!isGroup){
      actData=data?.newMessage;
      console.log("dataRes:",actData);
    }else{
      actData=data;
    }
    // console.log("res:",res);

    if (data.error) throw new Error(data.error);

    messages.message.push(actData)
    console.log("messagesMy:",messages);

    setMessage({...messages})
    if(isGroup){
      const sendMsgUsingSocket=async()=>{
      await  socket.emit("send_MessageSocket",actData)
      }
      sendMsgUsingSocket();
    }

    } catch (error) {
      toast.error('Error:',error);
    }finally{
        setLoading(false);
    }
   }
  return {loading,sendMessage};
}

export default useSendMessages
