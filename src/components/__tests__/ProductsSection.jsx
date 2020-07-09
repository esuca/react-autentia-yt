import React from 'react'
import { ProductsSection } from '../ProductsSection'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import { fetchProducts } from '../../api'
import userEvent from '@testing-library/user-event'
import { CartContext } from '../../App'

jest.mock('../../api')

// loading_products = "Cargando products"

describe('Product Section', () => {
  async function waitSpinnerToHide(component) {
    await waitForElementToBeRemoved(() => component.queryByText('loading_products'))
  }

  test('show spinner and displays the products', async () => {
    const products = [{ id: 1, title: 'Fake Product', price: 10 }]
    fetchProducts.mockResolvedValue(products)

    const component = render(<ProductsSection />)

    await waitSpinnerToHide(component)

    products.forEach((product) => {
      expect(component.getByText(product.title)).toBeInTheDocument()
    })
  })

  test('when the order changes the products are fetched again', async () => {
    const products_asc = [
      { id: 1, title: 'Fake Product 1', price: 10 },
      { id: 2, title: 'Fake Product 2', price: 20 },
    ]
    const products_desc = [
      { id: 2, title: 'Fake Product 2', price: 20 },
      { id: 1, title: 'Fake Product 1', price: 10 },
    ]
    fetchProducts
      .mockResolvedValueOnce(products_asc)
      .mockResolvedValueOnce(products_desc)

    const component = render(<ProductsSection />)

    await waitSpinnerToHide(component)

    expect(component.getAllByText(/Fake/)[0]).toHaveTextContent('Fake Product 1')

    userEvent.click(component.getByText(/DESC/))

    await waitSpinnerToHide(component)

    expect(component.getAllByText(/Fake/)[0]).toHaveTextContent('Fake Product 2')
  })

  test('add a product to cart', async () => {
    const products = [{ id: 1, title: 'Fake Product', price: 10 }]
    fetchProducts.mockResolvedValue(products)
    const addProductMock = jest.fn()

    const component = render(
      <CartContext.Provider
        value={{
          cartItems: [],
          addProduct: addProductMock,
        }}
      >
        <ProductsSection />
      </CartContext.Provider>
    )

    await waitSpinnerToHide(component)

    userEvent.click(component.queryByText('+ ADD TO CART'))

    expect(addProductMock).toHaveBeenCalledWith(products[0])
  })
})
