// src/components/Cart.js
import React, { useState } from 'react';
import productList from './data';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(productList);
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    );
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    const subTotal = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const discountAmount = (subTotal * discount) / 100;
    return subTotal - discountAmount;
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>
      <div className="table-responsive">
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{`INR ${product.price.toFixed(2)}`}</td>
                <td>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      updateQuantity(product.id, +e.target.value)
                    }
                  />
                </td>
                <td>{`INR ${(product.price * product.quantity).toFixed(2)}`}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-group discount-input">
        <label>Discount (%):</label>
        <input
          type="number"
          className="form-control"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>
      <div className="total-section">
        <p>Subtotal: {`INR ${calculateTotal().toFixed(2)}`}</p>
        <p>Discounted Total: {`INR ${(calculateTotal() - discount).toFixed(2)}`}</p>
      </div>
    </div>
  );
};

export default Cart;
