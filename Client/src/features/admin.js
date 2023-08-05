import {createSlice} from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name:"Logged Admin",
    initialState:{value:{
        email:''
    }},
    reducers:{
        loggedAdmin:(state,action)=>{
            state.value = action.payload
        }
    }
})
export const {loggedAdmin} = adminSlice.actions;
export default adminSlice.reducer;