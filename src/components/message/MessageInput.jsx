/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessages from "../../hooks/useSendMessages";

const MessageInput = () => {
	const [messageType,setMessageType]=useState("");
    const {loading,sendMessage}=useSendMessages();

	const handleSubmit=async (e)=>{
    e.preventDefault();
	if(!messageType) return;

    await sendMessage(messageType);

	setMessageType('');

	}

	return (
		<form className='px-4 my-3 relative' onSubmit={handleSubmit}>
			<div className='w-full'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-white-700 border-gray-600 text-black'
					placeholder='Send a message'
					value={messageType}
					onChange={(e)=>setMessageType(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					<BsSend />
				</button>
			</div>
		</form>
	);
};
export default MessageInput;