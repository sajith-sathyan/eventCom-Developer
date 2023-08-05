const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const AdminSchema = new mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    Token:{
      type:String
    }
})
AdminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  AdminSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
       
      }
      throw Error("incorrect password");
    }
    throw Error("incorrect email");
  };
module.exports = mongoose.model('Admin',AdminSchema)