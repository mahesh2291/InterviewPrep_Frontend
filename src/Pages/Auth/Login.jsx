import React, { useState } from 'react'
import { validateEmail, validatePassword } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import  { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'


const Login= ()=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState(null)
    const navigate=useNavigate()
   const {updateUser}=useContext(UserContext)

    const loginHandler=async (e)=>{
        e.preventDefault()
       if((!validateEmail(email))) {
           setError('Email not valid')
           return 
       }
      
       if(!validatePassword(password)) {
        setError('password doesnt meet the requirment')
        return 
    }
    setError(" ")
       try {
           const response=await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password})
           
           const {token}=response.data
           

           if(token) {
            localStorage.setItem("token",token)
            updateUser(response.data)
            navigate('/dashboard')
           }
       } catch(error) {
         if(error.response && error.response.data.message) {
          setError(error.response.data.message)
         } else {
          setError("Something went wrong, Please try again.")
         }
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
            <button onClick={(e)=>loginHandler(e)} className="btn btn-success mt-6 w-full max-w-xs">
              LOGIN
            </button>
            </div>
        </>
    )
}

export default Login