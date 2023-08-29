const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName:{
          type:String,
          required:true,
          trim:true, 
        },
        email:{
          type:String,
          required:true,
          trim:true,
        },
        password:{
          type:String,
          required:true,
        },
        token:{
        type:String,
        },
        profileImage:{
          type:String,
          required:true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User",userSchema);