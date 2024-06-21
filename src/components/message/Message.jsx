/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useAuthContext } from "../../context/useAuthContext";
// import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => { 

	// console.log("message:",message)
  
  const {Auth,AuthUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	// console.log("selected:",selectedConversation)
//    console.log("authuser:",AuthUser)
//    console.log("auth:",Auth)
//    console.log(typeof(message.SenderId) ,typeof(AuthUser._id))
//    console.log(message.SenderId === AuthUser._id)
	const fromMe = message.SenderId === AuthUser._id;
	// const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? AuthUser.profilePic : selectedConversation?.profilePic || `https://avatar.iran.liara.run/public/boy?username=group`;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

//   const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <>
        <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>

			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.Message}</div>
			{/* <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div> */}
		</div>
    </>
  )
}

export default Message
