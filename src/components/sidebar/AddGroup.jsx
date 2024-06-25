/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useGetConversation from '../../hooks/useGetConversation';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import Conversation from './Conversation';
 
export function NotificationDialog({groupName}) {
  const {loading,conversations} = useGetConversation();
  const [open, setOpen] = useState(false);
  const [collect,setCollect] = useState([]);
 
  console.log("conversations:",conversations)

  let isSelected;
  const handleCollectUser=(id)=>{
    if(!collect.includes(id))
    setCollect([...collect,id])

  }

  const handleCheck=()=>{
    console.log(collect)
  }

  const handleOpen = () => setOpen(!open);
 
  const handleGroupName=async()=>{
    console.log("called")
    try {
     const token=localStorage.getItem('token');
     
     if(!groupName) throw new Error("Enter Group name!"); 
     if(!(collect.length>0)) throw new Error("Enter Group name!");
      console.log(groupName,collect);
     const res = await fetch(`http://localhost:5000/api/group/create/`,{
       method: "POST",
       headers: { "Content-Type": "application/json",'Authorization':token, },
       body: JSON.stringify({groupName,collect}),
    })
   console.log(res);
   if (res.status===400) throw new Error("Already exist");

   const data=await res.json();
   console.log("data:",data);

   if (data.error) throw new Error(data.error);

   toast.success(data.message)
    }catch (error) {
     toast.error(error.message);
    }
   }

  return (
    <>
 <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
      onClick={handleOpen}
      >Create Group</button>   
      <div className='w-full flex justify-center items-center'>
      <Dialog className='bg-gray-300 w-[600px] h-90' open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="black">
           select the people
          </Typography>
        </DialogHeader>
        {
        conversations?.getAllUser?.length>0 && conversations.getAllUser?.map((conversation)=>{
             return(
              <>
              <div onClick={()=>handleCollectUser(conversation._id)} className={` flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}>
                <div>
                  <div className='w-12 rounded-full'>
                    <img
                      src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
                      alt='user avatar'
                    />
                  </div>
                </div>
        
                <div className=' flex flex-col flex-1'>
                  <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-black'>{conversation.fullName||conversation.groupName}</p>
                    <span className='text-xl'>🎃</span>
                  </div>
                </div>
              </div>
        
              <div className='bg-white-20 divider my-0 py-0 h-1' />
            </>
				)		
			})
        }
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue" onClick={handleOpen}>
            close
          </Button>
          <Button variant="text" color="blue" onClick={handleGroupName}>
            Create
          </Button>
        </DialogFooter>
      </Dialog>
      </div>
    </>
  );
}

const AddGroup = () => {
  const [groupName,setGroupName]=useState('');

  return (
    <>
      <input type="text" id="first_name" className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Group name" 
      required 
      value={groupName}
      onChange={(e)=>setGroupName(e.target.value)}
      />
       <NotificationDialog groupName={groupName}/>

    </>
  )
}

export default AddGroup
