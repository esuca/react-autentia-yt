import React from 'react'
import { useProducts } from './useProducts'
import { ProductItem } from './ProductItem'

export function ProductList(props) {
  const { isLoading, products, error } = useProducts(props)

  if (isLoading) {
    return <p>Cargando productos...</p>
  }

  if (error) {
    return <p>Ups, algo ha pasado :(</p>
  }

  return (
    <ol>
      {products.map((product) => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
    </ol>
  )
}
