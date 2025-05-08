import React from 'react';
import '../assets/css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>ICo-Pond</h3>
          <p>Sistem monitoring dan perlindungan kolam otomatis.</p>
        </div>

        <div className="footer-links">
          <h4>Menu</h4>
          <ul>
            <li><a href="/">Beranda</a></li>
            <li><a href="/About">About</a></li>
            <li><a href="/Product">Monitoring</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Kontak</h4>
          <p>Email: icooopondd@email.com</p>
          <p>Telp: +62 812-3456-7890</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 ICo-Pond. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
