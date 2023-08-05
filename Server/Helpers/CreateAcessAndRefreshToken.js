const jwt = require("jsonwebtoken")

// generate access token
const generateAccessToken = (user) => {
    console.log("user---->",user.id)
  
    const token = jwt.sign({ userId:user.id }, "access token secret", { expiresIn: '15m' });
  
    return token;
}

// generate refresh token 
const genereateRefreshToken = (user) => {
    return  jwt.sign({userId:user.id},"refresh token secret",{expiresIn:'5s'})
}

module.exports = {generateAccessToken,genereateRefreshToken}