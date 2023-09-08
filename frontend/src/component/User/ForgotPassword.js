import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {

  let dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

 let error,message,loading;
  // const { error, message, loading } = useSelector((state) => state.forgotPassword);
  const[email,setEmail]=useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    
    myForm.set("email", email);


    // console.log("Sign up from submitted");
    dispatch(forgotPassword(myForm));
  };

 

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [ dispatch,error, alert, message]);
  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      <>
        <MetaData title="FORGOT PASSWORD "></MetaData>
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Passsword</h2>
            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
             
              <div className="forgotPasswordEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              
              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              ></input>
            </form>
          </div>
        </div>
      </>
    )}
  </>
  )
}

export default ForgotPassword
