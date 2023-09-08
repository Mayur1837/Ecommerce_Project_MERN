import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import React from "react";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css"

const CheckoutSteps = ({ activeSteps }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
    background: "wheat",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeSteps} style={stepStyles}>
        {steps.map((item, index) => (
          <Step key={index}
          active={activeSteps === index ? true : false}
          completed={activeSteps>=index ? true : false}
          >
            <StepLabel icon={item.icon}
            style={{
                color: activeSteps>=index ? "tomato" : "rgba(0, 0, 0, 0.649)"
            }}
            >{item.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
