const Order = require("../models/orderModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productmodel");
const Errorhandler = require("../utils/errorhandler");
const error = require("../middleware/error");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      PaymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await Order.create({
      shippingInfo,
      orderItems,
      PaymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAT: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
});

//Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new Errorhandler("Order with this Id Not Found", 404));
  }

  res.status(201).json({
    success: true,
    order,
  });
});

//Get Logged in User orders...
exports.myorders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  // console.log(req.user.id);

  res.status(201).json({
    success: true,
    orders,
  });
});

//Get All orders----Admin

exports.getAllorders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  // console.log(req.user.id);
  let totalAmount = 0;

  orders.forEach((ord) => {
    totalAmount += ord.totalPrice;
  });

  res.status(201).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status.....----Admin

exports.updateStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new Errorhandler("Order with this id not found"));
  }

  if (order.status == "Delivered") {
    return next(new Errorhandler("You have already delivered this order", 404));
  }

  if (req.body.status === "shipped")
    order.orderItems.forEach(async (ord) => {
      await updateStock(ord.product, ord.quantity);
    });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBefore: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBefore: false });
}
//Delete Order ---Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new Errorhandler("Order with this id not found"));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
    message: "Order Deleted successfully",
  });
});
