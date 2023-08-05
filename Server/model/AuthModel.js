const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new Mongoose.Schema({
  username:{
    type: String,
    required: [true, "Username is Required"],
    
  },
  Status:{
    type: String,
    required: true,
    required: [true, "Status is Required"]
  },
  mobile: {
    type: Number,
    required: true,
    required: [true, "Mobile is Required"]
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  accessToken:{
    type:String
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }); // Use findOne instead of find

  if (user) {
    const auth = await bcrypt.compareSync(password, user.password);

    if (auth) {
      return user;
    }

    throw Error("Incorrect password");
  }

  throw Error("Incorrect email");
};

module.exports = Mongoose.model("Users", userSchema);
