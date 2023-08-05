const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    auth_time: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        required: [true, "Status is required"],
        default: "active" 
      }
}, { timestamps: true }
)


module.exports = mongoose.model('User',userSchema)