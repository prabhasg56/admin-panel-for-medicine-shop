import React, {createContext} from "react"

const CartContext = React.createContext({
    items: [],
    addItems: (item) => {}
})

export default CartContext;