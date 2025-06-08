import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateSessionForm=()=>{


    const [role,setRole]=useState("")
    const [experience,setExperience]=useState("")
    const [topicsToFocus,setTopicsToFocus]=useState("")
    const [description,setDescription]=useState("")

     const navigate=useNavigate()
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)

      const handleCreateSession=(e)=>{
        

        

        if(!role || !experience || !topicsToFocus || !description) {
            setError("Please fill all the fields")
            return
        }

        setError("")
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },3000)
        

      }


    return (
        <>
        
        <h3 className="font-bold text-lg text-center">Start a New Interview Journey</h3>
        <p className="italic text-sm text-center">Share a few details and get your personalized interview questions instantly!</p>
         
         <div className="mt-6 flex flex-col items-center">
       
         <fieldset className="fieldset">
  <legend className="fieldset-legend">Target Role?</legend>
  <input  type="text" onChange={(e)=>setRole(e.target.value)} className="input w-80" placeholder="(e.g. FrontEnd Deveoper,UI/UX designer, etc.)"/>
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Years of Experience?</legend>
  <input  type="text" onChange={(e)=>setExperience(e.target.value)} className="input w-80" placeholder="(e.g. 1 year,3 years, 5+ years)"/>
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Topics to Focus?</legend>
  <input  type="text" onChange={(e)=>setTopicsToFocus(e.target.value)} className="input w-80" placeholder="(comma-seapareted, e.g., React, Node.js,Devops)"/>
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Description?</legend>
  <input  type="text" onChange={(e)=>setDescription(e.target.value)} className="input w-80" placeholder="(Any specific goals or notes for this session)"/>
</fieldset>
{
    error && <p>{error}</p>
}
 {
    isLoading? <span className="loading loading-bars loading-xl"></span> : <button onClick={()=>handleCreateSession()} className="btn btn-primary mt-2">Create Session</button>
 } 
  
  
  

           </div>
       </>
    )
}

export default CreateSessionForm