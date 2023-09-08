
import React from 'react';
import playStore from '../../../images/playstore.png';
import appstore from "../../../images/Appstore.png"
import "../Footer/Footer.css"

const Footer = () => {
  return (
    <footer id='footer'>
      <div className="leftfooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt='playstore'></img>
        <img src={appstore} alt='Appstore'></img>
      </div>
      <div className="midfooter">
        <h1>Ecommerce</h1>
        <p>High Quality is our first Priority</p>
        <p>Copy 2023 &copy; YashoMahajan</p>
      </div>

      <div className="rightfooter">
        <h4>Follow us</h4>
        <a href='https://www.instagram.com/yashodipmahajan/' target='_blank'>Instagram</a>
        <a href='#'>Facebook</a>
      </div>
    </footer>
  );
}

export default Footer

