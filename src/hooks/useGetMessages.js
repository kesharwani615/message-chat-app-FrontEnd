/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	
	const { messages, setMessage,selectedConversation,url} = useConversation();
  
	const isGroup=selectedConversation?.isGroup!==undefined?true:false;
  
    // console.log(isGroup);

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const {token}=JSON.parse(localStorage.getItem('chat-user'));
				// console.log(`http://localhost:5000/api/${isGroup?"group":"message"}/getMessage/${selectedConversation._id}`)
             const res=await fetch(`${url}/api/${isGroup?"group":"message"}/getMessage/${selectedConversation._id}`,{
              method:'GET',
              headers: {
                    'Authorization':token,
                    }
                 })
                const data = await res.json();
				// const {message}=data?.message;
				console.log("dataGet:",{message:data?.message?.messages});
				console.log("dataGet20:",data);

				if(isGroup){
					setMessage(res.status==200?{message:data?.message?.messages}:null);
				}else{
					setMessage(res.status==200?data:null);
				}
                // console.log("messages:",messages);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id,setMessage]);

	return { messages, loading };
};
export default useGetMessages;