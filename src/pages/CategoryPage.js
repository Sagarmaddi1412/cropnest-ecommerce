// src/pages/CategoryPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Import FaArrowLeft icon
import FlexCard from '../components/FlexCard';
import { allProducts } from '../data/products';

function CategoryPage({ addToCart }) {
  const { categoryName } = useParams();
  const products = allProducts[categoryName] || [];

  return (
    <div className="p-4">
      <Link 
        to="/" 
        className="inline-flex items-center space-x-2 text-green-500 hover:text-green-600 mb-4"
      >
        <FaArrowLeft />
        <span>Back to Home</span>
      </Link>
      <h2 className="text-2xl font-bold mb-6 text-center capitalize">{categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <FlexCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;