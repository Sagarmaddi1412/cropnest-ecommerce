// src/components/DeliveryCheck/DeliveryCheck.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaTruck, FaBoxOpen, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import './DeliveryCheck.css';

const DeliveryCheck = () => {
  const [pincode, setPincode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const checkDelivery = () => {
    if (pincode.length !== 6) return;
    
    setIsChecking(true);
    // Simulating API call
    setTimeout(() => {
      setDeliveryStatus(Math.random() > 0.3);
      setIsChecking(false);
    }, 1500);
  };

  return (
    <div className="delivery-check-container">
      <h3 className="delivery-title">
        <FaTruck className="delivery-icon" />
        Delivery Options
      </h3>
      <div className="input-group">
        <div className="input-wrapper">
          <FaMapMarkerAlt className="location-icon" />
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter your pincode"
            className="pincode-input"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={checkDelivery}
          disabled={pincode.length !== 6 || isChecking}
          className="check-button"
        >
          {isChecking ? <FaSpinner className="spinner" /> : 'Check'}
        </motion.button>
      </div>

      <AnimatePresence>
        {deliveryStatus !== null && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="delivery-status"
          >
            {deliveryStatus ? (
              <div className="status-success">
                <FaCheckCircle className="status-icon" />
                <div className="status-details">
                  <span className="status-title">Delivery Available!</span>
                  <span className="status-info">Estimated delivery in 3-5 business days</span>
                </div>
              </div>
            ) : (
              <div className="status-error">
                <FaTimesCircle className="status-icon" />
                <div className="status-details">
                  <span className="status-title">Not Available</span>
                  <span className="status-info">Sorry, we don't deliver to this location yet</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="delivery-features">
        <div className="feature">
          <FaBoxOpen className="feature-icon" />
          <span>Free shipping on orders above ₹1000</span>
        </div>
        <div className="feature">
          <FaTruck className="feature-icon" />
          <span>Express delivery available</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCheck;