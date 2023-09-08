import React, { useEffect, useState } from "react";
import "./ResetPasssword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loaduser,
  resetPassword,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET, UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = ({match}) => {
    let dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
  
    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
     
      myForm.set("password", password);
      myForm.set("confirmpassword",confirmpassword);
  
      // console.log("Sign up from submitted");
      dispatch(resetPassword(match.params.token,myForm));
    };
  
  
    useEffect(() => {
      
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully");
  
        navigate("/login");
  
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, alert, success]);
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <MetaData title="Change Password"></MetaData>
            <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                <h2 className="resetPasswordHeading">Update Profile</h2>
                <form
                  className="resetPasswordForm"
                  onSubmit={resetPasswordSubmit}
                >
                  {/* <div className="loginPassword">
                    <VpnKeyIcon/>
                    <input
                      type="password"
                      placeholder="Old Password"
                      required
                      value={oldpassword}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    ></input>
                  </div> */}
                  <div>
                  <LockOpenIcon />
                    <input
                      type="password"
                      placeholder=" New Password"
                      required
                      value={password}
                      onChange={(e) => {
                        setpassword(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="loginPassword">
                    <LockIcon/>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={confirmpassword}
                      onChange={(e) => {
                        setconfirmpassword(e.target.value);
                      }}
                    ></input>
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="resetPasswordBtn"
                  ></input>
                </form>
              </div>
            </div>
          </>
        )}
      </>
    );
}

export default ResetPassword
