// const { assign } = require("nodemailer/lib/shared");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productmodel");
const ApiFeatures = require("../utils/apifeatures");
const Errorhandler = require("../utils/errorhandler");

//Create a Product...--ADMIN

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  let product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Update a Product ....--Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    // res.status(500).jsnon({
    //   success: false,
    //   messaage: "Product Not Found",
    // });
    return next(new Errorhandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete a product -----Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    // res.status(500).json({
    //   success: false,
    //   messaage: "Product Not Found",
    // });
    return next(new Errorhandler("Product Not Found", 404));
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    messaage: "Product has been Successfully deleted",
    product,
  });
});

//Get Single Product details....

exports.getSProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    // res.status(500).json({
    //   success: false,
    //   messaage: "Product Not Found",
    // });

    return next(new Errorhandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Get all products....

exports.getAllProducts = catchAsyncErrors(async (req, res,next) => {

  // return next(new Errorhandler("This is temp error",500));

  try {
    const resultperpage = 8; //Products to show on one page..
    const productcount = await Product.countDocuments();
    const apifeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultperpage);
      // let products= await apifeature.query
      // let filteredProductsCount =products.length;
      // apifeature.pagination(resultperpage);
  
      // products=await apifeature.query;
    const products = await apifeature.query;
    // const products = await Product.find({});
    res.status(200).json({
      success: true,
      productcount,
      products,
      resultperpage,
      // filteredProductsCount,
    });
  } catch (error) {
    res.status(404).json({
      messgae: error.messaage,
    })
  }
 
 
});

//Create and update Productreview...

exports.creatproductreview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = await product.reviews.find(
    (rev) => rev.use === req.user._id
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user === req.user._id)
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfreviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
   reviews: product.reviews

  });
});

// Get All Reviews....

exports.getReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }

  const reviews = product.reviews;

  res.status(200).json({
    // success: true,
    reviews
  });
});

// Delete a Review.....
exports.deletreview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }

  const reviews = await product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.reviewId.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });


  let ratings=0;
  if(reviews.length===0)
  {
    ratings=0;
  }
  else
   ratings = avg / reviews.length;

  const numOfreviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfreviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({
   reviews
  });
});
