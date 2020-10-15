import { fireEvent, getByTestId } from '@testing-library/dom'
import { render } from '@testing-library/react'
import React from 'react'
import { Cell, CellStatus } from '../types/Cell'
import CellComp from './Cell'

test('renders cell, reacts to click', () => {
  const cell: Cell = {
    index: 100,
    status: CellStatus.Covered,
    isMine: false,
    numOfMinesAround: 0,
  }
  const handleCellClick = jest.fn()
  const { getByText, container } = render(
    <CellComp
      cell={cell}
      onClick={handleCellClick}
    />
  )
  
  fireEvent.click(getByTestId(container, 'cell'))
  expect(handleCellClick).toHaveBeenCalledTimes(1)
})

test('should render an non-mine in uncovered status, with mines count', () => {
  const cell: Cell = {
    index: 100,
    status: CellStatus.Uncovered,
    isMine: false,
    numOfMinesAround: 2,
  }
  const handleCellClick = jest.fn()
  const { getByText, container } = render(
    <CellComp
      cell={cell}
      onClick={handleCellClick}
    />
  )
  
  expect(getByTestId(container, 'cell').textContent).toEqual('2')
})
