import React, { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { ProductsSection } from './components/ProductsSection'

export function App() {
  const [cartItems, setCartItems] = useState([])

  function addProduct(product) {
    setCartItems((cartItems) => [...cartItems, product])
  }

  return (
    <div>
      <Navbar cartItems={cartItems} />
      <ProductsSection />
    </div>
  )
}
