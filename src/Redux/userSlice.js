import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:'user',
    initialState:{},
    reducers:{
        addUser:(state,action)=>{
            return state=action.payload
        }
    }
})

export const {addUser}=userSlice.actions
export default userSlice.reducer