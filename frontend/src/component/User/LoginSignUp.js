import React, { useEffect, useRef, useState } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const LoginSignUp = (location) => {
  let dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    // console.log("form submitted successfully");
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);

    // console.log("Sign up from submitted");
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          // Only three states are there 1st is intital and 2nd is processing amd 3rd is done...
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }

        reader.readAsDataURL(e.target.files[0]);
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(isAuthenticated){
        // navigate(redirect);
        navigate("/account");
    }

  }, [dispatch,redirect, error, alert,isAuthenticated]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      //  switcherTab.current.classList.add("shiftToNeutral");
      //  switcherTab.current.classList.remove("shiftToRight");

      //  registerTab.current.classList.remove("shiftToNeutralForm");
      //  loginTab.current.className.remove("shiftToLeft");
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      // switcherTab.current.classList.add("shiftToRight");
      // switcherTab.current.classList.remove("shiftToNeutral");

      // registerTab.current.classList.add("shiftToNeutralForm");
      // loginTab.current.classList.add("shiftToLeft");

      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
   <>
   {loading?<Loader/>:
    <>
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <div>
          <div className="Login_signUp_toggle">
            <p
              onClick={(e) => {
                switchTabs(e, "login");
              }}
            >
              LOGIN
            </p>
            <p
              onClick={(e) => {
                switchTabs(e, "register");
              }}
            >
              REGISTER
            </p>
          </div>
          <button ref={switcherTab}></button>
        </div>
        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
          <div className="loginEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="loginPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            ></input>
          </div>
          <Link to="/password/forgot">forget Password ?</Link>
          <input type="submit" value="Login" className="loginBtn" />
        </form>
        <form
          className="signUpForm"
          ref={registerTab}
          encType="multipart/form-data"
          onSubmit={registerSubmit}
        >
          <div className="signUpName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={registerDataChange}
            ></input>
          </div>
          <div className="signUpEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
            />
          </div>

          <div className="signUpPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
            />
          </div>
          <div id="registerImage">
            <img src={avatarPreview} alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/"
              onChange={registerDataChange}
            />
          </div>
          <input type="submit" value="Register" className="signUpBtn"></input>
        </form>
      </div>
    </div>
  </>}
   </>
  );
};

export default LoginSignUp;
