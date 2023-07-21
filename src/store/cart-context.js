import React, {createContext} from "react"

const CartContext = React.createContext({
    items: [],
    cartItems: [],
    totalAmount: 0,
    addItems: (item) => {},
    addToCart: (item) => {}
})

export default CartContext;