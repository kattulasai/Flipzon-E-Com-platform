import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart, addToWishlist, viewDetails }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          viewDetails={viewDetails}
        />
      ))}
    </div>
  );
};

export default ProductList;
