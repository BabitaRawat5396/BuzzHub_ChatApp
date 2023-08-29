
// Instantiating express app
const express = require("express");
const app = express();

const socket = require("socket.io");

// Routes
const userRoutes = require("./routes/Auth");
const searchRoutes = require("./routes/search");
const profileRoutes = require("./routes/Profile");
const messageRoutes = require("./routes/Message");
const chatRoutes = require("./routes/Chat");


// Necessary Connections 
const cloudinary = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");


// loading global variables in process
dotenv.config();

const PORT = process.env.PORT || 4000;

// Database connect
database.connect(); 

// Cloudinary connect
cloudinary.cloudinaryConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());

// using cors middleware for cross origin resource sharing between server port and frontend port
app.use( cors({
		origin:"https://buzzhub-frontend.vercel.app",
		credentials:true,
	})
);

// middleware for uploading using temp file
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
);

// Routes
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/message",messageRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1",searchRoutes);


//default route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


// Activating the server
const server = app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

// Socket Connection
const io = socket(server,{
	pingTimeout: 60000, //It will wait for 60s after that it will close connectuon to save the bandwidth
	cors:{
		origin:"https://buzzhub-backend.onrender.com",
		credentials:true,
	},
});

io.on("connection",(socket) => {

	// console.log("Connected to socket.io");
	// When user joins our application below code will run
	socket.on("setup", (userData) => {	
    if (userData) {
        socket.join(userData._id);
        socket.emit("connected");
    } else {
        console.log("Invalid userData received:", userData);
    }
});



	// When User will select a chat and joins the room
	socket.on("join chat",(room) => {	
		socket.join(room);
		// console.log("User Joined Room",room);
	});

	socket.on("typing", (room) => socket.to(room).emit("typing"));
	socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));


	socket.on("new message",(newMessageRecieved) => {
		var chat = newMessageRecieved.chat;
		
		if(!chat.users) return console.log("chat.users not defined");

		chat.users.forEach((user) => {
			
			if(user._id === newMessageRecieved.sender._id) return;
			
			socket.in(user._id).emit("message recieved",newMessageRecieved);
		});
	});

	socket.off("setup",(userData) => {
		console.log("USER DISCONNECTED");
		socket.leave(userData._id)
	})

});