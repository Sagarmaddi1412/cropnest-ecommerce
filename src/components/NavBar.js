// src/components/NavBar.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaSearch, FaTimes, FaBars, FaLeaf } from 'react-icons/fa';
import SideMenu from './SideMenu';
import { allProducts } from '../data/products';

function NavBar({ cartItemCount }) {
  const [isSticky, setIsSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchProducts = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = [];
    Object.entries(allProducts).forEach(([category, products]) => {
      const matchingProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      if (matchingProducts.length > 0) {
        results.push({
          category,
          products: matchingProducts.slice(0, 3)
        });
      }
    });
    setSearchResults(results);
    setSelectedIndex(-1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      clearSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    const flatResults = searchResults.flatMap(result => result.products);
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prevIndex => 
        prevIndex < flatResults.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prevIndex => (prevIndex > -1 ? prevIndex - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < flatResults.length) {
        const selectedProduct = flatResults[selectedIndex];
        navigate(`/product/${selectedProduct.id}`);
        clearSearch();
      } else {
        handleSearch(e);
      }
    }
  };

  return (
    <>
      <SideMenu isOpen={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          ${isSticky ? 'fixed top-0 left-0 right-0' : ''} 
          z-40 bg-gradient-to-r from-green-500 to-green-600 
          shadow-lg px-6 py-4 transition-all duration-300
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSideMenuOpen(true)}
              className="p-2 rounded-full hover:bg-green-600 transition-colors duration-300 text-white"
            >
              <FaBars className="text-xl" />
            </motion.button>
            
            <Link to="/" className="flex items-center space-x-2 text-white">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <FaLeaf className="text-2xl" />
              </motion.div>
              <span className="text-xl font-bold">FarmStore</span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-auto px-4" ref={searchRef}>
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchProducts(e.target.value);
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 pl-10 pr-12 rounded-full 
                           bg-cream text-gray-600 placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-white 
                           transition-all duration-300"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 
                             text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  >
                    <FaTimes />
                  </button>
                )}
                
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 
                           bg-green-700 text-white p-2 rounded-full 
                           hover:bg-green-800 transition-colors duration-300"
                >
                  <FaSearch />
                </button>
              </form>

              <AnimatePresence>
                {isSearchFocused && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full w-full mt-2 bg-white rounded-lg 
                             shadow-xl overflow-hidden border border-green-100 z-50"
                  >
                    {searchResults.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="p-2">
                        <h3 className="text-sm font-semibold text-gray-600">{category.category}</h3>
                        <ul>
                          {category.products.map((product, productIndex) => {
                            const isSelected = selectedIndex === categoryIndex * 3 + productIndex;
                 return (
                              <li key={productIndex} className="py-2">
                                <Link
                                  to={`/product/${product.id}`}
                                  className={`text-gray-600 hover:text-gray-800 transition-colors duration-300 
                                             ${isSelected ? 'bg-green-100' : ''}`}
                                >
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-10 h-10 rounded-full mr-2"
                                  />
                                  {product.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-white" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 
                             rounded-full text-white text-xs font-bold
                             flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

export default NavBar;