import {createSlice} from '@reduxjs/toolkit'

const createEvent = createSlice({   
    name:"Store Id of Evnets",
    initialState:{value:{
        BasicInfoId:'',
        EventMediaId:'',
        TicketId:''
    }},
    reducers:{
        createEventId:(state,action)=>{
            state.value = action.payload
        }
    }
})
export const {createEventId}  = createEvent.actions
export default createEvent.reducer