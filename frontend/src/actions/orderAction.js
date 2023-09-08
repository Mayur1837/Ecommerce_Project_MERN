import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../constants/orderConstants";


export const createOrder=(order)=> async (dispatch,getState)=>{
    
    try {
        dispatch({type: CREATE_ORDER_REQUEST});
        const config={
            headers:{
                "Content-Type":"application/json"
            },
        };
        console.log("hELLO")
        const {data}= await axios.post("api/v1/orders/createorder",order,config);
        console.log("jner");
        console.log(data);
        

        dispatch({type: CREATE_ORDER_SUCCESS, payload:data});
        
    } catch (error) {
        // console.log("error is there")
        console.log(error.message);
        dispatch({
            type: CREATE_ORDER_FAIL,
            // payload: error.reponse.data.message
        })
    }
};

//Clearing Errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS});
}