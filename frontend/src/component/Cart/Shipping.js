import React, { useState } from "react";
import "./Shipping.css";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

// let Country = require('country-state-city').Country;
// let State = require('country-state-city').State;

// console.log(Country.getAllCountries())
// console.log(State.getAllStates())
const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cartReducer);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPincode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  // const[address,setAddress]=useState(shippingInfo.address);
  // const[city,setCity]=useState(shippingInfo.city);
  // const[state,setState]=useState(shippingInfo.state);
  // const[country,setCountry]=useState(shippingInfo.country);
  // const[pinCode,setPincode]=useState(shippingInfo.pincode);
  // const[phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should 10 digit long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    navigate("/order/confirm");
  };
  return (
    <>
      <MetaData title="ShippingInfo"></MetaData>
      <CheckoutSteps activeSteps={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="PhoneNumber"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <PublicIcon />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            {/* {state && (
            <div>
              <TransferWithinAStationIcon/>

              <select
              required
              value={city}
              onChange={(e)=> setCity(e.target.value)}
              >
                <option value="">City</option>
                {City &&
                  City.getCitiesOfState(state).map((item)=>(
                    <option 
                    key={item.isoCode} value={item.isoCode}
                    >{item.name}</option>
                  ))
                }
              </select>
            </div>
          )} */}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
