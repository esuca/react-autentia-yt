import React from 'react'
import { ProductList } from '../index'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import { fetchProducts } from '../../../api'
import userEvent from '@testing-library/user-event'
import { CartContext } from '../../CartProvider'

jest.mock('../../../api')

describe('ProductList', () => {
  beforeEach(() => {
    fetchProducts.mockClear()
  })

  it('should fetch the products and display the data', async () => {
    const products = [{ id: 1, title: 'Product 1', price: 10 }]
    fetchProducts.mockResolvedValue(products)

    const component = render(<ProductList order={'ASC'} />)

    await waitForElementToBeRemoved(() =>
      component.queryByText('Cargando productos...')
    )

    products.forEach((product) => {
      expect(component.getByText(product.title)).toBeInTheDocument()
    })
  })

  it('should show an error if network request fails', async () => {
    fetchProducts.mockRejectedValue('Error!')
    const component = render(<ProductList order={'ASC'} />)

    await waitForElementToBeRemoved(() =>
      component.queryByText('Cargando productos...')
    )

    expect(component.getByText('Ups, algo ha pasado :(')).toBeInTheDocument()
  })

  it('should fetch products when the order change', async () => {
    const products = [{ id: 1, title: 'Product 1', price: 10 }]
    fetchProducts.mockResolvedValue(products)

    const component = render(<ProductList order={'ASC'} />)

    await waitForElementToBeRemoved(() =>
      component.queryByText('Cargando productos...')
    )

    component.rerender(<ProductList order={'DESC'} />)

    await waitForElementToBeRemoved(() =>
      component.queryByText('Cargando productos...')
    )

    expect(fetchProducts).toHaveBeenCalledTimes(2)
    expect(fetchProducts).toHaveBeenNthCalledWith(1, 'ASC')
    expect(fetchProducts).toHaveBeenNthCalledWith(2, 'DESC')
  })

  it('should add a product to cart', async () => {
    const products = [{ id: 1, title: 'Product 1', price: 10 }]
    fetchProducts.mockResolvedValue(products)
    const addProduct = jest.fn()

    const component = render(
      <CartContext.Provider
        value={{
          cartItems: [],
          addProduct: addProduct,
        }}
      >
        <ProductList order={'ASC'} />
      </CartContext.Provider>
    )

    await waitForElementToBeRemoved(() =>
      component.queryByText('Cargando productos...')
    )

    userEvent.click(component.getByText('+ADD TO CART'))

    expect(addProduct).toHaveBeenCalledWith(products[0])
  })
})
