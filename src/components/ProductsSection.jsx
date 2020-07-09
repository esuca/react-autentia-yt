import React, { useContext, useEffect, useReducer, useState } from 'react'
import { CartContext } from '../App'

export function ProductsSection(props) {
  const [order, setOrder] = useState('ASC')

  function changeOrder(order) {
    setOrder(order)
  }

  return (
    <main>
      <Filters changeOrder={changeOrder} />
      <ProductList order={order} fetchProducts={fetchProducts} />
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

function productsReducer(state, action) {
  switch (action.type) {
    case 'loading': {
      return { ...state, isLoading: true, error: null }
    }
    case 'success': {
      return { ...state, isLoading: false, products: action.products }
    }
    case 'error': {
      return { ...state, isLoading: false, error: action.error }
    }
    default: {
      throw new Error('la accion no existe')
    }
  }
}

function saveProducts(products) {
  return { type: 'success', products: products }
}

function useProducts(order, fetchProducts) {
  const [{ error, isLoading, products }, dispatch] = useReducer(productsReducer, {
    isLoading: false,
    products: [],
    error: null,
  })

  useEffect(() => {
    dispatch({ type: 'loading' })
    fetchProducts(order)
      .then((products) => {
        dispatch(saveProducts(products))
      })
      .catch((error) => {
        dispatch({ type: 'error', error: error })
      })
  }, [order, fetchProducts])
  return { isLoading, products, error }
}

function ProductList(props) {
  const { isLoading, products, error } = useProducts(
    props.order,
    props.fetchProducts
  )

  if (isLoading) {
    return <p>Cargando productos...</p>
  }

  if (error !== null) {
    return <p>Ups, ha habido un error!</p>
  }

  if (products.length === 0) {
    return <p>No hay productos</p>
  }

  return (
    <ol>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ol>
  )
}

function ProductItem(props) {
  const cart = useContext(CartContext)
  return (
    <li>
      <span>{props.product.title}</span>
      <span> 💰{props.product.price}€</span>
      <button onClick={() => cart.addProduct(props.product)}>+ ADD TO CART</button>
    </li>
  )
}
