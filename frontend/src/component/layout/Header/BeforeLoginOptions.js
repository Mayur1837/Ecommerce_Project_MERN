import React, { useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";


const BeforeLoginOptions = () => {
    const [open, SetOpen] = useState(false);
    const navigate=useNavigate();

    function loginuser(){
       navigate("/login");
    }
  return (
   <>
   <SpeedDial
      className="speedDial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => SetOpen(false)}
        onOpen={() => SetOpen(true)}
        open={open}
        direction="down"
        icon={
            <img
            className="speedDialIcon"
            src={"/Profile.png"}
            alt="Profile"
          />
        }
      >
         <SpeedDialAction
          icon={<LoginIcon />}
          tooltipTitle="login"
          onClick={loginuser}
        ></SpeedDialAction>
      </SpeedDial>
   </>
  )
}

export default BeforeLoginOptions
