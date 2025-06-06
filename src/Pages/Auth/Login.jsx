import React, { useState } from 'react'
import { validateEmail, validatePassword } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import  { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../../Redux/userSlice'


const Login= ()=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const loginHandler=async ()=>{
        setError(null)
       if((!validateEmail(email))) {
           setError('Email not valid')
           return 
       }
      
       if(!validatePassword(password)) {
        setError('password doesnt meet the requirment')
        return 
    }

       try {
           const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password})
           
           const {token}=response.data
           const user=response.data

           if(token) {
            localStorage.setItem("token",token)
            navigate('/dashboard')
            dispatch(addUser(user))
           }
       } catch(error) {
        setError(error)
       }


    }

    return (
        <>
         <h3 className="font-bold text-lg text-center">Login in to existing account</h3>
         
          
          <div className="mt-6 flex flex-col items-center">
            <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="input input-success w-full max-w-xs mb-4"
            />
            <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="input input-success w-full max-w-xs"
            />
           {
            error && <p className='text-sm mt-1 text-red-800'>{error}</p>
           } 
            <button onClick={()=>loginHandler()} className="btn btn-success mt-6 w-full max-w-xs">
              LOGIN
            </button>
            </div>
        </>
    )
}

export default Login