import React, { useState } from 'react'
import { Filters } from './Filters'
import { ProductList } from './ProductList'

export function ProductsSection(props) {
  const [order, setOrder] = useState('ASC')

  function changeOrder(order) {
    setOrder(order)
  }

  return (
    <main>
      <Filters changeOrder={changeOrder} />
      <ProductList order={order} />
    </main>
  )
}
