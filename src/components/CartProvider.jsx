import React, { useState } from 'react'

export const CartContext = React.createContext({
  cartItems: [],
})

export function CartProvider(props) {
  const [cartItems, setCartItems] = useState([])

  function addProduct(product) {
    setCartItems((cartItems) => [...cartItems, product])
  }

  return (
    <CartContext.Provider value={{ cartItems: cartItems, addProduct: addProduct }}>
      {props.children}
    </CartContext.Provider>
  )
}
