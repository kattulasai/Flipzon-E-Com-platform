import React from "react";

const ProductCard = ({ product, addToCart, addToWishlist, viewDetails }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} onClick={() => viewDetails(product)} />
      <h3>{product.title.slice(0, 20)}...</h3>
      <p>₹ {product.price}</p>

      <div className="card-buttons">
        <button aria-label={`Add ${product.title} to cart`} onClick={() => addToCart(product)}>Add to Cart</button>
        <button aria-label={`Add ${product.title} to wishlist`} onClick={() => addToWishlist(product)}>♡ Wishlist</button>
      </div>
    </div>
  );
};

export default ProductCard;
