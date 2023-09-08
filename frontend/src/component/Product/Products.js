import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";


const categories=[
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones"
]


const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000000]);
  const [category,setCategory]=useState("");
  const [ratings,setRatings]=useState(0);

  const alert=useAlert();
 
  const { loading, error, products, productcount, resultperpage } = useSelector(
    (state) => state.products
  );

  const priceHandler = (event, newPrice) => {
    event.preventDefault()       
    setPrice(newPrice);
  };
  //   const keyword= match.param.keyword;
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if(error)
    {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct(keyword, currentPage,price,category,ratings));
  }, [dispatch, keyword, currentPage,price,category,ratings,alert,error]);

  // let count=filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
        <MetaData title="PRODUCTS -- ECOMMERCE"/>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto" // if you do this on rather than auto then you will see prices in range line all time...
              aria-labelledby="range-slider"
              min={0}
              max={1000000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              
                {
                  categories.map((category)=>(
                    <li
                    className="category-link"
                    keys={category}
                    onClick={()=>{setCategory(category)}}
                    
                    >
                      {category}
                    </li>
                  ))
                }
            </ul>

            <fieldset>
              
              <legend><Typography>Rating</Typography></legend>
              <Slider
              value={ratings}
              onChange={(e,newRating)=>{
                setRatings(newRating);
              }}
              min={0}
              max={5}
              valueLabelDisplay="auto"
              ></Slider>
            </fieldset>
          </div>

          {resultperpage < productcount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultperpage}
                totalItemsCount={productcount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
