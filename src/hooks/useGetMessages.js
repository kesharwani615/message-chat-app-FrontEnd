/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessage, selectedConversation, url } = useConversation();

  const isGroup = selectedConversation?.isGroup !== undefined ? true : false;

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const storedUser = localStorage.getItem('chat-user');
        if (storedUser) {
          const { token } = JSON.parse(storedUser);
          const res = await fetch(
            `${url}/api/${isGroup ? "group" : "message"}/getMessage/${selectedConversation?._id}`, {
            method: 'GET',
            headers: {
              'Authorization': token,
            }
          });
		  // console.log(res)
          const data = await res.json();
          if (isGroup) {
            setMessage(res.status === 200 ? { message: data?.message?.messages } : []);
          } else {
            setMessage(res.status === 200 ? data : []);
          }
        } else {
          toast.error("No user found in localStorage");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();

  }, [selectedConversation?._id, setMessage ]);

  return { messages, loading };
};

export default useGetMessages;
