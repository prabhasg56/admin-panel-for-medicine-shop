import React, { useContext } from "react";
import CartContext from "../store/cart-context";

const Cart = () => {
  const cartCtx = useContext(CartContext);

  return (
    <>
      <div class="container mt-3">
        <h2 className="text-center">Your Cart items</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartCtx._currentValue.cartItems.map((item, index) => {
              return (
                <tr>
                  <td class="text-dark">{item.name}</td>
                  <td className="text-secondary">{item.description}</td>
                  <td className="text-secondary">{`Rs ${item.price}`}</td>
                  <td className="text-secondary">{item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Total Amount = {cartCtx._currentValue.totalAmount}</th>
              <th>
                <button
                  type="button"
                  className="btn btn-success text-white fw-bold"
                >
                  Buy Now
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </>
  );
};

export default Cart;
