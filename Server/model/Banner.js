const mongoose = require("mongoose")

const CreateBannerSchema = new mongoose.Schema({
    showBanner:{
        type:String
    },
    BannerUrl:{
        type:Array
    }
})
module.exports = mongoose.model('Banner', CreateBannerSchema)