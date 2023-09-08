// This file is for to find is user is login or not ..by ....using cookies ...

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhandler");
const User=require("../models/UserModel");
const jwt=require("jsonwebtoken");

exports.isAuthenticatedUser=catchAsyncErrors(async (req,res,next)=>{
    const { token }=req.cookies;

    if(!token)
    {
        return next(new Errorhandler("PLease Login to access this resource",401));
    }

    const decodeddata=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(decodeddata.id);

    next();
})

exports.authorizeRoles=(...roles)=>{

    return((req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new Errorhandler(`Role:${req.user.role} not allowed to access this resource..`,403));
        }

       return next();
    });
}
// exports.authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//       if (!roles.includes(req.user.role)) {
//         return next(
//           new Errorhandler(
//             `Role: ${req.user.role} is not allowed to access this resource `,
//             403
//           )
//         );
//       }
  
//       next();
//     };
//   };