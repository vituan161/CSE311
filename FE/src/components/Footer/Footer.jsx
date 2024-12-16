import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="grid-item">
          <h3>About Us</h3>
          <p>
            At NextHome, we're dedicated to helping you find your perfect home.
            With years of expertise, personalized service, and innovative
            technology, we're here to make your real estate journey seamless.
            Discover the NextHome difference today!
          </p>
        </div>
        <div className="grid-item">
          <h3>Contact</h3>
          <p>
            <span>
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            Binh Duong New City, Binh Duong, Viet Nam
          </p>
          <p>
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            nexthomeexample@gmail.com
          </p>
          <p>
            <span>
              <FontAwesomeIcon icon={faPhone} />
            </span>
            +01 234 567 89
          </p>
          <p>
            <span>
              <FontAwesomeIcon icon={faMobileScreenButton} />
            </span>
            +01 234 567 99
          </p>
        </div>
        <div className="grid-item">
          <h3>Follow Us</h3>
          <div className="social-media-icon">
            <FontAwesomeIcon icon={faFacebook} />
          </div>
          <div className="social-media-icon">
            <FontAwesomeIcon icon={faTwitter} />
          </div>
          <div className="social-media-icon">
            <FontAwesomeIcon icon={faLinkedin} />
          </div>
          <div className="social-media-icon">
            <FontAwesomeIcon icon={faYoutube} />
          </div>
        </div>
      </div>
      <br />
      <hr />
      <p className="copyright">
        Copyright &copy; 2024 All Rights Reserved by NextHome
      </p>
    </footer>
  );
};

export default Footer;
