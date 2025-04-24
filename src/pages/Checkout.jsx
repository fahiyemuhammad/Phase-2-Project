import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function checkout() {
  const { user } = useAuth();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      // Proceed with checkout process
      console.log('Proceeding to checkout with items:', cartItems);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}