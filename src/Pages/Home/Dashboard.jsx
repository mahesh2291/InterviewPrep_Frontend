import React from "react";
import {LuPlus} from 'react-icons/lu'
import {CARD_BG} from '../../utils/data'
import toast from "react-hot-toast"
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";


const Dashboard=()=>{

   const fetchAllSessions=async()=>{
      const response=await axiosInstance.get()
   }

   useEffect(()=>{
    fetchAllSessions
   },[])

    return (
        <DashboardLayout>
            Dashboard
        </DashboardLayout>
    )
}

export default Dashboard