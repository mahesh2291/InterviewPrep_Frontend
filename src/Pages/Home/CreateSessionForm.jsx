import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

const CreateSessionForm=()=>{


    const [role,setRole]=useState("")
    const [experience,setExperience]=useState("")
    const [topicsToFocus,setTopicsToFocus]=useState("")
    const [description,setDescription]=useState("")

     const navigate=useNavigate()
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)

    const handleCreateSession = async (e) => {
        e.preventDefault();
      
        if (!role || !experience || !topicsToFocus) {
          setError("Please fill all the fields");
          return;
        }
      
        setError("");
        setIsLoading(true);
      
        try {
          // 1. Generate questions from AI
          const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
            role,
            experience,
            topicsToFocus,
            numberOfQuestions: 10,
          },{ timeout: 90000 });
      
          const generatedQuestions = aiResponse.data;
      
          // 2. Save session with generated questions
          const response = await axiosInstance.post(API_PATHS.SESSIONS.CREATE, {
            role,
            experience,
            topicsToFocus,
            description,
            questions: generatedQuestions,
          });
      
          // 3. Navigate if session created
          if (response.data?.session?._id) {
            // Clear form inputs after success
            setRole("");
            setDescription("");
            setTopicsToFocus("");
            setExperience("");
            navigate(`/interview-prep/${response.data.session._id}`);
          }
      
        } catch (error) {
          console.error(error);
          if (error.response?.data?.message) {
            setError(error.response.data.message);
          } else {
            setError("Something went wrong, please try again.");
          }
        } finally {
          setIsLoading(false);
        }
      };
      

    return (
        <>
        
        <h3 className="font-bold text-lg text-center">Start a New Interview Journey</h3>
        <p className="italic text-sm text-center">Share a few details and get your personalized interview questions instantly!</p>
         
         <div className="mt-6 flex flex-col items-center">
       
         <fieldset className="fieldset">
  <legend className="fieldset-legend">Target Role?</legend>
  <input value={role}  type="text" onChange={(e)=>setRole(e.target.value)} className="input w-80" placeholder="(e.g. FrontEnd Deveoper,UI/UX designer, etc.)"/>
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Years of Experience?</legend>
  <input value={experience}  type="text" onChange={(e)=>setExperience(e.target.value)} className="input w-80" placeholder="(e.g. 1 year,3 years, 5+ years)"/>
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Topics to Focus?</legend>
  <input value={topicsToFocus}  type="text" onChange={(e)=>setTopicsToFocus(e.target.value)} className="input w-80" placeholder="(comma-seapareted, e.g., React, Node.js,Devops)"/>
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Description?</legend>
  <input value={description}  type="text" onChange={(e)=>setDescription(e.target.value)} className="input w-80" placeholder="(Any specific goals or notes for this session)"/>
</fieldset>
{
    error && <p>{error}</p>
}
 {
    isLoading? <span className="loading loading-bars loading-xl"></span> : <button onClick={(e)=>handleCreateSession(e)} className="btn btn-primary mt-2">Create Session</button>
 } 
  
  
  

           </div>
       </>
    )
}

export default CreateSessionForm