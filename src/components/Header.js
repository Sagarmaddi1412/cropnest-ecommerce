// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.jpeg';

function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="brand-section">
          <div className="brand-text">
            <div className="brand-name">
              <span className="word-crop">
                <span className="first-letter">C</span>
                <span className="remaining-letters">rop</span>
              </span>
              <span className="word-nest">
                <span className="first-letter">N</span>
                <span className="remaining-letters">est</span>
              </span>
            </div>
          </div>
          <div className="logo-wrapper">
            <img src={logo} alt="CropNest Logo" className="logo" />
          </div>
        </div>
        <div className="header-right">
          <span className="tagline">India's Largest Marketplace for Agriculture</span>
          <Link to="/auth" className="auth-button">
            Login / Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;