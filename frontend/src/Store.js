import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import { userReducer , profileReducer, forgotPasswordReducer} from "./reducers/userReducer";
import { cartReducer} from "./reducers/cartReducer";
import { newOrderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
  products:productReducer,
  productDetails:productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgotPasswordReducer,
  cartReducer: cartReducer,
  newOrder: newOrderReducer
});
// console.log(localStorage.getItem("cartItems"));
let initialState = {
  cartReducer:{
    cartItems: localStorage.getItem("cartItems")!="undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      ShippingInfo: localStorage.getItem("shippingInfo")!="undefined"
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
    // cartItems:[],
   
    //  cartItems:  localStorage.getItem("cartItems"),
    //  ? JSON.parse(localStorage.getItem("cartItems"))
    //  : [],
    
  }
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
  reducer,initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
