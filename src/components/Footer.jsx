import React from 'react';
import '../assets/css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>ICo-Pond</h3>
          <p>Sistem pemeliharaan dan perlindungan kolam bibit ikan lele otomatis.</p>
        </div>

        <div className="footer-links">
          <h4>Menu</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/About">About</a></li>
            <li><a href="/Product">Monitoring</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: icopond3@gmail.com</p>
          <p>Phone: +62 895-1032-8573</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ICo-Pond. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
