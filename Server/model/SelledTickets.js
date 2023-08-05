const mongoose = require("mongoose");

const SelledTicket = mongoose.Schema({
  UserId: {
    type: String,
  },
  EventMediaId:{
    type:String
  },
  TicketId: {
    type: String,
  },
  eventTitle:{
    type:String
  },
  TicketName: {
    type: String,
  },
  TotalPrice: {
    type: String,
  },
  locationAddress:{
    type:String
},
  admissionDetails:{
    type:Array
  },
  Quantity: {
    type: String,
  },
  QrcodeImage:{
    type:String
  },
  StartDate: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endDate: {
    type: String,
  },
  endTime: {
    type: String,
  },
  longitude: {
    type: String,
  },
  latitude: {
    type: String,
  },
});
module.exports = mongoose.model("SELLEDTICKET", SelledTicket);
