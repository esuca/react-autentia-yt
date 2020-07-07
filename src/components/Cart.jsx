import React, { useContext } from 'react'
import { CartContext } from '../App'

export function Cart() {
  const cart = useContext(CartContext)
  return (
    <div>
      🛒 Cart:
      <b>{cart.cartItems.length}</b>
    </div>
  )
}
