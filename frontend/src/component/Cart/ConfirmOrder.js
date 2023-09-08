import { State } from 'country-state-city'
import React from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { Link, Typography } from '@material-ui/core'
import "./ConfirmOrder.css"
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {
    const {shippingInfo,cartItems}=useSelector((state)=> state.cartReducer)
    const {user}= useSelector((state)=>state.user);
    const navigate=useNavigate();

    const subTotal= cartItems.reduce(
      (acc,item)=>acc+ item.quantity * item.price,
      0
    );

    const shippingCharges= subTotal > 1000 ? 0: 200;

    const tax= subTotal*0.18;

    const totalPrice=subTotal+tax;

    const address=`${shippingInfo.address},${shippingInfo.city},${shippingInfo.pinCode},${shippingInfo.country}`


    const proceedToPayment=()=>{
      const data={
      subTotal,
      shippingCharges,
      tax,
      totalPrice
      };


      sessionStorage.setItem("orderInfo",JSON.stringify(data));

      navigate("/process/payment");

      
    };


  return (
    <>
    <MetaData title="Confirm Order"></MetaData>
    <CheckoutSteps activeSteps={1}></CheckoutSteps>
    <div className="confirmOrderPage">
      <div>
        <div className="confirmShippingArea">
          <Typography>Shipping Info</Typography>
          <div className="confirmshippingAreaBox">
            <div>
              <p>Name:</p>
              <span>{user.name}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{user.phoneNo}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>{address}</span>
            </div>


          </div>
        </div>
        <div className="confirmCartItems">
          <Typography>Your Cart Items:</Typography>
          <div className="confirmCartItemsContainer">
            {
              cartItems &&
               cartItems.map((item)=>(
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/products/getsingleproduct/${item.product}`}>
                    {item.name}
                  </Link>
                  <span>
                    {item.quantity} X Rs.{item.price} = 
                    <b> Rs.{item.price*item.quantity}</b>
                  </span>

                </div>
               ))
            }
          </div>
        </div>

      </div>
      {/*  */}
      <div>
        <div className="orderSummary">
          <Typography>Order Summary</Typography>
          <div>
            <div>
              <p>Subtotal:</p>
              <span>Rs.{subTotal}</span>
            </div>
            <div>
              <p>Shipping Charges:</p>
              <span>Rs.{shippingCharges}</span>
            </div>
            <div>
              <p>GST:</p>
              <span>Rs.{tax}</span>
            </div>
          </div>

          <div className="orderSummaryTotal">
            <p>
              <b>Total:</b>
            </p>
            <span>Rs.{totalPrice}</span>
          </div>
          <button onClick={proceedToPayment}>Proceed To Payment</button>
        </div>

      </div>
    </div>
    </>
  )
}

export default ConfirmOrder
