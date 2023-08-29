const Chat = require("../models/Chat");
const Message = require("../models/Message");

exports.addMessage = async(req,res) => {
  try {
    const {chatId,content} = req.body;

    if(!chatId || !content){
      return res.status(404).json({
        success :false,
        message:"All fields are required",
      })
    }

    const addedMessage = await Message.create({
      sender: req.user.id,
      content:content,
      chat:chatId
    })
    
    if(!addedMessage){
      return res.status(404).json({
        success :false,
        message:"Couldn't add messages",
      })
    }

    // populating the added message with senders details and the users inside it
    const populatedMessage = await Message.findById(addedMessage._id)
      .populate({
        path: "sender",
        select: "userName profileImage",
      })
      
    // Perform a separate query to populate the "users" field of the chat

    const chatWithPopulatedUsers = await Chat.findById(populatedMessage.chat._id).populate({
      path: "users",
      select: "userName profileImage email",
    });
    
    populatedMessage.chat = chatWithPopulatedUsers;
    
    // console.log("newPopulatedMessage:",populatedMessage);
    // Updating the ChatId last message
    await Chat.findByIdAndUpdate(req.body.chatId,{
      latestMessage: populatedMessage,
    })

    if(!populatedMessage){
      return res.status(404).json({
        success :false,
        message:"Unable to populate the added messages",
      })
    }

    return res.status(200).json({
      success:true,
      message:"Message Added Successfully",
      data:populatedMessage
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to add message",
      error:error.message,
    })
  }
}

exports.getAllMessages = async(req,res) => {
  try {
    const {chatId} = req.body;

    if(!chatId){
      return res.status(404).json({
        success:false,
        message:"All fields are required"
      })
    }

    const messages = await Message.find({
      chat:chatId
      }).populate("sender","userName profileImage email")
      .populate("chat");

    
    if(!messages){
      return res.status(404).json({
        success:false,
        message:"Couldn't fetch messages"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Fetched all messages successfully",
      data:messages

    })
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:"Unable to fetch all messages."
    })
  }
}