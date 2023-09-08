const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

Userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    valdate: [validator.isEmail, "Please Enter a Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be of atleast 8 characters"],
    select: false, /// means if use find function and it will show all its date except password becauz of this statement..
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
     type: Date,
     default: Date.now()
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWTTOKEN...
Userschema.methods.getJWTTOKEN = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPPIRE,
  });
};

// Userschema.methods.comparepassword= async function(enterpassword){
//     // console.log(await bcrypt.compare(enterpassword,this.password))
//     return await bcrypt.compare(enterpassword,this.password);
// };

// Compare Password

Userschema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
// getResetPasswordToken
Userschema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model("User", Userschema);
