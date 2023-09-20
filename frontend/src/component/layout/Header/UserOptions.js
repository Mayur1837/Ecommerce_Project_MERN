import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import { Backdrop } from "@material-ui/core";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const UserOptions = ({ user }) => {
  const [open, SetOpen] = useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  // const {isAuthenticated,user}=useSelector((state)=> state.user);
  // console.log(`Role:- ${user.role}`)
  // const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "LogOut", func: logoutuser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders/myorders");
  }
  function account() {
    navigate("/account");
  }
  function logoutuser() {
    // navigate("/login")
    dispatch(logout());
    navigate("/");
    alert.success("Logout Successfully");
  }
  // function loginuser() {
  //   navigate("/login");
  // }

  function Cart() {
    navigate("/Cart");
  }

  function search() {
    navigate("/search");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        style={{ zIndex: "11" }}
        ariaLabel="SpeedDial tooltip example"
        onClose={() => SetOpen(false)}
        onOpen={() => SetOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            // src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8kyeCS-Zb0GCZxuDffniY0NJQ1GCIW2T0FKEMkdEXnXCnQLD435M9HF47cpS3yPj-Sm8&usqp=CAU"
            alt="Profile"
          />
        }
      >
        {user.role === "admin" && (
          <SpeedDialAction
            icon={<DashboardIcon />}
            tooltipTitle="Dashboard"
            onClick={dashboard}
          ></SpeedDialAction>
        )}

        <SpeedDialAction
          icon={<SearchIcon />}
          tooltipTitle="Search Product"
          onClick={search}
        ></SpeedDialAction>

        <SpeedDialAction
          icon={<ShoppingCartIcon />}
          tooltipTitle="Shopping Cart"
          onClick={Cart}
        ></SpeedDialAction>

        <SpeedDialAction
          icon={<ListAltIcon />}
          tooltipTitle="orders"
          onClick={orders}
        ></SpeedDialAction>
        <SpeedDialAction
          icon={<PersonIcon />}
          tooltipTitle="Profile"
          onClick={account}
        ></SpeedDialAction>

        <SpeedDialAction
          icon={<ExitToAppIcon />}
          tooltipTitle="Logout"
          onClick={logoutuser}
        ></SpeedDialAction>

        {/* Don't Know but map is not working here */}
        {/* {options.map((item) => {
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          ></SpeedDialAction>
        })} */}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
