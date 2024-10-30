// src/pages/Auth.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup:', signupData);
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-box"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="forms-container">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                onSubmit={handleLoginSubmit}
                className="auth-form login-form"
              >
                <h2>Welcome Back</h2>
                <p className="form-subtitle">Please login to your account</p>
                
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-footer">
                  <label className="remember-me">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
                
                <motion.button 
                  type="submit" 
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="signup"
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -400, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                onSubmit={handleSignupSubmit}
                className="auth-form signup-form"
              >
                <h2>Create Account</h2>
                <p className="form-subtitle">Sign up to get started</p>
                
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                    required
                  />
                </div>
                
                <motion.button 
                  type="submit" 
                  className="submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign Up
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="switch-form"
          animate={{
            backgroundColor: isLogin ? "#22c55e" : "#16a34a",
          }}
        >
          <div className="switch-form-content">
            <h3>{isLogin ? "New Here?" : "Already have an account?"}</h3>
            <p>
              {isLogin
                ? "Sign up and discover great opportunities"
                : "Login to access your account"}
            </p>
            <motion.button 
              onClick={toggleForm} 
              className="switch-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Auth;