// src/pages/PaymentOptionsPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGooglePay, 
  FaCcVisa, 
  FaCcMastercard, 
  FaCreditCard, 
  FaMoneyBillWave,
  FaArrowLeft,
  FaShieldAlt,
  FaCheckCircle,
  FaLock
} from 'react-icons/fa';
import { SiPhonepe, SiPaytm } from 'react-icons/si';
import { Link } from 'react-router-dom';

const PaymentOptionsPage = ({ cartItems, getCartTotal, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const paymentMethods = [
    { 
      id: 'gpay', 
      name: 'Google Pay', 
      icon: FaGooglePay, 
      color: '#4285F4',
      description: 'Pay securely with Google Pay'
    },
    { 
      id: 'phonepe', 
      name: 'PhonePe', 
      icon: SiPhonepe, 
      color: '#5F259F',
      description: 'Quick payments with PhonePe'
    },
    { 
      id: 'paytm', 
      name: 'Paytm', 
      icon: SiPaytm, 
      color: '#00BAF2',
      description: 'Safe & secure with Paytm'
    },
    { 
      id: 'visa', 
      name: 'Visa Card', 
      icon: FaCcVisa, 
      color: '#1A1F71',
      description: 'Pay with Visa credit/debit card'
    },
    { 
      id: 'mastercard', 
      name: 'Mastercard', 
      icon: FaCcMastercard, 
      color: '#EB001B',
      description: 'Pay with Mastercard'
    },
    { 
      id: 'netbanking', 
      name: 'Net Banking', 
      icon: FaMoneyBillWave, 
      color: '#2E7D32',
      description: 'Direct bank transfer'
    },
  ];

  const handlePayment = () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-green-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block"
          >
            <FaShieldAlt className="text-6xl text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Payment Method</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            All transactions are secure and encrypted. Total Amount: 
            <span className="font-bold text-green-600"> ₹{getCartTotal().toFixed(2)}</span>
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full h-32 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  selectedMethod === method.id
                    ? 'bg-white shadow-lg border-2 border-green-500 transform scale-105'
                    : 'bg-white shadow-md hover:shadow-lg border border-gray-100'
                }`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-between">
                  <method.icon 
                    className="text-4xl" 
                    style={{ color: method.color }} 
                  />
                  {selectedMethod === method.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <FaCheckCircle className="text-green-500 text-2xl" />
                    </motion.div>
                  )}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">{method.name}</h3>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <motion.button
            onClick={handlePayment}
            disabled={!selectedMethod || isProcessing}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold transition-all duration-300 ${
              selectedMethod && !isProcessing
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            whileHover={selectedMethod && !isProcessing ? { scale: 1.02 } : {}}
            whileTap={selectedMethod && !isProcessing ? { scale: 0.98 } : {}}
          >
            {isProcessing ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaLock className="text-xl" />
                </motion.div>
                Processing...
              </>
            ) : (
              <>
                <FaLock className="text-xl" />
                Pay Securely
              </>
            )}
          </motion.button>

          <Link
            to="/cart"
            className="block w-full text-center py-4 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition-colors duration-300"
          >
            <FaArrowLeft className="inline mr-2" />
            Back to Cart
          </Link>
        </div>

        {/* Security Badges */}
        <div className="mt-12 flex justify-center items-center gap-8 text-gray-400 ">
          <FaShieldAlt className="text-2xl" />
          <FaLock className="text-2xl" />
          <FaCreditCard className="text-2xl" />
          <span className="text-sm">Secure Payment Processing</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentOptionsPage;