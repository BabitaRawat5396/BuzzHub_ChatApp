const User = require("../models/User")

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