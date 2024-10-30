// src/components/FlexCard.js
import React from 'react';

const FlexCard = ({ product, addToCart }) => {
  return (
    <div className="border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-200 transform hover:scale-105" // Changed height to h-48 for a square look
      />
      <div className="p-4 flex flex-col items-center flex-grow"> {/* Added padding for spacing */}
        <h3 className="font-semibold text-lg text-center">{product.name}</h3> {/* Increased font size */}
        <p className="text-gray-600 text-base text-center">{product.price}</p> {/* Increased font size */}
        <p className="text-gray-500 text-sm text-center">{product.location}</p>
        <div className="mt-auto w-full flex justify-center"> {/* Centers the button */}
          <button
            onClick={() => addToCart(product)}
            className="mt-2 px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-orange-500 transition-colors duration-200 w-3/4" // Added w-3/4 for button width
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlexCard;