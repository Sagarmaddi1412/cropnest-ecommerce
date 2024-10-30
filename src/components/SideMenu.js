// src/components/SideMenu.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSeedling, FaCarrot, FaAppleAlt, FaTree, FaLeaf, FaSpa, FaTractor, FaFlask } from 'react-icons/fa';

const categoryIcons = {
  'Crops': FaSeedling,
  'Vegetables': FaCarrot,
  'Fruits': FaAppleAlt,
  'Nursery & Plants': FaTree,
  'Organic': FaLeaf,
  'Seeds': FaSpa,
  'Machinery': FaTractor,
  'Fertilizers': FaFlask
};

const SideMenu = ({ isOpen, onClose }) => {
  const categories = Object.keys(categoryIcons);

  const menuVariants = {
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-green-600">Categories</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FaTimes className="text-gray-600 text-xl" />
              </button>
            </div>

            {/* Categories List */}
            <div className="flex-grow overflow-y-auto py-4 px-2">
              {categories.map((category, index) => {
                const Icon = categoryIcons[category];
                return (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={`/category/${category}`}
                      onClick={onClose}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-green-50 transition-colors group relative overflow-hidden"
                    >
                      {/* Background animation */}
                      <div className="absolute inset-0 bg-green-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 opacity-10" />
                      
                      {/* Icon */}
                      <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                        <Icon className="text-green-600 text-xl" />
                      </div>
                      
                      {/* Category name */}
                      <span className="relative z-10 text-gray-700 group-hover:text-green-700 font-medium transition-colors">
                        {category}
                      </span>
                      
                      {/* Hover indicator */}
                      <div className="relative z-10 ml-auto transform opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-green-500"
                        />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                <p>Need help finding products?</p>
                <button className="text-green-600 hover:text-green-700 font-medium mt-1">
                  Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideMenu;