import { useEffect, useReducer } from 'react'
import { fetchProducts } from '../../api'

function productsReducer(state, action) {
  switch (action.type) {
    case 'loading': {
      return { ...state, isLoading: true, error: false }
    }
    case 'success': {
      return { ...state, isLoading: false, products: action.products }
    }
    case 'error': {
      return { ...state, isLoading: false, error: true }
    }
    default: {
      console.log('state', action)
      throw new Error('Action not implemented')
    }
  }
}

const initialState = {
  isLoading: false,
  products: [],
  error: false,
}

function saveProducts(products) {
  return {
    type: 'success',
    products: products,
  }
}

export function useProducts(props) {
  const [{ isLoading, products, error }, dispatch] = useReducer(
    productsReducer,
    initialState
  )

  useEffect(() => {
    dispatch({
      type: 'loading',
    })

    fetchProducts(props.order)
      .then((products) => {
        dispatch(saveProducts(products))
      })
      .catch((error) => {
        dispatch({
          type: 'error',
        })
      })
  }, [props.order])

  return { isLoading, products, error }
}
