const mongoose = require ("mongoose")

const Tickets = new mongoose.Schema({
    EventStatus:{
        type:String
    },
    basicInfoId:{
        type:String,
        
    },
    EventMediaId:{
        type:String,
        
    },
    userId:{
        type:String,
    },
    Addmission:{
        type:Array
    },
    AddOns:{
        type:Array 
    },
    SelledTicket:{
        type:Array
    }


})

module.exports = mongoose.model("TICKETS",Tickets)