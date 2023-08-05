import {createSlice} from '@reduxjs/toolkit'
// import { login } from '../features/';

const userSlice = createSlice({
    name:"logined user",
    initialState : {value:{
        userId:null,
        username:'',
        mobile:0,
        email:'',
        status:false,
        accessToken:''
    }},
    reducers:{
         loggedUser: (state,action) => {
            state.value = action.payload
         }
    }
})
// const sidebarHeighlight = createSlice({})
export const {loggedUser} = userSlice.actions;
export default userSlice.reducer;