import { useState } from "react";
import useConversation from "../zustand/useConversation";

const useLogout = ()=>{

    const [loading, setLoading] = useState(false);
    const {url} = useConversation();


    const logout = async () => {
    
    const {token}=JSON.parse(localStorage.getItem('chat-user'));

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