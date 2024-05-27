import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuth } = useAuthContext();
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
			console.log(data);
			console.log(data.token);
			if (data.error) {
				throw new Error(data.error);
			}

			localStorage.setItem("token",data.token);
			localStorage.setItem("userDetail", JSON.stringify(data.userDetail));
			setAuth(data.token);
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