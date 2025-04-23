import React, { useState, useEffect } from 'react';

const PromoBanner = () => {
  const [promoProducts, setPromoProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Define all handler functions at the top
  const handleClose = () => setIsVisible(false);
  
  const nextProduct = () => {
    setCurrentIndex(prev => (prev + 1) % promoProducts.length);
  };

  const prevProduct = () => {
    setCurrentIndex(prev => (prev - 1 + promoProducts.length) % promoProducts.length);
  };

  useEffect(() => {
    const fetchPromoProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=8');
        const data = await response.json();
        // Filter products with >15% discount
        const discounted = data.products.filter(p => p.discountPercentage > 15);
        setPromoProducts(discounted);
      } catch (error) {
        console.error('Error fetching promo products:', error);
      }
    };

    fetchPromoProducts();
  }, []);

  useEffect(() => {
    if (promoProducts.length > 1) {
      const timer = setInterval(() => {
        nextProduct(); // Use the defined function
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [promoProducts]);

  if (!isVisible || promoProducts.length === 0) return null;

  const currentProduct = promoProducts[currentIndex];
  const discountedPrice = (currentProduct.price * (1 - currentProduct.discountPercentage / 100)).toFixed(2);

  return (
    <div className="promo-banner">
      <div className="promo-content">
        <button className="promo-nav-btn" onClick={prevProduct}>&lt;</button>
        
        <div className="promo-item">
          <div className="promo-image-container">
            <img 
              src={currentProduct.thumbnail} 
              alt={currentProduct.title}
              className="promo-image"
            />
            <span className="promo-badge">{Math.round(currentProduct.discountPercentage)}% OFF</span>
          </div>
          <h3>{currentProduct.title}</h3>
          <div className="price-container">
            <span className="original-price">${currentProduct.price}</span>
            <span className="discounted-price">${discountedPrice}</span>
          </div>
          <p className="promo-text">Limited time offer! Only {currentProduct.stock} left</p>
        </div>
        
        <button className="promo-nav-btn" onClick={nextProduct}>&gt;</button>
      </div>
      
      <button className="promo-close-btn" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default PromoBanner;