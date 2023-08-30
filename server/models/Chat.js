const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chatName:{type:String,trim:true},
    isGroupChat:{type:Boolean, defauly: false},
    users:[{type:mongoose.Schema.Types.ObjectId, ref:"User"},],
    latestMessage:{type:mongoose.Schema.Types.ObjectId,ref:"Message"},
    groupAdmin:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    deleteChatUsers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"},],
    groupImage:{type:String},
  },
  {timestamps:true}
);

module.exports = mongoose.model("Chat",chatSchema);