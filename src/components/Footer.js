// src/components/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaLeaf,
  FaCertificate,
  FaTruck,
  FaCreditCard,
  FaHandshake
} from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-800 text-white">
      {/* Top Section with Newsletter */}
      <div className="container mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaLeaf className="text-3xl" />
              <h3 className="text-2xl font-bold">CropNest</h3>
            </div>
            <p className="text-green-100">
              Your trusted partner in agricultural solutions. Providing quality products and services since 2024.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-white text-green-600 p-2 rounded-full hover:bg-green-100 transition-colors"
              >
                <FaLinkedinIn />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Products', 'Services', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-green-100 hover:text-white transition-colors flex items-center group"
                  >
                    <FaArrowRight className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhoneAlt className="text-green-300" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-green-300" />
                <span>support@cropnest.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-green-300" />
                <span>123 Farming Street, Agri Tower, Bengaluru - 560100</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="text-green-100 mb-4">
              Subscribe to our newsletter for updates, farming tips, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-green-700 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-400 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-green-500">
          <div className="flex items-center space-x-3">
            <FaCertificate className="text-3xl text-green-300" />
            <div>
              <h5 className="font-semibold">Certified Products</h5>
              <p className="text-sm text-green-100">100% Quality Assured</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaTruck className="text-3xl text-green-300" />
            <div>
              <h5 className="font-semibold">Free Shipping</h5>
              <p className="text-sm text-green-100">On orders over ₹1000</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaCreditCard className="text-3xl text-green-300" />
            <div>
              <h5 className="font-semibold">Secure Payment</h5>
              <p className="text-sm text-green-100">100% Secure Checkout</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaHandshake className="text-3xl text-green-300" />
            <div>
              <h5 className="font-semibold">24/7 Support</h5>
              <p className="text-sm text-green-100">Dedicated Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-green-800 py-4 text-center">
        <p className="text-green-100">
          &copy; 2024 CropNest. All rights reserved.
        </ p>
      </div>
    </footer>
  );
};

export default Footer;