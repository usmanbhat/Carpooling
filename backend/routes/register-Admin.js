const express = require("express");
const registerRoutes = express.Router() 
const signup_data = require("../models/login_signup");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();         
const jwtSecret = process.env.jwtSecret         //jwt secret key used to verify jwt token stored in env varibales


//  API to register data of user in database using Angular form.

registerRoutes.post('/register', (req,res) => {
    console.log(req.body);

    // const { adminName, email, password, cnfpassword } = req.body;

    const user = new signup_data({
      adminName: req.body.adminName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)), // Hashing the password
      cnfpassword: req.body.cnfpassword,
    })
    user.save()
    .then(() => {
      // Generate a JWT token
      const token = jwt.sign({ email: user.email }, jwtSecret);
      console.log("Registration jwt Token :",token)
      res.json({success: true, message: "Account has been created", token})
      
    }).catch((err) => {
      console.log(err);
      if(err.code === 11000){
        console.log("Email Already Exists")
        return res.json({success: false, message: "Email Already Exists"})
      }
      res.json({success: false, message: err})
    })
})


module.exports = registerRoutes