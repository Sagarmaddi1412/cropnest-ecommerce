// src/pages/CartPage.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DeliveryCheck from '../components/DeliveryCheck/DeliveryCheck';

const CartPage = ({ cartItems, updateQuantity, removeFromCart, getCartTotal }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedSubtotal = getCartTotal();
    const calculatedTax = calculatedSubtotal * 0.18; // 18% tax
    const calculatedShipping = calculatedSubtotal > 1000 ? 0 : 100; // Free shipping over ₹1000
    const calculatedTotal = calculatedSubtotal + calculatedTax + calculatedShipping;

    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setShipping(calculatedShipping);
    setTotalAmount(calculatedTotal);
  }, [cartItems, getCartTotal]);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
    } else {
      navigate('/payment-options');
    }
  };

  const calculateItemTotal = (price, quantity) => {
    const numericPrice = parseFloat(price.replace('₹', '').replace(',', ''));
    return numericPrice * quantity;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 py-4 sm:py-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                  <div className="flex items-center mt-4 sm:mt-0">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2 text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <FaPlus />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                
                {/* Items List */}
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 items-center text-sm">
                      <span className="col-span-5 text-gray-600">{item.name}</span>
                      <span className="col-span-3 text-gray-600 text-center">{item.price}</span>
                      <span className="col-span-1 text-gray-600 text-center">×</span>
                      <span className="col-span-1 text-gray-600 text-center">{item.quantity}</span>
                      <span className="col-span-2 text-gray-600 text-right">
                        ₹{calculateItemTotal(item.price, item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-4 border-t border-gray-200"></div>

                {/* Summary Calculations */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 items-center text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-600 text-right">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-2 items-center text-sm">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span className="text-gray-600 text-right">₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="grid grid-cols-2 items-center text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-600 text-right">
                      {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Final Total */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 items-center">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className=" text-lg font-bold text-gray-800 text-right">
                        ₹{totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DeliveryCheck component remains the same */}
            <div className="mt-4">
              <DeliveryCheck />
            </div>

            {/* Checkout Button remains the same */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CartPage;