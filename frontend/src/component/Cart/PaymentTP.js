import {React,useEffect, useState} from 'react'
import { Elements } from '@stripe/react-stripe-js'; // for use of Credit card details wala section
import { loadStripe } from '@stripe/stripe-js';
import Payment from './Payment';
import axios from 'axios';




const PaymentTP = () => {

    const [stripeApiKey,setStripeKey]=useState("");

async function getStripeApikey(){
  const {data}=await axios.get("/api/v1/stripeapikey");

  setStripeKey(data.stripeApiKey);
}

    useEffect(()=>{
        getStripeApikey();
     },[])

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment/>
    </Elements>
  )
}

export default PaymentTP
