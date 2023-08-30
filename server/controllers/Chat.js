const fileUpload = require("../utils/fileUploader");
const Chat = require("../models/Chat");

// Chats related API's
exports.accessChat = async(req,res) => {
  const {userId} = req.body;

  if(!userId){
    return res.status(404).json({
      success:false,
      message:"All fields are required"
    });
  }

  const chat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
    deleteChatUsers: { $nin: [userId] }, // Check if userId is not in deleteChatUsers array
  })
  .populate("users","-password")
  .populate({
    path: "latestMessage",
    populate: {
      path: "sender",
      select: "userName email image",
    },
  });

  if(chat.length > 0){
    return res.status(200).json({
      success:true,
      message:"Successfully fetched the chat",
      data:chat[0]
    })
  }else{
    var newChatData = {
      chatName:"sender",
      isGroupChat:false,
      users:[req.user.id,userId],
    };
  }

  try {
    const createdChat = await Chat.create(newChatData);

    const newChat = await Chat.findOne({
      _id:createdChat._id
    }).populate("users","-password");

    return res.status(200).json({
      success:true,
      message:"Chat Created Successfully",
      data:newChat
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to create Chat",
      error:error.message
    })
  }
}

exports.fetchUserAllChats = async(req,res) => {
  try {
    const userChat = await Chat.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("groupImage")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "userName email image",
      },
    })
    .sort({ updatedAt: -1 });
    
    if(!userChat){
      return res.status(404).json({
        success:false,
        message:"Unable to find user's chats"
      })
    }
    // console.log("userChat",userChat)
    const filteredUserChat = userChat.filter(chat => {
      // Check if chat.latestMessage exists and is not null or undefined
      if (chat.latestMessage) {
        if (chat.isGroupChat) {
          return !chat.deleteChatUsers.some(id => id.toString() === req.user.id.toString());
        } else {
          // Check if there is any ID in deleteChatUsers array other than req.user.id
          return !chat.deleteChatUsers.some(id => id.toString() !== req.user.id.toString());
        }
      }
      return false; // Exclude chats without latestMessage
    });
    
    return res.status(200).json({
      success:true,
      message:"Fetched all user chats",
      data:filteredUserChat
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to fetch all user chats",
      error:error.message
    })
  }
}

exports.deleteChat = async(req,res) => {
  try {
    const {userId,isGroupChat} = req.body;

    if(!userId){
      return res.status(404).json({
        success:false,
        message:"All fields are required"
      })
    }

    var chat;
    if(!isGroupChat){
      chat = await Chat.findOneAndUpdate({
        isGroupChat:isGroupChat,
        $and:[
          {users:{$elemMatch: {$eq: req.user.id}}},
          {users:{$elemMatch: {$eq: userId}}},
        ],
      },
      {
        $push: { deleteChatUsers: userId },
      },
      { new: true })
    }else{
      chat = await Chat.findOneAndUpdate({
        isGroupChat:isGroupChat,
        $and:[
          {users:{$elemMatch: {$eq: req.user.id}}},
          {users:{$elemMatch: {$eq: userId}}},
        ],
      },
      {
        $push: { deleteChatUsers: req.user.id },
      },
      { new: true })
    }
    

    return res.status(200).json({
      success:true,
      message:"Successfully deleted chat",
      data:chat
    })
  } catch (error) {
    return res.status(500).json({
      success:true,
      message:"Unable to delete chat",
      error:error.message
    })
  }
}

// Group related API's
exports.createGroupChat = async(req,res) => {
  try {
    const {users,name} = req.body;
    
    if(!users || !name){
      return res.status(404).json({
        success:false,
        message:"All fields are mandatory"
      })
    }

    var usersArray = JSON.parse(users);

    if(usersArray.length < 2){
      return res.status(404).json({
        success:false,
        message:"More than 2 users are required to form a group chat"
      })
    }

    const existedGroup = await Chat.findOne({
      chatName:name,
      users: {
        $all: usersArray // Replace with the array of user IDs you want to match
      }
    })

    if (existedGroup) {
      return res.status(400).json({
        success: false,
        message: "Group with same name and users already exists",
      });
    }

    // pushing logged in user into array
    usersArray.push(req.user.id);

    const groupChat = await Chat.create({
      chatName: name,
      users: usersArray,
      isGroupChat: true,
      groupAdmin: req.user.id
   });

    const fullGroupChat = await Chat.findOne({_id:groupChat._id})
      .populate("users","-password")
      .populate("groupAdmin","-password");
   
    return res.status(200).json({
      success:true,
      message:"Group chat created successfully",
      data:fullGroupChat
    });

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to create group chat",
      error:error.message
    });
  }
}

exports.renameGroup = async(req,res) => {
  try {
    const {chatId, name} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chatId,{
      chatName:name,
    },{new:true}).populate("users","-password").populate("groupAdmin","-password");

    if(!updatedChat){
      return res.status(404).json({
        success:false,
        message:"Chat Not Found"
      })
    }

    return res.status(200).json({
      success:true,
      message:"Group name renamed successully",
      data:updatedChat
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to rename",
      error:error.message
    })

  }
}

exports.addTogroup = async(req,res) => {
  try {
    const {chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(chatId,{
      $push:{users:userId}
      },
      {new: true})
      .populate("users","-password")
      .populate("groupAdmin","-password");

    if(!added){
      return res.status(404).json({
        success:false,
        message:"Chat Not Found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"User added to chat",
      data:added
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to add user to the chat",
      data:added
    })
  }
}

exports.removeFromGroup = async(req,res) => {
  try {
    const {chatId, userId} = req.body;

    const added = await Chat.findByIdAndUpdate(chatId,{
      $pull:{users:userId}
      },
      {new: true})
      .populate("users","-password")
      .populate("groupAdmin","-password");

    if(!added){
      return res.status(404).json({
        success:false,
        message:"Chat Not Found"
      })
    }
    return res.status(200).json({
      success:true,
      message:"User added to chat",
      data:added
    })

  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Unable to add user to the chat",
      data:added
    })
  }
}

exports.updateGroupProfile = async(req,res) => {
  try {
    const {chatId} = req.body;
    const displayPicture = req.files.profileImage;

    if(!chatId){
      return res.status(404).json({
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

    const chat = await Chat.findByIdAndUpdate(chatId,{
      groupImage:image.secure_url
    },{new:true}).populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("groupImage")
    .populate({
      path: "latestMessage",
      populate: {
        path: "sender",
        select: "userName email image",
      },
    });

    if(!chat){
      return res.status(500).send({
        success: false,
        message: `Could Not update group Image.`
      })
    } 

    return res.status(200).json({
      success:true,
      message:"groupImage has sucessfully updated",
      data:chat
    })
  } catch (error) {
    return res.status(500).json({
			success: false,
			message: "Unable to update groupImage. Please try again.",
      error:error.message,
		});
  }
}