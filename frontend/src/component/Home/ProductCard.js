import React from 'react'
import {Link} from "react-router-dom";
import Reactstars from "react-rating-stars-component";
// import { Rating } from '@material-ui/lab';



const ProductCard = ({product}) => {

  const options={
    edit:false,
    color: "rgba(20,20,20,0.1)",
    // color:"#FCC200",
    activeColor: "#FCC200",
    size: window.innerWidth<600 ?  20:35,
    value: product.ratings,
    isHalf: true,
}

// const options={
//   // size: "large",
//   value: product.ratings,
//   readOnly: true,
//   precision: 0.5
// }
  return (
      
      <Link className="productCard"  to={`/products/getsingleproduct/${product._id}`}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
         <Reactstars {...options} /> <span >({product.numOfreviews} reveiws)</span>
        </div>
        <span>{`Rs. ${product.price}`}</span>
      </Link>
  
  );
};

export default ProductCard;
