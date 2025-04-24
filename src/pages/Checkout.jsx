import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Checkout({ user, cart, setCart }) {
  const navigate = useNavigate();
  const [deliveryFee] = useState(5.99);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate subtotal (before delivery)
  const subtotal = cart ? cart.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;
  
  // Calculate total (after delivery)
  const total = subtotal + deliveryFee;

  // Remove item from cart
  const removeItem = (itemId) => {
    if (!cart) return;
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    toast.info("Item removed from cart");
  };

  // Update quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (!cart) return;
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  // Handle checkout submission
  const handleCheckout = (e) => {
    e.preventDefault();
    
    // No API calls, just client-side validation and state updates
    if (!user) {
      toast.error("Please log in to complete your purchase");
      navigate("/login");
      return;
    }

    if (!deliveryAddress || !contactNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    // Simulate order processing without actual API calls
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order placed successfully! You'll pay upon delivery.");
      // Clear cart
      setCart([]);
      navigate("/");
    }, 2000);
  };

  // If cart is empty, show appropriate message
  useEffect(() => {
    if (cart && cart.length === 0) {
      // Don't show toast when component first mounts to avoid spamming the user
      // Only show it if cart becomes empty after a removal action
    }
  }, [cart]);

  // Guard clause in case cart is undefined
  if (!cart) {
    return (
      <div className="checkout-container">
        <h1>Checkout</h1>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <div className="checkout-content">
          <div className="cart-items">
            <h2>Your Cart ({cart.length} items)</h2>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="cart-item-image" 
                />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Delivery Fee:</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="summary-item total">
              <span><strong>Total:</strong></span>
              <span><strong>${total.toFixed(2)}</strong></span>
            </div>

            <form onSubmit={handleCheckout} className="checkout-form">
              <h3>Delivery Information</h3>
              <div className="form-group">
                <label htmlFor="address">Delivery Address *</label>
                <textarea
                  id="address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact Number *</label>
                <input
                  type="tel"
                  id="phone"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>
              <div className="payment-method">
                <h3>Payment Method</h3>
                <div className="payment-option">
                  <input 
                    type="radio" 
                    id="pay-on-delivery" 
                    name="payment" 
                    checked
                    readOnly 
                  />
                  <label htmlFor="pay-on-delivery">Pay on Delivery</label>
                </div>
              </div>
              <button 
                type="submit" 
                className="place-order-button"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;