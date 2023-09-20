const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhandler");
const User = require("../models/UserModel");
const sendToken = require("../utils/JwtToken");
const SendEmail = require("../utils/SendEmail");

const crypto = require("crypto");
const cloudinary = require("cloudinary");
// const { use } = require("../app");

//Register a User...
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
  //   folder:"avatars",
  //   width: 150,
  //   crop: "scale",

  // })
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "Sample id",
      url: "Sample_url",
    },
  });

  const token = await user.getJWTTOKEN();

  // res.status(201).json({
  //     success:true,
  //     token,
  // })

  // Short code for upper hash code....
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body.email);
  // console.log("hi");
  // checking if user has given password and email both

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid email or password", 401));
  }

  console.log("way to sendtoken");

  sendToken(user, 200, res);
});

// LogOut User...
exports.logOutUser = catchAsyncErrors((req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User LOGGED OUT",
  });
});

// Forgot Password..

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User Not Found", 404));
  }

  //Get ResetPassowrdToken
  //   const resetToken = user.getResetPasswordToken();

  //   await user.save({ validateBeforeSave: false });

  //   const resetPasswordUrl = `${req.protocol}://${req.get(
  //     "host"
  //   )}/password/reset/${resetToken}`;

  //   const messaage = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requesteed this email then plz Ignore it`;

  //   try {
  //     await SendEmail({
  //       email: user.email,
  //       subject: "Ecommerce Password recovery",
  //       messaage,
  //     });
  //     res.status(200).json({
  //       success: true,
  //       message: `Email sent to ${user.email} successfully`,
  //     });
  //   } catch (error) {
  //     user.resetPasswordToken = undefined;
  //     user.resetPasswordExpire = undefined;

  //     await user.save({ validateBeforeSave: false });
  //     return next(new Errorhandler(error.messaage, 500));
  //   }
  // });

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/passwrod/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await SendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));
  }
});

//Reset Passowrd

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //calling token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next("reset password token i invalid or has been expired", 400);
  }

  if (req.body.password !== req.body.confirmpassword) {
    return next(new Errorhandler("passwords does not match", 404));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

//User Details...

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    next(new Errorhandler(""));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldpassword);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Old password is incorrect", 400));
  }

  if (req.body.newpassword !== req.body.confirmpassword) {
    return next(new Errorhandler("password does not match", 400));
  }

  user.password = req.body.newpassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile...
exports.UpdateProfile = catchAsyncErrors(async (req, res, next) => {
  const newuserdata = {
    name: req.body.name,
    email: req.body.email,
  };

  // we will use cloiudinary .... for avatar updater
  // Here It is...

  // if(req.body.avatar !=="")
  // {
  //   const user =await User.findById(req.user.id);
  //   const imageId= user.avatar.public_id;
  //   await cloudinary.v2.uploader.destroy(imageId);

  //   const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
  //     folder: "avatars",
  //     width:150,
  //     crop: "scale",
  //   });

  //   newuserdata.avatar={
  //     public_id: mycloud.public_id,
  //     url: mycloud.secure_url,
  //   }
  // }

  const user = await User.findByIdAndUpdate(req.user.id, newuserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get All Users(Admin)
exports.getallusers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get Single User...Admin
exports.getsingleuser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new Errorhandler("User with this id not exist", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role...Admin
exports.UpdateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newuserdata = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // we will use cloiudinary .... for avatar updater

  const user = await User.findByIdAndUpdate(req.params.id, newuserdata, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User ... Admin
exports.DeleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(`User Not Exist with id ${req.params.id}`),
      404
    );
  }

  // const imageId = user.avatar.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  const deluser = await User.findByIdAndRemove(req.params.id);
  // await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    deluser,
  });
});
