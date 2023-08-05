const mongoose = require("mongoose")

const EventMedia = new mongoose.Schema({
  EventStatus:{
    type:String
  },
    basicInfoId:{
      type:String,
      required: [true, "basicInfoId is Required"]
    },
    TicketsId:{
      type:String,

    },
    userId:{
      type:String
    },
    eventImgUrl:{
        type:String,
        required: [true, "eventImgUrl is Required"]
    },
    summary:{
        type:String,
        required: [true, "summary is Required"]
    },
    description: {
        type: String,
        required: [true, "description is Required"]
        
      }
})

module.exports = mongoose.model('EVENTMEDIA',EventMedia)
