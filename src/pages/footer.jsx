import React from 'react';
import '../App.css';
import LOGO from '../assets/LOGO.jpeg'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <h2 className="logo">Shop Sphere</h2>
          <p>Shop Smart. Shop Stylish. Save money.</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        <div className="footer-contacts">
          <h3>Contact Info</h3>
          <ul>
            <li><strong>Joel Mwaga:</strong> joel.mwaga@student.moringaschool.com</li>
            <li><strong>Fahiye Muhammad:</strong> fahiye.muhammad@student.moringaschool.com</li>
            <li><strong>Nancy Karoki:</strong> nancy.karoki@student.moringaschool.com</li>
            <li><strong>David Kariuki:</strong> david.kariuki2@student.moringaschool.com</li>
            <li><strong>Kiptoo Rorio:</strong> kiptoo.rorio@student.moringaschool.com</li>
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
        <p>&copy; {new Date().getFullYear()} Shop Sphere. All Rights Reserved. | Licensed under MIT</p>
      </div>
    </footer>
  );
};

export default Footer;