import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loaduser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  let dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    // console.log("Sign up from submitted");
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        // Only three states are there 1st is intital and 2nd is processing amd 3rd is done...
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      // setAvatarPreview(user.avatar.url);
      // setAvatarPreview("Profile.png");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loaduser());

      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, user]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile"></MetaData>
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/"
                    onChange={(e) => {
                      setAvatar(e.target.value);
                    }}
                  />
                </div>
                <input
                  type="submit"
                  value="updateProfile"
                  className="updateProfileBtn"
                ></input>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
