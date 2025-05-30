import React, { useState } from 'react'
import { validateEmail, validatePassword } from '../../utils/helper'


const Login=()=>{

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState(null)


    const loginHandler=()=>{
        setError(null)
       if((!validateEmail(email))) {
           setError('Email not valid')
           return 
       }
      
       if(!validatePassword(password)) {
        setError('password doesnt meet the requirment')
        return 
    }
    }

    return (
        <>
         <h3 className="font-bold text-lg text-center">Login in to exisitng account</h3>
         
          
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
              className="input input-success  w-full max-w-xs"
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