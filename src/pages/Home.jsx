import { useEffect, useRef, useState } from "react";
import PromoBanner from "./PromoBanner";

function Home({ user, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [localRating, setLocalRating] = useState(null); // New state for rating
  const detailsRef = useRef(null);

  // Load products (initial or after search)
  useEffect(() => {
    const url = searchTerm
      ? `https://dummyjson.com/products/search?q=${searchTerm}` // the API I used when searching
      : "https://dummyjson.com/products"; // when not searching

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products); // NOTE: access .products here
        setLoading(false);
      });
  }, [searchTerm]);

  // Scroll to details if one is selected
  useEffect(() => {
    if (selectedProduct) {
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  }, [selectedProduct]);

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

              {/* Rating Feature */}
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
                  <p  style={{ marginTop: '5px' , color: "black"}}>Rated {localRating ?? selectedProduct.rating} out of 5</p>
                </div>
              </div>

              <button
                className="buy-button"
                onClick={() => addToCart(selectedProduct)} // Ensure this is connected correctly
              >
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
          {products.length === 0 ? (
            <p>No products match your search.</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                  onClick={() => {
                    setSelectedProduct(product);
                    setLocalRating(product.rating); // Set local rating when product is selected
                  }}
                />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <p>$ {product.price}</p>
                </div>
                <div className="product-button">
                  {/* Ensure onClick is set up correctly */}
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