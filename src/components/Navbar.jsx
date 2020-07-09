import React, { useContext } from 'react'
import { CartContext } from '../App'

export function Navbar(props) {
  return (
    <nav>
      <Cart />
    </nav>
  )
}

function Cart(props) {
  const cart = useContext(CartContext)

  return (
    <div>
      🛒 Cart:
      <b>{cart.cartItems.length}</b>
    </div>
  )
}
