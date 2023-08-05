const jwt = require("jsonwebtoken");
const User = require("../model/AuthModel")
const router = require("express").Router();
require("dotenv").config();
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
console.log("token-------------------------->",token)
  if (!token) {
    // return res.status(401).json({ message: 'No token provided' });
    next(); 
  }

  const tokenWithoutBearer = token.split(' ')[1]; // Extract token without "Bearer" prefix

  jwt.verify(tokenWithoutBearer, process.envACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // return res.status(403).json({ message: 'Invalid token' });
      next();
    }

    // Set the decoded token in the request object for use in the protected route
    req.userId = decoded.userId;
    next();
  });
};


