import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteProductReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  userReducer,
  profileReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdesReducer,
  myordersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgotPasswordReducer,
  cartReducer: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myordersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  deleteProduct: deleteProductReducer,
  allOrders: allOrdesReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});
// console.log(localStorage.getItem("cartItems"));
let initialState = {
  cartReducer: {
    cartItems:
      localStorage.getItem("cartItems") != null
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    ShippingInfo:
      localStorage.getItem("shippingInfo") != null
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    // cartItems:[],

    // ShippingInfo:{}
    //  cartItems:  localStorage.getItem("cartItems"),
    //  ? JSON.parse(localStorage.getItem("cartItems"))
    //  : [],
  },
};
// let initialState = {
//   cart: {
//     cartItems:
//       localStorage.getItem("cartItems") !== null
//         ? JSON.parse(localStorage.getItem("cartItems"))
//         : [],
//   },
// };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
