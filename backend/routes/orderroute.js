const express=require("express");
const { newOrder, getSingleOrder, myorders, getAllorders, updateStatus, deleteOrder } = require("../controllers/ordercontroller");
const router=express.Router();
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/Auth");



router.post("/orders/createorder",isAuthenticatedUser,newOrder);
router.get("/orders/getsingleorder/:id",isAuthenticatedUser,getSingleOrder);
router.get("/orders/myorders",isAuthenticatedUser,myorders)
router.get("/admin/getallorders",isAuthenticatedUser,authorizeRoles("admin"),getAllorders);
router.put("/admin/updateorderstatus/:id",isAuthenticatedUser,authorizeRoles("admin"),updateStatus);
router.delete("/admin/deletorder/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports=router;
