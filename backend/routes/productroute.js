const express=require("express");

const {getAllProducts,createProduct, updateProduct, deleteProduct, getSProduct, creatproductreview, getReviews, deletreview}=require("../controllers/productcontroller");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/Auth");
const router=express.Router();

// router.route("/products").get(getAllProducts);
// router.route("/products/newproduct").post(createProduct);
router.get("/products",getAllProducts);
router.put("/products/updateproduct/:id",isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.post("/products/newproduct",isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.delete("/products/deleteproduct/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);
router.get("/products/getsingleproduct/:id",getSProduct);
router.put("/createreview",isAuthenticatedUser,creatproductreview);
router.get("/getallreviews",getReviews);
router.delete("/deletereview",isAuthenticatedUser,deletreview)


module.exports=router;