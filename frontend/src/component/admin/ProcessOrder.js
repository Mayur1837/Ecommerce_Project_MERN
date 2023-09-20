import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, Typography } from "@material-ui/core";
// import "./ConfirmOrder.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = () => {
  //   const { shippingInfo, cartItems } = useSelector((state) => state.cartReducer);

  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);

  const [status, setStatus] = useState("");

  // console.log(`user:-${JSON.stringify(user)}`)
  const navigate = useNavigate();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    // console.log(`isUpdated:${isUpdated}`);

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <>
      <MetaData title="Process Order" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmShippingArea">
                  <h1>Shipping Info</h1>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.PaymentInfo &&
                        order.PaymentInfo.status === "success"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.PaymentInfo &&
                      order.PaymentInfo.status === "success"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>

                <div className="confirmCartItems">
                  <Typography>Your Cart Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <p
                            onClick={() => {
                              navigate(
                                `/products/getsingleproduct/${item.product}`
                              );
                            }}
                          >
                            {item.name}
                          </p>
                          <span>
                            {item.quantity} X Rs.{item.price} =
                            <b> Rs.{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="shipped">Shipped</option>
                      )}
                      {order.orderStatus === "shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
    // <>
    //   <MetaData title="Confirm Order"></MetaData>

    //   <div className="confirmOrderPage">
    //     <div>
    //       <div className="confirmShippingArea">
    //         <Typography>Shipping Info</Typography>
    //         <div className="confirmshippingAreaBox">
    //           <div>
    //             <p>Name:</p>
    //             <span>{user.name}</span>
    //           </div>
    //           <div>
    //             <p>Phone:</p>
    //             <span>{user.phoneNo}</span>
    //           </div>
    //           <div>
    //             <p>Address:</p>
    //             <span>{address}</span>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="confirmCartItems">
    //         <Typography>Your Cart Items:</Typography>
    //         <div className="confirmCartItemsContainer">
    //           {cartItems &&
    //             cartItems.map((item) => (
    //               <div key={item.product}>
    //                 <img src={item.image} alt="Product" />
    //                 <p
    //                   onClick={() => {
    //                     navigate(`/products/getsingleproduct/${item.product}`);
    //                   }}
    //                 >
    //                   {item.name}
    //                 </p>
    //                 <span>
    //                   {item.quantity} X Rs.{item.price} =
    //                   <b> Rs.{item.price * item.quantity}</b>
    //                 </span>
    //               </div>
    //             ))}
    //         </div>
    //       </div>
    //     </div>
    //     {/*  */}
    //     <div>
    //       <div className="orderSummary">
    //         <Typography>Order Summary</Typography>
    //         <div>
    //           <div>
    //             <p>Subtotal:</p>
    //             <span>Rs.{subTotal}</span>
    //           </div>
    //           <div>
    //             <p>Shipping Charges:</p>
    //             <span>Rs.{shippingCharges}</span>
    //           </div>
    //           <div>
    //             <p>GST:</p>
    //             <span>Rs.{tax}</span>
    //           </div>
    //         </div>

    //         <div className="orderSummaryTotal">
    //           <p>
    //             <b>Total:</b>
    //           </p>
    //           <span>Rs.{totalPrice}</span>
    //         </div>
    //         <button onClick={proceedToPayment}>Proceed To Payment</button>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
};

export default ProcessOrder;
