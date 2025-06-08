import { useContext } from "react"
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../context/userContext'


const ProfileInfoCard=()=>{

    const {user,clearUser}=useContext(UserContext)
    const navigate=useNavigate()

    const handleLogout=()=>{
        localStorage.clear();
        clearUser()
        navigate("/")
    }
    return (
        user && <div className="flex mt-1.5">
            <div className="mr-8">
            {user.name || "Mahesh"}
            </div>
         
          <button onClick={()=>handleLogout()} className="btn btn-sm -mt-1">Logout</button>
        </div>
    )
}


export default ProfileInfoCard