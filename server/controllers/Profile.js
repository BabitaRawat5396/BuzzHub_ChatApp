const User = require("../models/User");
const fileUpload = require("../utils/fileUploader");


exports.changeProfilePicture = async(req,res) => {
  try {
    const {userId} = req.body;
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
    // profileImage:image.secure_url
    const response = await User.findByIdAndUpdate(userId,{
      profileImage:image.secure_url
    })

    if(!response){
      return res.status(404).send({
        success: false,
        message: `User Not found. Please try again.`
      })
    }

    return res.status(200).json({
      success:true,
      message:"Successfully updated Profile picture",
      data:response
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to update profile Image",
      error:error.message
    })
  }
}