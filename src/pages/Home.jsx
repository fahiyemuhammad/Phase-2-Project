import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
// Import any other dependencies you're using in your Home component

function Home({ user, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch products from API or use dummy data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // If you're already fetching products from an API, keep your existing code
        // If not, here's a fallback with dummy data
        const dummyProducts = [
          {
            id: 1,
            title: "Laptop",
            price: 999.99,
            description: "High-performance laptop with latest specs",
            image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
            category: "electronics"
          },
          {
            id: 2,
            title: "Smartphone",
            price: 699.99,
            description: "Latest smartphone with advanced camera",
            image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
            category: "electronics"
          },
          {
            id: 3,
            title: "T-Shirt",
            price: 29.99,
            description: "Comfortable cotton t-shirt",
            image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            category: "clothing"
          }
        ];
        
        setProducts(dummyProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Could not add item to cart. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading-products">Loading products...</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div className="product-button">
                <button onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;