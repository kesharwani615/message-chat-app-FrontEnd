/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import useSignup from '../../hooks/useSignup';


const Signup = () => {

    const {loading,signup}= useSignup();

	const { register, handleSubmit,reset } = useForm();

	const onSubmit  = (element) => {
		signup(element);
		reset();
	}; 

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Sign Up <span className='text-blue-500'> ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input type='text' placeholder='John Doe'  {...register("fullName", { required: true })} className='w-full input input-bordered  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input type='text' placeholder='johndoe'  {...register("username", { required: true })} className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							{...register("password", { required: true })}
							className='w-full input input-bordered h-10'
						/>
					</div>

					{/* here checkbox */}
					<div className='flex'>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Male</span>
          <input 
           type="radio"
		   value="male"
           name="genderMale" 
           className='checkbox border-slate-900' 
			{...register("gender", { required: true })}
          />
        </label>
      </div>
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Female</span>
          <input 
            type="radio"
			value="female"
            name="genderFemale" 
            className='checkbox border-slate-900' 
			{...register("gender", { required: true })}
          />
        </label>
      </div>
    </div>

					<a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
						Already have an account?
					</a>

					<div>
						<button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;