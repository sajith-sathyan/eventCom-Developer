const mongoose = require("mongoose")


const createEventSchema = new mongoose.Schema({
        EventStatus:{
                type:String
        },
        userId:{
                type:String  

        },
        
        EventMediaId:{
                type:String
        },
        TicketsId:{
                type:String
        },
        eventTitle: {
                type: String,
                required: [true, "basicInfo is Required"]
        },
        
        organizerName: {
                type: String,
                required: [true, "organizerName is Required"]
        },
        type: {
                type: String,
                required: [true, "type is Required"]
        },
        type: {
                type: String,
                required: [true, "type is Required"]
        },
        category: {
                type: String,
                required: [true, "Category is Required"]
        },
        longitude: {
                type: String,
                required: [true, "longitude is Required"]
        },
        locationAddress:{
                type:String
        },
        latitude: {
                type: String,
                required: [true, "latitude is Required"]
        },

        startDate: {
                type: String,
                required: [true, "startDate is Required"]
        },
        startTime: {
                type: String,
                required: [true, "startTime is Required"]
        },
        endDate: {
                type: String,
                required: [true, "endDate is Required"]
        },
        endTime: {
                type: String,
                required: [true, "endTime is Required"]
        },
        eventImgUrl:{
                type: String,
                
        },
       
        

})


module.exports = mongoose.model('basicInfo', createEventSchema)