import React, { useState } from 'react'

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

function Filters(props) {
  return (
    <div>
      Filters:
      <button onClick={() => props.changeOrder('ASC')}>ASC 👆</button>
      <button onClick={() => props.changeOrder('DESC')}>DESC 👇</button>
    </div>
  )
}

function ProductList(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  if (isLoading) {
    return <p>Cargando productos...</p>
  }

  if (products.length === 0) {
    return <p>No hay productos</p>
  }

  return (
    <ol>
      <li>
        <span>title</span>
        <span>price</span>
        <button>+ ADD TO CART</button>
      </li>
    </ol>
  )
}
