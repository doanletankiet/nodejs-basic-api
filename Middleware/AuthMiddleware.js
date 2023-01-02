const jwt = require("jsonwebtoken");
const userModel = require('../Models/UserModel')

const isAuthentication = (req, res, next) => {
  try {
    //verifi token
    const bearerHeader = req.headers["authorization"];
    const accessToken = bearerHeader.split(" ")[1];
    //verify access token
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);

    //set userId to req object (de biet ai login, them )
    req.userId = decodeJwt._id;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("Token expired");
    }
    return res.status(401).send("Authentication not valid");
  }

  next();
};


const isAdmin = async (req,res,next)=>{
    try {
        const userId= req.userId;
        const user = await userModel.findById(userId);
        //role is admin
        if(user.role === 'admin'){
            next();
        }
        
    } catch (error) {
    return res.status(401).send("Authentication not valid");
        
    }
}

module.exports = {
  isAuthentication: isAuthentication,
  isAdmin:isAdmin
};
