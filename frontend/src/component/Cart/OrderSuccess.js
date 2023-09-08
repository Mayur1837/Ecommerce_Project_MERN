import React from 'react'
import "./OrderSuccess.css";
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderSuccess = () => {
  return (
    <div className='orderSuccess'>
    <CheckCircleIcon/>
    <Typography>Your Order has been Placed successfully</Typography>
    <Link to="/orders/myorders">View Orders</Link>

    </div>
  )
}

export default OrderSuccess
