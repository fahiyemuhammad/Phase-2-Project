import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserInfo from "./pages/UserInfo";
import Checkout from "./pages/Checkout";
import "./App.css";
import LOGO from "./assets/LOGO.jpeg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  // Function to add item to cart
  const addToCart = (product) => {
    try {
      // Make sure product has all required properties
      const validProduct = {
        id: product.id || Date.now(), // Use timestamp as fallback id
        title: product.title || 'Product',
        price: parseFloat(product.price) || 0,
        image: product.image || '/placeholder-image.png',
        quantity: 1
      };
      
      // Check if product already exists in cart
      const existingItem = cart.find(item => item.id === validProduct.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        const updatedCart = cart.map(item => 
          item.id === validProduct.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        setCart(updatedCart);
      } else {
        // If item doesn't exist, add with quantity 1
        setCart([...cart, validProduct]);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <img src={LOGO} alt="shopsphere-logo" />
        <h2 className="shopsphere">ShopSphere</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <span>Hello, {user.username}</span>
              <Link to="/user-info" title="Profile" className="user-icon">👤</Link>
              <Link to="/checkout" title="Checkout" className="cart-icon">
                🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link>
              <Link to="/checkout" title="Checkout" className="cart-icon">
                🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </Link>
            </>
          )}
        </div>
      </nav>

      <ToastContainer autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />

      <Routes>
        <Route path="/" element={<Home user={user} addToCart={addToCart} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/user-info" element={<UserInfo user={user} setUser={setUser} />} />
        <Route path="/checkout" element={<Checkout user={user} cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  );
}

export default App;