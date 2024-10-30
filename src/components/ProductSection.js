// src/components/ProductSection.js
import React from 'react';
import FlexCard from './FlexCard';
import { Link } from 'react-router-dom';

function ProductSection({ title, products, addToCart, showMoreLink }) {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold text-customGreen text-center mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, index) => (
          <FlexCard key={index} product={product} addToCart={addToCart} />
        ))}
      </div>
      {showMoreLink && (
        <div className="text-center mt-4">
          <Link to={showMoreLink} className="text-customGreen underline">Show More</Link>
        </div>
      )}
    </section>
  );
}

export default ProductSection;
