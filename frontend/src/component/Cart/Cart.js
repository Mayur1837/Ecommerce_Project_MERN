import React from "react";
import CartItemCard from "./CartItemCard";
import "./Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  // const [grosstotal,setGrossTotal]=useState(0);

  // const  {cartItems}  = localStorage.getItem("cartItems");
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  console.log(`cartItems :-${JSON.stringify(cartItems)}`);

  // const cartItems=localStorage.getItem();
  // const cartItems = localStorage.getItem('cartItems') ? localStorage.getItem('cartItems'): [];

  // const item = {
  //   product: "ProdductID",
  //   price: 200,
  //   name: "Yasho",
  //   quantity: 1,
  //   image:
  //     "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRlcY9PJ6X7B48WQf6sVUYERJgpOFZ8-ERy94em7NuQNk_rVDo6LY5lHpz9c8La7kZuPYno5rUHmj6ZYeAnGXUA9xc6kLe9dd2fQCUOjPc6&usqp=CAE",
  // };

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
    // let totalp=0
    // cartItems.map((item)=>{
    //   totalp+=item.price*item.quantity;
    // })

    // setGrossTotal(totalp);
  };
  const decreaseQuantity = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }

    dispatch(addItemsToCart(id, newQty));
    // let totalp=0
    // cartItems.map((item)=>{
    //   totalp+=item.price*item.quantity;
    // })

    // setGrossTotal(totalp);
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const navigate = useNavigate();
  const checkoutHandler = () => {
    // const { token } = document.cookies;
    //  if(token)
    //  {
    //   navigate("/shipping");
    //  }
    //  else{
    //   navigate("/login");
    //  }
    // navigate("/login?redirect=shipping");
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Products</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {/*<div className="cartContainer">
          <CartItemCard item={item} />
          <div className="cartInput">
            <button>-</button>
            <input type="number" value={item.quantity} readOnly />
            <button>+</button>
          </div>


          <p className="cartSubtotal">{`Rs.${item.price * item.quantity}`}</p>
        </div>
        <div className="cartContainer">
          <CartItemCard item={item} />
          <div className="cartInput">
            <button>-</button>
            <input type="number" value={item.quantity} readOnly />
            <button>+</button>
          </div>

          <p className="cartSubtotal">{`Rs.${item.price * item.quantity}`}</p>
        </div> */}

            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div className="cartContainer" key={item.product}>
                    <CartItemCard
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <p className="cartSubtotal">{`Rs.${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                );
              })}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                {/* <p>{`Rs.600`}</p> */}
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
