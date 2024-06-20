/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuth } = useAuthContext();
	const {url} = useConversation();

	const signup = async ({ fullName, username, password, gender }) => {
		const success = handleInputErrors({ fullName, username, password, gender });
        console.log(success)
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch(`${url}/api/auth/signup/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, gender }),
			});

			console.log("res:",res);

			const data = await res.json();
            console.log(data)
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuth(JSON.stringify(data));
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, gender }) {
	if (!fullName || !username || !password || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}