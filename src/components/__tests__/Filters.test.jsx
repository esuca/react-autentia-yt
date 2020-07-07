import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Filters } from '../Filters'

describe('Filters', () => {
  it('should change the order', function () {
    const changeOrder = jest.fn()
    const component = render(<Filters changeOrder={changeOrder} />)

    userEvent.click(component.getByText(/ASC/))

    expect(changeOrder).toHaveBeenCalledWith('ASC')

    userEvent.click(component.getByText(/DESC/))

    expect(changeOrder).toHaveBeenCalledWith('DESC')
  })
})
