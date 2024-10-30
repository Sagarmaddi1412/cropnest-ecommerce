// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProductPage from './pages/ProductPage';
import Auth from './pages/Auth';
import CartNotification from './components/CartNotification';
import PaymentOptionsPage from './pages/PaymentOptionsPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PrintableBill from './components/PrintableBill';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [showPrintableBill, setShowPrintableBill] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const addToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    setLastAddedItem(product);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // Parse the price string to remove '₹' and ',' then convert to float
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      // Multiply by quantity and add to total
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const prepareOrderDetails = () => {
    const subtotal = getCartTotal();
    const tax = subtotal * 0.18; // 18% tax
    const shipping = subtotal > 1000 ? 0 : 100; // Free shipping over ₹1000
    const totalAmount = subtotal + tax + shipping;

    return {
      items: cartItems.map(item => {
        const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
        const itemTotal = price * item.quantity;
        
        return {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: itemTotal.toFixed(2)
        };
      }),
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping,
      total: totalAmount.toFixed(2),
      customerName: "Guest User", // You can update this with actual user data
      email: "guest@example.com",
      phone: "N/A",
      address: "N/A",
    };
  };

  const handlePaymentSuccess = () => {
    const details = prepareOrderDetails();
    setOrderDetails(details);
    clearCart();
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: '#22c55e',
              color: '#fff',
            },
          }}
        />
        
        <Header />
        
        <NavBar 
          cartItemCount={getCartItemCount()} 
        />
        
        <CartNotification 
          show={showNotification} 
          item={lastAddedItem}
        />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<Home addToCart={addToCart} />} 
            />
            
            <Route 
              path="/category/:categoryName" 
              element={<CategoryPage addToCart={addToCart} />} 
            />
            
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  getCartTotal={getCartTotal}
                />
              } 
            />
            
            <Route 
              path="/search" 
              element={<SearchResultsPage addToCart={addToCart} />} 
            />
            
            <Route 
              path="/product/:productId" 
              element={<ProductPage addToCart={addToCart} />} 
            />

            <Route 
              path="/auth" 
              element={<Auth />} 
            />

            <Route 
              path="/payment-options" 
              element={
                <PaymentOptionsPage 
                  cartItems={cartItems}
                  getCartTotal={getCartTotal}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              } 
            />

            <Route 
              path="/payment-success" 
              element={
                <PaymentSuccessPage 
                  orderDetails={orderDetails}
                />
              } 
            />
          </Routes>
        </main>
        
        <Footer />

        {showPrintableBill && (
          <PrintableBill 
            orderDetails={orderDetails}
            onClose={() => setShowPrintableBill(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;