
import './App.css';
import Header from "./component/layout/Header/Header";
// import { BrowserRouter as Router,Route } from 'react-router-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import webfont from "webfontloader";
import React, { useState } from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
// import store from "C:\Users\yasho\Desktop\MERN STACK ECOMMERCE\frontend\src\Store.js";
// import Loader from './component/layout/Loader/Loader';
import store from './Store';
import { loaduser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import BeforeLoginOptions from './component/layout/Header/BeforeLoginOptions';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
// import { useState } from 'react';
import axios from 'axios';
// import Payment from './component/Cart/Payment';
//  import ProtectedRoute from './component/Route/ProtectedRoute';
import { Elements } from '@stripe/react-stripe-js'; // for use of Credit card details wala section
import { loadStripe } from '@stripe/stripe-js';
import PaymentTP from './component/Cart/PaymentTP';
import OrderSuccess from './component/Cart/OrderSuccess';



function App() {

  const {isAuthenticated,user}=useSelector((state)=> state.user);

 

  



  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })

    store.dispatch(loaduser());

    
    },[])
  return (
    <BrowserRouter>
     <Header/>
     {isAuthenticated ?<UserOptions user={user}/>:
     <BeforeLoginOptions/>}
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/products/getsingleproduct/:id" element={<ProductDetails />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/:keyword" element={<Products />} />
    <Route path="/search" element={<Search />} />
    <Route path="/account" element={<Profile />} />
    <Route path="/password/updateprofile" element={<UpdateProfile/>} />
    <Route path="/password/updatepassword" element={<UpdatePassword/>} />
    <Route path="/password/forgot" element={<ForgotPassword/>} />
    <Route path="/password/reset/:token" element={<ResetPassword/>} />
    <Route path="/login" element={<LoginSignUp />} />
    <Route path="/Cart" element={<Cart />} />
    <Route path="/shipping" element={<Shipping/>} />
    <Route path="/order/confirm" element={<ConfirmOrder/>} />

    {/* { stripeApiKey &&  <Elements stripe={loadStripe(stripeApiKey)}>
    <Route path="/process/payment" element={<Payment/>} />
    </Elements>
    } */}

    <Route path="/process/payment" element={<PaymentTP/>} />
    <Route path="/success" element={<OrderSuccess/>} />

    

    </Routes>
    
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
