/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./useAuthContext.jsx";
import io from "socket.io-client";
import useConversation from "../zustand/useConversation";


const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { AuthUser } = useAuthContext();
	const { url } = useConversation();

	useEffect(() => {
		if (AuthUser) {
			const socket = io(url,{
				query: {
					userId: AuthUser._id,
				},
			});
            console.log(socket);
			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	},[AuthUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};