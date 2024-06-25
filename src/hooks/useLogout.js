import { useState } from "react";
import useConversation from "../zustand/useConversation";
import { useNavigate } from "react-router-dom";

const useLogout = ()=>{

    const [loading, setLoading] = useState(false);
    const {url} = useConversation();
    const navigate = useNavigate()


    const logout = async () => {
    
        const {token}=(JSON.parse(localStorage.getItem('chat-user')) || {token:''});

        if(!token){
            navigate('/login');
        }

    const res = await fetch(`${url}/api/auth/logout`,{
        method:'POST',
        headers: {
          'Authorization':token,
      }
    }) 
    if(res.status === 200) {
        localStorage.removeItem("chat-user");
        window.location.href = "/login";
        setLoading(false);
    }         
    };

    return { loading, logout };
}

export default useLogout;