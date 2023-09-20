import React, { useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Typography } from "@material-ui/core";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Payment.css";
import axios from "axios";
import { useState } from "react";

// import { Elements } from '@stripe/react-stripe-js'; // for use of Credit card details wala section
// import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderAction";


const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const x=JSON.stringify(orderInfo);
  console.log(`orderInfo:${x}`)

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const payBtn = useRef(null);


const {shippingInfo,cartItems}=useSelector((state)=> state.cartReducer)
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData={
    amount: Math.round(orderInfo.totalPrice*100),

  }

  const order={
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // payBtn.current.disabled = true;

    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // };

      // const data = await axios.post(
      //   "/api/v1/payment/process",
      //   paymentData,
      //   config
      // );

      // const client_secret = data.client_secret;

    //   if (!stripe || !elements) {
    //     return;
    //   }

    //   const result = await stripe.confirmCardPayment(client_secret, {
    //     payment_method: {
    //       card: elements.getElement(CardNumberElement),
    //       billing_details: {
    //         name: user.name,
    //         email: user.email,
    //         address: {
    //           line1: shippingInfo.address,
    //           city: shippingInfo.city,
    //           state: shippingInfo.state,
    //           postal_code: shippingInfo.pinCode,
    //           country: shippingInfo.country,
    //         },
    //       },
    //     },
    //   });

    //   if (result.error) {
    //     payBtn.current.disabled = false;
    //     alert.error(result.error.message);
    //   } else {
        // if (result.paymentIntent.status === "succeeded") {
        //   navigate("/success");
        order.PaymentInfo={
          id: "1",
          status:"success",
      }
      console.log(`order: ${order}`)
      dispatch(createOrder(order));
      
        navigate("/success")
        // }
        // else{
        //     alert.error("There's some while processing payment");
        // }
    //   }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect((error)=>{

    if(error)
    {
      alert.error(error);
      dispatch(clearErrors());
    }
  },[dispatch,error,alert ])
  return (
    <>
      <CheckoutSteps activeSteps={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          {/* <Elements stripe={loadStripe()}> */}
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          {/* </Elements> */}

          <input
            type="submit"
            value={`Pay -  Rs.${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
