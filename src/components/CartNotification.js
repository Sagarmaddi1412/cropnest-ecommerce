// src/components/CartNotification.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

const CartNotification = ({ show, item }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '50%' }}
          animate={{ opacity: 1, y: 0, x: '50%' }}
          exit={{ opacity: 0, y: -50, x: '50%' }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-8 right-1/2 transform translate-x-1/2 z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="bg-white rounded-lg shadow-2xl p-4 flex items-center space-x-4 border-l-4 border-green-500 relative"
            style={{ 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 20px rgba(34, 197, 94, 0.2)',
              minWidth: '300px',
              maxWidth: '400px'
            }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaCheck className="text-green-500 text-xl" />
              </motion.div>
            </div>

            <div className="flex-1 min-w-0">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-medium text-gray-900"
              >
                Added to Cart!
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-gray-500 truncate"
              >
                {item.name}
              </motion.p>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <motion.span
                key={item.quantity}
                initial={{ scale: 1.5 , opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {item.quantity}
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 origin-left"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification;