/* eslint-disable no-unused-vars */
import { useState } from "react";
import useGetAllGroup from "../../hooks/useGetAllGroup";
import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";
import { useAuthContext } from "../../context/useAuthContext";

const Conversations = () => {
	const {loading,conversations} = useGetConversation();
	const {grpConversations}= useGetAllGroup();
	const {AuthUser} = useAuthContext()
    
	// console.log("grpConversations:",grpConversations)
	// console.log("AuthUser:",AuthUser)

	// const userId=AuthUser._id;
	// grpConversations.map((grp)=>{
	// 	grp.participants.filter((id)=>)
	// })

    const allChatOrGrp=[...conversations,...grpConversations];
	
	// console.log(grpConversations);
    // console.log("conversation:",conversations);
	// console.log("allChatOrGrp:",allChatOrGrp)
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{
             allChatOrGrp.map((conversation)=>{
             return( 
				<Conversation 
				key={conversation._id} 
				conversation={conversation}
				/>
				)		
			})
			} 
		</div>
	);
};
export default Conversations;