    const mongoose = require("mongoose")


    const createCategoryAndType = new mongoose.Schema({
        Name:{
            type:String
        },   
        Category:{
            type:Array
        },
        Type:{
            type:Array
        }
            

    })


    module.exports = mongoose.model('CATEGORYANDTYPE', createCategoryAndType)