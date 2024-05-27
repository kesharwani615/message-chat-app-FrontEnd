/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

/* eslint-disable react/prop-types */
const Conversation = ({conversation}) => {
	const {selectedConversation,setSelectedConversation,setIsGroup,isGroup} = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;

	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

// console.log("conversation:",conversation)

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
		            ${isSelected ? "bg-sky-500" : ""}`}
					onClick={() =>setSelectedConversation(conversation)}
				>
				<div className={`avatar ${isOnline ? "online": ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName||conversation.groupName}</p>
						<span className='text-xl'>🎃</span>
					</div>
				</div>
			</div>

			<div className='divider my-0 py-0 h-1' />
		</>
	);
};
export default Conversation;