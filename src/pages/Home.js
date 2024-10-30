// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import FlexCard from '../components/FlexCard';
import { allProducts } from '../data/products';

const Home = ({ addToCart }) => {
  const categories = Object.keys(allProducts);

  return (
    <div className="p-4">
      {categories.map((category, index) => (
        <motion.div 
          key={category} 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center text-green-500">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {allProducts[category].slice(0, 4).map((product) => (
              <FlexCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
          <div className="flex justify-center">
            <Link 
              to={`/category/${category}`}
              className="group relative inline-flex items-center px-8 py-3 overflow-hidden font-medium text-green-600 border-2 border-green-600 rounded-full hover:text-white"
            >
              <span className="absolute left-0 block w-full h-0 transition-all bg-green-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="relative flex items-center">
                <span className="mr-3">Show More {category}</span>
                <FaArrowRight className="relative transform group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;