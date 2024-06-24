import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuth,setAuthUser } = useAuthContext();
	const {url} = useConversation();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch(`${url}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
            console.log(data)
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuth(data?.token);
			setAuthUser(data?.userDetail)
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}

	return true;
}