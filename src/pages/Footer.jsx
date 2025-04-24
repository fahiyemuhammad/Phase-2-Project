import React from "react";
import "../App.css";
import LOGO from "../assets/LOGO.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <h2 className="logo">Shop Sphere</h2>
          <p>Shop Smart. Shop Stylish. Save money.</p>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>

        <div className="footer-contacts">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <strong>Joel Mwaga:</strong> joel.mwaga@student.moringaschool.com
            </li>
            <li>
              <strong>Fahiye Muhammad:</strong>{" "}
              fahiye.muhammad@student.moringaschool.com
            </li>
            <li>
              <strong>Nancy Karoki:</strong>{" "}
              nancy.karoki@student.moringaschool.com
            </li>
            <li>
              <strong>David Kariuki:</strong>{" "}
              david.kariuki2@student.moringaschool.com
            </li>
            <li>
              <strong>Kiptoo Rorio:</strong>{" "}
              kiptoo.rorio@student.moringaschool.com
            </li>
          </ul>
        </div>

        <div className="footer-logo-container">
          <h3>Shop Sphere</h3>
          <img src={LOGO} alt="Shop Sphere Logo" className="footer-logo" />
          <div className="rating">
            <span className="stars">★★★★★</span> 4.5 (290 reviews)
            
          </div>
         
        </div>
        
      </div>
     
      <div className="footer-bottom">
      <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8055569448766!2d36.78575058511809!3d-1.2909940953363712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f114db7a12f0f%3A0x658f347f32ef2155!2seBee%20Kenya!5e0!3m2!1sen!2ske!4v1745475991816!5m2!1sen!2ske" 
      className='map-iframe'
      allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
        <p>
          &copy; {new Date().getFullYear()} Shop Sphere. All Rights Reserved. |
          Licensed under MIT
        </p>
      </div>
    </footer>
  );
};

export default Footer;
