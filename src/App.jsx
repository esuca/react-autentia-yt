import React, { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { ProductsSection } from './components/ProductsSection'

export const CartContext = React.createContext()

function CartProvider(props) {
  const [cartItems, setCartItems] = useState([])

  function addProduct(product) {
    setCartItems((cartItems) => [...cartItems, product])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems,
        addProduct: addProduct,
      }}
    >
      {props.children}
    </CartContext.Provider>
  )
}

export function App() {
  return (
    <CartProvider>
      <Navbar />
      <ProductsSection />
    </CartProvider>
  )
}
