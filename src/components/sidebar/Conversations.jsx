/* eslint-disable no-unused-vars */
import { useState } from "react";
import useGetAllGroup from "../../hooks/useGetAllGroup";
import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";
import { useAuthContext } from "../../context/useAuthContext";

const Conversations = () => {
	let {loading,conversations} = useGetConversation();
	let {grpConversations}= useGetAllGroup();
	let {AuthUser} = useAuthContext()
    
	let allChatOrGrp;

	console.log(conversations,grpConversations)
	if(conversations?.message)
		conversations=[];

	if(grpConversations?.message)
		grpConversations=[];

	if(conversations.getAllUser)
	conversations = conversations.getAllUser;

	allChatOrGrp=[...conversations,...grpConversations];
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{
             allChatOrGrp && allChatOrGrp.map((conversation)=>{
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