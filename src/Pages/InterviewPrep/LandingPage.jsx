import React, { useState } from "react";
import { APP_FEATURES } from "../../utils/data";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";


const LandingPage=()=>{

  const [currentPage,setCurrentPage]=useState('login')

    return (
        <div>
        <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Interview Prep</a>
        </div>
        <div className="flex gap-2">
        <div className="mt-2">
        <label className="flex cursor-pointer gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <path
      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
  <input type="checkbox" value="dark" className="toggle theme-controller" />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
</label>
        </div>
        <button onClick={()=>document.getElementById('my_modal_4').showModal()}  className="btn btn btn-success">Login/Signup</button>
        </div>
      </div>
      <div>
      <div className=" py-16 px-4 sm:px-6 lg:px-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    {/* Left Side - Text */}
    <div>
      <h2 className="text-4xl font-bold mb-4">Ace Interviews with Ai-Powered Learning</h2>
      <p className="">
      Crack interviews with intelligent, personalized guidance.
      AI helps you learn faster, answer better, and stand out.
      </p>
      <div className="w-full text-center">
      <button className="btn btn-success btn-wide mt-5 shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
  Get Started
</button>
</div>
      <ul className="space-y-4 my-10">
       {
        APP_FEATURES.map((f)=>{
            return (
                <li key={f.id} className="flex items-start gap-3">
                <span className="bg-green-600 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span>{f.description}</span>
              </li>
            )
        })
       }
    
      </ul>
      
    </div>
    

    {/* Right Side - Image */}
    <div>
      <img
        src="https://d2xhtkw2dlln4s.cloudfront.net/wp-content/uploads/2017/03/Quick-Interview-Prep-Tips.png"
        alt="App Screenshot"
        className="rounded-xl shadow-2xl border border-gray-700"
      />
    </div>
  </div>
</div>
      </div>
      <dialog id="my_modal_4" className="modal">
  <div className="modal-box w-6/12 max-w-5xl">
    {
      currentPage==='login'? <Login /> : <SignUp />
    }
    <div className="text-center mt-5">
    {
      currentPage==='login'? <p>Dont have an account?<button onClick={()=>setCurrentPage('signup')} className="btn btn-danger ml-2">SignUp</button></p> : 
      <p>Already have an account?<button onClick={()=>setCurrentPage('login')} className="btn btn-danger">Login</button></p>
    }
     
     </div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button onClick={()=>setCurrentPage('login')} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>
  </div>
</dialog>
      </div>
    )
}

export default LandingPage