import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";
import ProductDetail from "./components/ProductDetail";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedCart) {
      // ensure backward compatibility: set quantity to 1 if missing
      const parsed = JSON.parse(savedCart).map((it) => (it.quantity ? it : { ...it, quantity: 1 }));
      setCart(parsed);
    }
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((it) => it.id === product.id);
      if (found) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, quantity: (it.quantity || 1) + 1 } : it
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const incrementCartItem = (id) => {
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: (it.quantity || 1) + 1 } : it)));
  };

  const decrementCartItem = (id) => {
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, quantity: (it.quantity || 1) - 1 } : it))
        .filter((it) => it.quantity > 0)
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((it) => it.id !== id));
  };

  const moveToCart = (id) => {
    const item = wishlist.find((w) => w.id === id);
    if (!item) return;
    // remove from wishlist
    setWishlist((prev) => prev.filter((it) => it.id !== id));
    // add to cart (merge quantities)
    setCart((prev) => {
      const found = prev.find((it) => it.id === item.id);
      if (found) {
        return prev.map((it) => (it.id === item.id ? { ...it, quantity: (it.quantity || 1) + 1 } : it));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo"><Link to="/">Flipzon</Link></h1>
        <div className="header-center">
          <input
            type="text"
            className="search-bar"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="top-buttons">
          <button onClick={() => navigate('/cart')}>
            🛒 Cart <span className="badge">{cart.reduce((s, it) => s + (it.quantity || 1), 0)}</span>
          </button>
          <button onClick={() => navigate('/wishlist')}>
            ❤️ Wishlist <span className="badge">{wishlist.length}</span>
          </button>
        </div>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <ProductList
              products={filteredProducts}
              addToCart={handleAddToCart}
              addToWishlist={handleAddToWishlist}
              viewDetails={(p) => navigate(`/product/${p.id}`)}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} incrementItem={incrementCartItem} decrementItem={decrementCartItem} />}
        />
        <Route
          path="/wishlist"
          element={<Wishlist wishlist={wishlist} removeFromWishlist={removeFromWishlist} moveToCart={moveToCart} />}
        />
      </Routes>
    </div>
  );
};

export default App;
