import React, { useState } from "react";
import {LuPlus} from 'react-icons/lu'
import {CARD_BG} from '../../utils/data'
import toast from "react-hot-toast"
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import moment from "moment"
import CreateSessionForm from "./CreateSessionForm";


const Dashboard=()=>{
  const [sessions,setSessions]=useState([])
   const fetchAllSessions=async()=>{
      try {
        const response=await axiosInstance.get(API_PATHS.SESSIONS.GET_ALL)
      setSessions(response.data)
      } catch (error) {
        console.error("Error Fetching Data",error)
      }
   } 

   useEffect(()=>{
    fetchAllSessions()
   },[])

    return (
        <DashboardLayout>
            <div className="flex flex-wrap justify-center gap-4 p-4">
           {
            sessions?.map((data,index)=>{
                return <SummaryCard 
                key={data?.id}
                role={data?.role}
                description={data?.description}
                topicsToFocus={data?.topicsToFocus}
                experience={data?.experience}
                questions={data?.questions}
                lastUpdated = {
                    data?.updatedAt 
                      ? moment(data.updatedAt).format("Do MMM YYYY") 
                      : ' '
                  }
                  
                
                />
            })
           }
            
            </div>
          <button onClick={()=> document.getElementById('my_modal_4').showModal()} class="fixed bottom-10 right-10 bg-orange-500 text-white font-bold py-2 px-4 rounded flex items-center shadow-lg hover:bg-orange-600 transition md:right-6 md:bottom-6">
  <span class="mr-2 text-xl">+</span> Add New
</button>
<dialog id="my_modal_4" className="modal">
  <div className="modal-box w-10/12 md:w-5/12 max-w-5xl">
    
   <CreateSessionForm />
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button, it will close the modal */}
        <button  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>
  </div>
</dialog>
        </DashboardLayout>
    )
}

export default Dashboard