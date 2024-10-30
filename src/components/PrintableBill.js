// src/components/PrintableBill.js
import React from 'react';
import { motion } from 'framer-motion';
import { FaPrint, FaDownload, FaBarcode, FaCheckCircle } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';

const PrintableBill = ({ orderDetails, onClose }) => {
  const currentDate = new Date().toLocaleDateString();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print(); // This will trigger the browser's print dialog which can save as PDF
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Bill Header - Non-printable */}
        <div className="p-4 bg-green-500 text-white flex justify-between items-center print:hidden">
          <h2 className="text-xl font-bold">Order Invoice</h2>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 rounded-lg"
            >
              <FaPrint />
              Print
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-white text-green-500 rounded-lg"
            >
              <FaDownload />
              Save PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Close
            </motion.button>
          </div>
        </div>

        {/* Printable Bill Content */}
        <div className="p-8 bg-white" id="printable-content">
          {/* Company Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-600">CropNest</h1>
            <p className="text-gray-600">Your Trusted Agricultural Partner</p>
            <div className="mt-2 text-sm text-gray-500">
              <p>123 Farming Street, Agri Tower</p>
              <p>Bengaluru - 560100</p>
              <p>Phone: +91 1234567890</p>
            </div>
          </div>

          {/* Order Details */}
          <div className="flex justify-between mb-8">
            <div>
              <h3 className="font-bold text-gray-800">Order Details</h3>
              <p className="text-gray-600">Order Number: #{orderNumber}</p>
              <p className="text-gray-600">Date: {currentDate}</p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                <QRCodeSVG value={orderNumber} size={64} />
              </div>
              <FaBarcode className="text-4xl text-gray-400" />
            </div>
          </div>

          {/* Customer Details */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-2">Customer Details</h3>
            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-gray-600">Name: {orderDetails?.customerName || 'Guest User'}</p>
              <p className="text-gray-600">Email: {orderDetails?.email || 'N/A'}</p>
              <p className="text-gray-600">Phone: {orderDetails?.phone || 'N/A'}</p>
              <p className="text-gray-600">Shipping Address: {orderDetails?.address || 'N/A'}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">Order Items</h3>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Item</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Qty</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Price</th>
                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orderDetails?.items?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-800">{item.name}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 text-right">{item.quantity}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 text-right">{item.price}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 text-right">
                      ₹{(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800">₹{orderDetails?.subtotal || 0}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (18%):</span>
                <span className="text-gray-800">₹{orderDetails?.tax || 0}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-800">
                  {orderDetails?.shipping === 0 ? 'Free' : `₹${orderDetails?.shipping || 0}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-800">Total:</span>
                <span className="text-green-600">₹{orderDetails?.total || 0}</span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="text -center mb-8">
            <FaCheckCircle className="text-4xl text-green-600" />
            <p className="text-gray-600">Payment Successful</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrintableBill;