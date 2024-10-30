// src/pages/ProductPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { allProducts } from '../data/products';
import DeliveryCheck from '../components/DeliveryCheck/DeliveryCheck';


function ProductPage({ addToCart }) {
  const { productId } = useParams();
  
  const findProduct = () => {
    for (const [category, products] of Object.entries(allProducts)) {
      const product = products.find(p => p.id === productId);
      if (product) {
        return { ...product, category };
      }
    }
    return null;
  };

  const product = findProduct();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
        <Link to="/" className="text-green-500 hover:text-green-600 mt-4 inline-block">
          <FaArrowLeft className="inline mr-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center text-green-500 hover:text-green-600 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */} <motion.div 
          className="rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Product Details */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <p className="text-sm text-green-600 font-semibold mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-green-600 font-bold">
              {product.price}
            </p>
          </div>

          <div className="border-t border-b py-4">
            <h2 className="text-lg font-semibold mb-2">Product Description</h2>
            <p className="text-gray-600">
              {product.description || "High-quality agricultural product carefully selected for optimal results."}
            </p>
          </div>

          {/* Delivery Check Component */}
          <DeliveryCheck />

          {/* Add to Cart Button */}
          <motion.button
            onClick={() => addToCart(product)}
            className="w-1/2 bg-green-500 text-white py-3 px-6 rounded-lg 
                     hover:bg-green-600 transition-colors duration-300 
                     flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </motion.button>

          {/* Additional Product Details */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Product Features</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Premium quality</li>
                <li>Carefully selected</li>
                <li>Best market price</li>
                <li>Guaranteed satisfaction</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <p className="text-gray-600">
                Free delivery on orders above ₹1000. Standard delivery within 3-5 business days.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductPage;