import React, { useContext } from 'react'
import { CartContext } from '../CartProvider'

export function ProductItem({ product }) {
  const cart = useContext(CartContext)

  return (
    <React.Fragment>
      <span>{product.title}</span>
      <span> 💰{product.price}</span>
      <button onClick={() => cart.addProduct(product)}>+ADD TO CART</button>
    </React.Fragment>
  )
}
