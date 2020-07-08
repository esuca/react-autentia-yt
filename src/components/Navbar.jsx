import React from 'react'

export function Navbar(props) {
  return (
    <nav>
      <Cart cartItems={props.cartItems} />
    </nav>
  )
}

function Cart(props) {
  return (
    <div>
      🛒 Cart:
      <b>{props.cartItems.length}</b>
    </div>
  )
}
