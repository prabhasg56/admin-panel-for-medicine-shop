import React from 'react';
import CartContext from './cart-context';

const CartProvider = (props) => {

    const addItems = (item) => {
      console.log(item)
    }

const cartContext = React.createContext({
    items: [],
    addItems: addItems 
})
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;
