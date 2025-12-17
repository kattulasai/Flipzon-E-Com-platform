import React from "react";

const Cart = ({ cart, removeFromCart, incrementItem, decrementItem }) => {
  const total = cart.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
  return (
    <div className="cart page">
      <h2>🛒 Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="page-item">
                <img src={item.image} alt={item.title} className="item-thumb" />
                <div className="item-body">
                  <h4>{item.title}</h4>
                  <p className="small">{item.description && item.description.slice(0, 120)}</p>
                </div>
                <div className="item-actions">
                  <div>₹ {item.price}</div>
                  <div className="qty-controls">
                    <button aria-label={`Decrease quantity for ${item.title}`} className="qty-button" onClick={() => decrementItem(item.id)}>-</button>
                    <span aria-live="polite">{item.quantity || 1}</span>
                    <button aria-label={`Increase quantity for ${item.title}`} className="qty-button" onClick={() => incrementItem(item.id)}>+</button>
                  </div>
                  <button aria-label={`Remove ${item.title} from cart`} onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="page-footer">Total: ₹ {total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
};

export default Cart;
