/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message.jsx";
import useConversation from "../../zustand/useConversation.js";
import useListenMessages from "../../hooks/useListenMessage.js";

const Messages = () => {
    const { loading } = useGetMessages();
    const { messages } = useConversation();
    useListenMessages();
    const lastMessageRef = useRef();

    // console.log("MMessages:",messages)

    useEffect(() => {
        if (messages && messages.message) {
            setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
            },100);
        }
    }, [messages]);
    // console.log(messages);

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages && messages.message && messages?.message?.length > 0 && (
                Array.isArray( messages?.message) && messages?.message?.length > 0 && messages?.message?.map((useMessage) => {
                    // console.log("useMessage:",useMessage)
					return(
                    <div key={useMessage?._id} ref={lastMessageRef}>
                        <Message message={useMessage}/> 
                    </div>
					)
                })
            )}

            {!loading && (!messages || !messages.message || messages.message.length === 0) && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};


// const Messages = () => {
//     const { loading } = useGetMessages();
//     const { messages } = useConversation();
//     const lastMessageRef = useRef();

//     useEffect(() => {
//         if (messages && messages.message) {
//             lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [messages]);

//     return (
//         <div className='px-4 flex-1 overflow-auto'>
//             {!loading && messages && messages.message && messages.message.length > 0 && (
//                 messages.message.map((useMessage, index) => (
//                     <div key={useMessage._id} ref={index === messages.message.length - 1 ? lastMessageRef : null}>
//                         <Message message={useMessage} />
//                     </div>
//                 ))
//             )}

//             {!loading && (!messages || !messages.message || messages.message.length === 0) && (
//                 <p className='text-center'>Send a message to start the conversation</p>
//             )}
//         </div>
//     );
// };


export default Messages;