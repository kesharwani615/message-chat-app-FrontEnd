/* eslint-disable no-unused-vars */
import { create } from 'zustand';

const useConversation=create((set)=>({
    selectedConversation : null,
    setSelectedConversation : (selectedConversation) =>set({selectedConversation}),
    messages:[],
    setMessage:(messages) => set({messages}),
    isGroup:false,
    setIsGroup:(isGroup)=>set({isGroup}),
}))

export default useConversation;