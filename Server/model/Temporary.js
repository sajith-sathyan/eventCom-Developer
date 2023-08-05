const mongoose = require("mongoose");

const Temporary = mongoose.Schema({
    userID:{
        type:String
    },
    admissionDetails:{
        type:Array
    }
   

})
module.exports = mongoose.model("TEMPORARY", Temporary);