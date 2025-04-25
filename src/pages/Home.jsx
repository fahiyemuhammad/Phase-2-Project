import { useEffect, useRef, useState } from "react";
import PromoBanner from "./PromoBanner";
import SortByPrice from "./SortByPrice";

function Home({ user, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [localRating, setLocalRating] = useState(null);
  const detailsRef = useRef(null);
  const [sortOrder, setSortOrder] = useState("");
  const productRefs = useRef([]); // For scroll animation

  // Load products
  useEffect(() => {
    const url = searchTerm
      ? `https://dummyjson.com/products/search?q=${searchTerm}`
      : "https://dummyjson.com/products";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, [searchTerm]);

  // Scroll to details if one is selected
  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  }, [selectedProduct]);

  // Scroll animation using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    productRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      productRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [products, sortOrder]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="home">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <PromoBanner />
      <SortByPrice onSort={setSortOrder} />

      {/* Expanded Product Viewer */}
      {selectedProduct && (
        <div ref={detailsRef} className="details-card">
          <button onClick={() => setSelectedProduct(null)} className="back-button">✕ Close</button>
          <div className="details-inner">
            <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="details-image" />
            <div className="details-info">
              <h2>{selectedProduct.title}</h2>
              <p><strong>Brand:</strong> {selectedProduct.brand}</p>
              <p><strong>Category:</strong> {selectedProduct.category}</p>
              <p><strong>Price:</strong> ${selectedProduct.price}</p>
              <p><strong>Rating:</strong> {selectedProduct.rating}⭐</p>
              <p>{selectedProduct.description}</p>

              <div className="rating-section">
                <p><strong>Your Rating:</strong></p>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setLocalRating(star)}
                      style={{
                        fontSize: '1.8rem',
                        cursor: 'pointer',
                        color: star <= localRating ? 'gold' : 'lightgray',
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <p style={{ marginTop: '5px', color: "black" }}>
                    Rated {localRating ?? selectedProduct.rating} out of 5
                  </p>
                </div>
              </div>

              <button className="buy-button" onClick={() => addToCart(selectedProduct)}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      {loading ? (
        <p className="loading-products">Loading products...</p>
      ) : (
        <div className="product-list">
          {sortedProducts.length === 0 ? (
            <p>No products match your search.</p>
          ) : (
            sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="product-card"
                ref={(el) => (productRefs.current[index] = el)}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                  onClick={() => {
                    setSelectedProduct(product);
                    setLocalRating(product.rating);
                  }}
                />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>$ {product.price}</p>
                </div>
                <div className="product-button">
                  <button onClick={() => addToCart(product)}>Add To Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;