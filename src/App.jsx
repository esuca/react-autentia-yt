import React from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { CartProvider } from './components/CartProvider'
import { ProductsSection } from './components/ProductsSection'

export function App() {
  return (
    <CartProvider>
      <Navbar />
      <ProductsSection />
    </CartProvider>
  )
}
