import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Reactstars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";



const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert=useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  


  console.log(product.reviews);
  useEffect(() => {

    if(error)
    {
       alert.error(error);
       dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id,error,alert]);
  console.log("loading");

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const[quantity,setQuantity]=useState(1);


  const increaseQuantity=()=>{

    if(product.stock <= quantity) return;
    const qty=quantity+1;
    setQuantity(qty);
  }

  const decreaseQuantity=()=>{

    if(quantity<=1) return;

    const qty=quantity-1;
    setQuantity(qty);
  }

  const addToCartHandler=()=>{
    // const { id } = useParams();
    dispatch(addItemsToCart(id,quantity));
    alert.success("Item Added to Cart");
  }
  return (

      <>
      {loading ? <Loader/> :
      
      <>
      <MetaData title={`${product.name}--ECOMMERCE`}/>
      <div className="ProductDetails" key={product._id}>
        {/* <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`}
                />
                
              ))}
          </Carousel>
        </div> */}

        <div className="totalblock ">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-ride="carousel"
          >
            {/* <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol> */}
            <div class="carousel-inner">
              {/* <div class="carousel-item active">
      <img class="d-block w-100" src="..." alt="First slide"/>
    </div> */}

              {product.images &&
                product.images.map((item, i) => (
                  <div
                    className={
                      (i = 0 ? "carousel-item active " : "carousel-item")
                    }
                  >
                    <img
                      className="d-block w-100"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  </div>
                ))}
            </div>
            <a
              class="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="totalblock totalinfoblock">
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <Reactstars {...options}></Reactstars>
            <span>({product.numOfreviews} Reviews)</span>
          </div>

          <div className="detailsBlock-3">
            <h1>{`Rs. ${product.price}`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly value={quantity} type="number" />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button className="cartbt" onClick={addToCartHandler}>Add to Cart</button>
            </div>

            <p>
              Status:
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "OutOfStock" : "InStock"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            Description: <p>{product.description}</p>
          </div>

          <button className="submitReview">Submit Review</button>
        </div>
      </div>

      <h3 className="reviewsHeading">REVIEWS</h3>
      {product.reviews && product.reviews[0] ?(
        <div className="reviews">
          {
            product.reviews.map((review)=> <ReviewCard review={review}/>)
          }
        </div>
      ):(
        <p className="noreviews">No Reviews Yet....</p>
      )
      }
                    
    </>
      }
      </>
   
  );
};

export default ProductDetails;
