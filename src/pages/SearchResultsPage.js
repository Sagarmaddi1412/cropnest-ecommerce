// src/pages/SearchResultsPage.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { allProducts } from '../data/products';

function SearchResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  const searchProducts = () => {
    const results = [];
    Object.entries(allProducts).forEach(([category, products]) => {
      const matchingProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingProducts.length > 0) {
        results.push({
          category,
          products: matchingProducts
        });
      }
    });
    return results;
  };

  const searchResults = searchProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((category, index) => (
            <li key={index} className="py-4">
              <h2 className="text-lg font-bold">{category.category}</h2>
              <ul>
                {category.products.map(product => (
                  <li key={product.id} className="py-2">
                    <Link to={`/product/${product.id}`} className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-md mr-4"
                      />
                      <span className="text-gray-700">{product.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{searchQuery}"</p>
      )}
    </div>
  );
}

export default SearchResultsPage;