import React, { useEffect } from 'react'
import {DataGrid} from '@material-ui/data-grid';
import "./MyOrders.css"
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { Link, NavLink } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, myOrders } from '../../actions/orderAction';
import LaunchIcon from '@material-ui/icons/Launch';
import { useNavigate } from 'react-router-dom';
import { Cursor } from 'mongoose';

const MyOrders = () => {

    const dispatch=useDispatch();
    const alert= useAlert();
    const navigate=useNavigate();

    const{loading,error, orders}= useSelector((state)=> state.myOrders);
    const {user}=useSelector((state)=>state.user);
    console.log(`user:-${user}`);

   
    const columns=[{field: "id",headerName: "Order ID", minWidth: 250, flex: 0.7},
    {
        field:"status",
        headerName: "Status",
        minWidth: 150,
        flex: 0.5,
        cellClassName : (params)=>{
           return params.getValue(params.id, "status")==="Delivered"? "greenColor" : "redColor"; 
        }
    },{
        field: "itemsQty",
        headerName: "Items Qty",
        type: "number",
        minWidth: 150,
        flex:0.3,
    },
    {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth:270,
        flex:0.5
    },
    {
        field:"actions",
        flex:0.3,
        headerName:"Actions",
        type:"number",
        sortable: false,
        renderCell: (params) => {
            return (
            //   <NavLink to={`/order/${params.getValue(params.id, "id")}`}>
            //     <LaunchIcon />
            //   </NavLink>

            // style="Cursor: pointer"
            <p  onClick={()=>{
                navigate(`/orders/getsingleorder/${params.getValue(params.id, "id")}`);
            }}><LaunchIcon /></p>
            );
          },
    }

];
    const rows=[];

    orders && 
    orders.forEach((item,index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    });
    useEffect(()=>{
        if(error){
          alert.error(error);
          dispatch(clearErrors());
        }

        dispatch(myOrders());
    },[dispatch,alert,error]);
  return (
    <>
    <MetaData title={`${user.name}- Orders`}></MetaData>
    {
        loading ? (
            <Loader/>
        ): (
            <div className='myOrdersPage'>
             <DataGrid
             rows={rows}
             columns={columns}
             pageSize={10}
             disableSelectionOnClick
             className='myOrdersTable'
             autoHeight
             ></DataGrid>

             <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
            </div>
        )
    }
    </>
  )
}

export default MyOrders
