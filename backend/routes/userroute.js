const express=require("express");
const { registerUser, loginUser,logOutUser, forgotPassword, resetPassword, getUserDetails, updatePassword, UpdateProfile, getallusers, getsingleuser, UpdateUserRole, DeleteUser } = require("../controllers/usercontroller");
const {isAuthenticatedUser,authorizeRoles}=require("../middleware/Auth")

const router=express.Router();


router.post("/register",registerUser);
router.post("/loginuser",loginUser);
router.post("/password/forgot",forgotPassword);
router.put("/password/reset/:token",resetPassword);
router.get("/getuserdetails",isAuthenticatedUser,getUserDetails);
router.put("/password/updatepassword",isAuthenticatedUser,updatePassword);
router.put("/password/updateprofile",isAuthenticatedUser,UpdateProfile);
router.get("/admin/getAllusers",isAuthenticatedUser,authorizeRoles("admin"),getallusers);
router.get("/admin/getsingleuser/:id",isAuthenticatedUser,authorizeRoles("admin"),getsingleuser);
router.put("/admin/updaterole/:id",isAuthenticatedUser,authorizeRoles("admin"),UpdateUserRole);
router.delete("/admin/deleteuser/:id",isAuthenticatedUser,authorizeRoles("admin"),DeleteUser);
router.get("/logout",logOutUser);


module.exports=router;