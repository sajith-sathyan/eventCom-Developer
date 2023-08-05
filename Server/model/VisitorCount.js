const Mongoose = require("mongoose");
const visitorCountSchema = Mongoose.Schema({
    page:{
        type:String,

    },  
    count: {
      type: Array,
     
    },
    
  });
  
  module.exports = Mongoose.model('VisitorCount', visitorCountSchema);