const jwt = require("jsonwebtoken");

// middleware functions have an extra parameter "next" as compared to controllers
//auth middleware is to verify token that has been added in the req after login for further directions
exports.auth = async(req,res,next) => {
  try {
    //fetch data
    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", ""); //as header automatically adds "Bearer " in the start of token
    
    //if token not found
    if(!token){
      return res.status(401).json({
        success:false,
        message:'Token Missing',
      });
    }
        
    //verify token
    try {
      // It takes the JWT and a secret or public key as input and returns the decoded payload if the token is valid The verify function returns an object representing the decoded payload of the JWT if the token is successfully verified.
      const payload = jwt.verify(token,process.env.JWT_KEY_SECRET);
      req.user = payload;
    } catch (error) {
      return res.status(401).json({
        success:false,
        message:'token is invalid',
      });
    }
    // next is called for next operation
    next();

  } catch (error) {
    return res.status(401).json({
      success:false,
      message:'Something went wrong, while verifying the token',
      error:error.message,
    });
  }
}