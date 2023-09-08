import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loaduser,
  updatePassword,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET, UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';


const UpdatePassword = () => {
  let dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldpassword", oldpassword);
    myForm.set("newpassword", newpassword);
    myForm.set("confirmpassword",confirmpassword);

    // console.log("Sign up from submitted");
    dispatch(updatePassword(myForm));
  };


  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password"></MetaData>
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon/>
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldpassword}
                    onChange={(e) => {
                      setoldpassword(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="loginPassword">
                <LockOpenIcon />
                  <input
                    type="password"
                    placeholder=" New Password"
                    required
                    value={newpassword}
                    onChange={(e) => {
                      setnewpassword(e.target.value);
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
                  value="Chnage"
                  className="updatePasswordBtn"
                ></input>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
