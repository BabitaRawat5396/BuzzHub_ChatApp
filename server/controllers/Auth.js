const User = require("../models/User");
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fileUpload = require("../utils/fileUploader");


exports.signup = async(req,res) => {
  try {
    const {userName,email,password} = req.body;
    const displayPicture = req.files.profileImage;
    
    // Values fetched
    if(!userName || !email || !password || !displayPicture){
      res.status(404).json({
        success:false,
        message:"All fields are required"
      })
    }
    //is password strong
    const isPassStrong = validator.isStrongPassword(password,{ 
      minLength: 8, 
      minLowercase: 1, 
      minUppercase: 1, 
      minNumbers: 1, 
      minSymbols: 1
    }); 

    if(!isPassStrong){
        res.json({
            success:false,
            message:"Password is not strong"
        })
    }

    //Email validation
    const isEmailValid = validator.isEmail(email,{
      domain_specific_validation:true, //disallowing certain syntactically valid email addresses that are rejected by specific email providers like Gmail.
      blacklisted_chars: '!#$%', //validator will reject email addresses that include any of the characters in the specified string, but only in the name part (before the @ symbol).
    });

    if(!isEmailValid){
        return res.json({
            success:false,
            message:"Email address is not valid"
        });
    }

    // If email already exists in the database
    const emailExist = await User.findOne({email});
    if(emailExist){
      return res.status(400).json({
        success:false,
        message: "User already exists. Please sign in to continue.",
      })
    }
    
    // Upload image to cloudinary
    const image = await fileUpload.fileUploadToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )

    if(!image)
    {
      return res.status(500).send({
        success: false,
        message: `Could Not Upload the Image. Please try again.`
      })
    } 

    //Encrypt password

    // 1. generating salt 
    const salt = await bcrypt.genSalt(10)
      .catch((error) => {
          res.json({
            success:false,
            message:"Error occured while generating salt",
            error:error.message
          })
    });

    // 2. hashing the password
    const hash = await bcrypt.hash(password,salt)
      .catch((error) => {
        res.json({
          success:false,
          message:"Error occured while generating salt",
          error:error.message
        })
    })
    
    // Creating User
    const user = await User.create({
      userName:userName,email:email,password:hash,profileImage:image.secure_url
    })
    
    if(!user){
      return res.status(404).json({
        success: false,
        message: "Unable to create user",
      });
    }

    return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
  } catch (error) {
    return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
            error:error.message,
		});
  }
}


exports.login = async(req,res) => {
  try {

    const {email,password} = req.body;

    if(!email || !password){
      res.status(404).json({
        success:false,
        message:"All fields are required"
      })
    }
    //check if email does not exist
    const user = await User.findOne({email})
    
    if(!user){
		  // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success:false,
        message:"Email does not exist"
      })
    }

    //check if password is correct
    if(await bcrypt.compare(password,user.password)){
      const payload = {
        email:user.email,
        id:user._id,
      }
      
      const token = jwt.sign(payload,process.env.JWT_KEY_SECRET,{expiresIn:"24h"});

      if(!token){
        res.json({
          success:false,
          message:"Unable to generate token, Please try again."
        })
      }

			// Save token to user document in database
      user.token = token;
      user.password = undefined;

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3*24*60*60*1000), //expiration for 3 days
        httpOnly:true,
      }
            
      res.cookie("token",token,options).status(200).json({
        success:true,
        token,
        user,
        message:"Logged in succesfully"
      })
    }else{
      return res.status(401).json({
          success:false,
          message:"Password incorrect"
      })
    }

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to login",
      error:error.message
    })
  }
}