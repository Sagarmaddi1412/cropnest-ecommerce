// src/pages/PaymentSuccessPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPrint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PrintableBill from '../components/PrintableBill';

const PaymentSuccessPage = ({ orderDetails }) => {
  const [showBill, setShowBill] = useState(false);

  const handlePrintClick = () => {
    setShowBill(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100"
      >
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block w-full bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300"
            >
              Continue Shopping
            </Link>
            
            <motion.button
              onClick={handlePrintClick}
              className="w-full flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPrint className="mr-2" />
              Print Bill
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showBill && (
        <PrintableBill 
          orderDetails={orderDetails} 
          onClose={() => setShowBill(false)} 
        />
      )}
    </>
  );
};

export default PaymentSuccessPage;