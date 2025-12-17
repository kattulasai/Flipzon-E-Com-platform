import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pid = Number(id);
  const product = products ? products.find((p) => p.id === pid) : null;

  if (!product) return <div style={{padding:20}}>Product not found.</div>;

  return (
    <div className="product-detail page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-grid">
        <img src={product.image} alt={product.title} />
        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>₹ {product.price}</h3>
          <p>Category: {product.category}</p>
          {product.rating ? <p>Rating: {product.rating.rate} ({product.rating.count})</p> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
