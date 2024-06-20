import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

// import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessage,selectedConversation} = useConversation();

	const isGroup=selectedConversation?.isGroup!==undefined?true:false;

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
		// console.log("newMessage:",newMessage);
		// console.log("messages:",messages);
		messages?.message?.push(newMessage);

		setMessage({...messages});
		// console.log("messages:",messages);
		});

        if(isGroup){
			socket?.emit('join_room',selectedConversation?.groupName);
		}

		socket.on('receive-message',(data)=>{
			// console.log('receive-message:', data);
    if (messages && messages.message) {
    //   console.log(messages.message);
      const newMessages = [...messages.message, data];
      setMessage({ ...messages, message: newMessages });
    //   console.log("messages:", messages);
    } else {
      console.log("messages is undefined");
    }
		})


	return () => {
	socket?.off("newMessage");
	socket?.off("receive-message");
	}
	}, [socket, setMessage, messages]);

	// useEffect(()=>{
		
	// })
};
export default useListenMessages;