import React from "react";

const Wishlist = ({ wishlist, removeFromWishlist, moveToCart }) => {
  return (
    <div className="wishlist page">
      <h2>❤️ Wishlist ({wishlist.length})</h2>
      {wishlist.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id} className="page-item">
              <img src={item.image} alt={item.title} className="item-thumb" />
              <div className="item-body">
                <h4>{item.title}</h4>
                <p className="small">{item.description && item.description.slice(0, 120)}</p>
              </div>
              <div className="item-actions">
                <div>₹ {item.price}</div>
                <div style={{display:'flex',flexDirection:'column',gap:8,alignItems:'flex-end'}}>
                  <button aria-label={`Move ${item.title} to cart`} onClick={() => moveToCart(item.id)} className="move-button">Move to Cart</button>
                  <button aria-label={`Remove ${item.title} from wishlist`} onClick={() => removeFromWishlist(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
