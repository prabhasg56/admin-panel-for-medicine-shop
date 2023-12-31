import React, { useContext } from "react";
import CartContext from "../../store/cart-context";

const MedicineList = () => {
  const cartCtx = useContext(CartContext);

  return (
    <>
      <div class="container mt-3">
        <h2 className="text-center">Medicine List</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartCtx._currentValue.items.map((item, index) => {
              return (
                <tr>
                  <td class="text-dark">{item.name}</td>
                  <td className="text-secondary">{item.description}</td>
                  <td className="text-secondary">{`Rs ${item.price}`}</td>
                  <td className="text-secondary">{item.quantity}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-success text-white fw-bold"
                      onClick={() => cartCtx._currentValue.addToCart(item)}
                    >
                      Add to cart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MedicineList;
