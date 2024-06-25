/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);

  const { messages, setMessage, selectedConversation, url } = useConversation();

  const isGroup = selectedConversation?.isGroup !== undefined;

  const navigate = useNavigate();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      const chatUser = localStorage.getItem('chat-user');
      const { token } = JSON.parse(chatUser);

      try {
        const res = await fetch(
          `${url}/api/${isGroup ? "group" : "message"}/getMessage/${selectedConversation?._id}`, {
          method: 'GET',
          headers: {
            'Authorization': token,
          }
        });

        if (res.status === 401) {
          localStorage.removeItem('chat-user');
          setLoading(false);
          navigate('/login');
          return;
        }

        const data = await res.json();
        if (isGroup) {
          setMessage(res.status === 200 ? { message: data?.message?.messages } : []);
        } else {
          setMessage(res.status === 200 ? data : []);
        }
      } catch (error) {
        console.log("An error occurred", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();

  }, [selectedConversation?._id, setMessage, navigate, url, isGroup]);

  return { messages, loading };
};

export default useGetMessages;
