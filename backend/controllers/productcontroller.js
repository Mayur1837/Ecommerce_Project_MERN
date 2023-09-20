// const { assign } = require("nodemailer/lib/shared");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productmodel");
const ApiFeatures = require("../utils/apifeatures");
const Errorhandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");

//Create a Product...--ADMIN

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // const imagesLink = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.uploader.upload(images[i]);
  //   imagesLink.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  // req.body.images = imagesLink;
  req.body.user = req.user.id;

  req.body.images = [
    {
      public_id: "sample_image1",
      url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRlcY9PJ6X7B48WQf6sVUYERJgpOFZ8-ERy94em7NuQNk_rVDo6LY5lHpz9c8La7kZuPYno5rUHmj6ZYeAnGXUA9xc6kLe9dd2fQCUOjPc6&usqp=CAE",
      _id: "64d630577532958d9c543017",
    },
    {
      public_id: "sample_image2",
      url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRlcY9PJ6X7B48WQf6sVUYERJgpOFZ8-ERy94em7NuQNk_rVDo6LY5lHpz9c8La7kZuPYno5rUHmj6ZYeAnGXUA9xc6kLe9dd2fQCUOjPc6&usqp=CAE",
      _id: "64d630577532958d9c543018",
    },
  ];

  // req.body.user = req.user.id;

  let product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Update a Product ....--Admins

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    // res.status(500).jsnon({
    //   success: false,
    //   messaage: "Product Not Found",
    // });
    return next(new Errorhandler("Product Not Found", 404));
  }

  //Images Satrt here

  // let images = [];

  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }

  // if (images !== undefined) {
  //   //Deleting images from cloudinary

  //   for (let i = 0; i < product.images.length; i++) {
  //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  //   }
  // }

  // const imagesLink = [];

  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.uploader.upload(images[i]);
  //   imagesLink.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  // req.body.images = imagesLink;

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

  //Deleting images from cloudinary

  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }

  //Still remain to write a code about cloudinary images...

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

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
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
      messaage: error.messaage,
    });
  }
});

// Get All admin products...
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({
      messaage: error.messaage,
    });
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
    reviews: product.reviews,
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
    reviews,
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

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else ratings = avg / reviews.length;

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
    success: true,
    // reviews,
  });
});
