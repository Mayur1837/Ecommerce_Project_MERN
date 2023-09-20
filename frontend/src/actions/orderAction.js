import axios from "axios";
import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../constants/orderConstants";

// Create Order
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // dispatch({type: CREATE_ORDER_REQUEST});
    // const config={
    //     headers:{
    //         "Content-Type":"application/json"
    //     },
    // };

    const x = JSON.stringify(order);
    console.log(`order: ${x}`);
    // console.log("hELLO")
    // const {data}= await axios.post("api/v1/orders/createorder",order,config);
    // console.log("jner");
    // const y=JSON.stringify(data)
    // console.log(`data: ${y}`);

    // dispatch({type: CREATE_ORDER_SUCCESS, payload:data});
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/orders/createorder",
      order,
      config
    );

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    // console.log("error is there")
    console.log(error.message);
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.reponse.data.message,
    });
  }
};

// Get Myorder
export const myOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/api/v1/orders/myorders");

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    // console.log("error is there")
    console.log(error.message);
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.reponse.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/orders/getsingleorder/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    // console.log("error is there")
    console.log(error.message);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.reponse.data.message,
    });
  }
};

// Get ALL Orders:
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/getallorders`);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    // console.log("error is there")
    console.log(error.message);
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.reponse.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/updateorderstatus/${id}`,
      order,
      config
    );

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    // console.log("error is there")
    console.log(error.message);
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.reponse.data.message,
    });
  }
};

//  Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/deletorder/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    // console.log("error is there")
    console.log(error.message);
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.reponse.data.message,
    });
  }
};

//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
