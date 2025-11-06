// const bcrypt = require('bcrypt');
// const User = require("../models/userModel");
// const jwt = require("jsonwebtoken")

// require("dotenv").config()

// // Sign up route handler
// exports.signup = async (req, res) => {
//     try {
//         // get data
//         const { name, email, password, role, address, phone, age } = req.body;

//         // check if user already exist 
//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User Already Exists",
//             })
//         }

//         // Secured password 
//         let hashedPassword;
//         try {
//             hashedPassword = await bcrypt.hash(password, 10);
//         }
//         catch (err) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Error in hashing password",
//             })
//         }

//         // Create Entry for User
//         let user = await User.create({
//             name,email,password:hashedPassword,role
//         });

//         return res.status(200).json({
//             success : true,
//             message : "User Created Successfully",
//             data : user
//         });
//     }
//     catch (err) {
//         console.error(err)
//         return res.status(500).json({
//             success: false,
//             message: "User cannot be register,Please try again later",
//         })
//     }
// }

// // Login
// exports.login = async (req,res) => {
//     try
//     {
//         const {email,password} = req.body;
//         if(!email || !password)
//         {
//             return res.status(400).json({
//                 success:false,
//                 message : "Please fill all the details carefully",
//             })
//         }

//         // check for register user 
//         let user = await User.findOne({email});
//         if(!user)
//         {
//             return res.status(401).json({
//                 success : false,
//                 message : "User does not exist",
//             });
//         }

//         // Verify password & generate a JWT token

//         const payload = {
//             email : user.email,
//             id : user._id,
//             role : user.role,
//             name : user.name
//         };


//         if(await bcrypt.compare(password,user.password)){
//             // password match
//         const token = jwt.sign(
//         payload,  //sending the user role so that we can use it in frontend and when i click on login it will redirect to the respective page
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//         );

//             user = user.toObject();
//             user.token = token;
//             user.password = undefined;

//             const options = {
//                 expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//                 httpOnly : true,
//             }

//             res.cookie("token",token,options).status(200).json({
//                 success : true,
//                 token,
//                 user,
//                 message:"User logged in successfully"
//             });
//         }
//         else {
//             // password not match
//             return res.status(403).json({
//                 success : false,
//                 message : "Password does not match",
//             })
//         }
//     }
//     catch(err){
//         console.error(err)
//         return res.status(500).json({
//             success : false,
//             message : "Login false" 
//         })
//     }
// }

//the above was before the updated model

const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// =========================
// SIGNUP CONTROLLER
// =========================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, address, phone, age, gender } = req.body;

    // Validate all fields
    if (!name || !email || !password || !role || !address || !phone || !age || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists (by email or phone)
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      address,
      phone,
      age,
      gender,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// =========================
// LOGIN CONTROLLER
// =========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Create payload for JWT
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    // Generate token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Remove password before sending response
    user = user.toObject();
    user.password = undefined;
    user.token = token;

    // Set cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    return res.cookie('token', token, options).status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
