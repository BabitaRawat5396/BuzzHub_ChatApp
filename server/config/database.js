const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then( () => {
        console.log("Database Connection Successful");
    })
    .catch( (error) => {
        console.log(`${error} ERROR has occured while connecting Database.`);
        process.exit(1);
    })
}

