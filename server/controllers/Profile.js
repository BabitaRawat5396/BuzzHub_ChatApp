const User = require("../models/User");
const fileUpload = require("../utils/fileUploader");


exports.getProfile = async(req,res) => {
  try {
    const response = await User.find({});

    return res.status(200).json({
      success:true,
      message:"Profile fetched sucessfully",
      response
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"unable to fetched sucessfully",
      error:error.message
    })
  }
}

exports.changeProfilePicture = async(req,res) => {
  try {
    const displayPicture = req.files.profileImage;

    // Values fetched
    if(!displayPicture){
      res.status(404).json({
        success:false,
        message:"All fields are required"
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

    
  } catch (error) {
    
  }
}