import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment"
import {AnimatePresence,motion} from "framer-motion"
import { LuCircleAlert,LuListCollapse } from "react-icons/lu";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "../../../components/Layouts/DashboardLayout";
import { API_PATHS } from "../../../utils/apiPaths";
import axiosInstance from "../../../utils/axiosInstance";
import RoleInfoHeader from "../../../components/RoleInfoHeader";
import QuestionCard from "../../../components/Cards/QuestionCard";


const InterviewPrep=()=>{
    const {sessionId}=useParams()
    const [sessionData,setSessionData]=useState(null)
    const [error,setError]=useState("")
    const [openLearMoreDrawer,setOpenLearnMoreDrawer]=useState(false)
    const [explaination,setExplaination]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [isUpdateLoader,setIsUpdateLoader]=useState(false)
    
    const fetchSessionDetailsById=async (sessionId)=>   {
        try {
        const response=await axiosInstance.get(API_PATHS.SESSIONS.GET_BY_ID(sessionId))
       
        if(response.data && response.data.session) {
            setSessionData(response.data.session)
        }

      } catch (error) {
        console.error("Error Fetching Data",error)
      }
    }

    const generateConceptExplaination=async(question)=>{}

    const toggleQuestionPinStatus=async(questionId)=>{}

    const uploadMoreQuestions=async()=>{}

    useEffect(()=>{
        if(sessionId) {
            fetchSessionDetailsById(sessionId)
        }

        return ()=>{}
    },[])

    
    return (
       <DashboardLayout>
          <RoleInfoHeader
            
                   role={sessionData?.role || ""}
                          description={sessionData?.description || ""}
                          topicsToFocus={sessionData?.topicsToFocus || ""}
                          experience={sessionData?.experience || ""}
                          questions={sessionData?.questions?.length || ""}
                          lastUpdated = {
                              sessionData?.updatedAt 
                                ? moment(sessionData.updatedAt).format("Do MMM YYYY") 
                                : ' ' }
           
          
          />
        <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
            <h2 className="text-lg font-semibold color-black">Interview Q & A</h2>
         <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
            <div className={`col-span-12 ${openLearMoreDrawer? "md:col-span-7" : "md:col-span-8"}`}>
              <AnimatePresence>
                {
                    sessionData?.questions?.map((data,index)=>{
                        return (
                            <motion.div key={data._id  || index}
                             initial={{opacity:0,y:-20}}
                             animate={{opacity:1,y:0}}

                             exit={{opacity:0,scale:0.95}}
                             transition={{
                                duration:0.4,
                                type:'spring',
                                stiffness:100,
                                delay:index*0.1,
                                damping:15
                             }}
                             layout
                             layoutId={`question-${data._id || index}`}
                            >
                                <>
                                <QuestionCard 
                                   question={data?.question}
                                   answer={data?.answer}
                                   onLearnMore={()=>{
                                     generateConceptExplaination(data.question)
                                   }}
                                   isPinned={data?.isPinned}
                                   onTogglePin={()=>toggleQuestionPinStatus(data._id)}
                                   />
                                </>

                            </motion.div>
                        )
                    })
                }
              </AnimatePresence>
            </div>
         </div>
         </div>
            </DashboardLayout>
    )
}

export default InterviewPrep