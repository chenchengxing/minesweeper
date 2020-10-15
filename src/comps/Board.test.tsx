import React from 'react'
import { render } from '@testing-library/react'
import { fireEvent, getAllByTestId, getByTestId } from '@testing-library/dom'
import Board from './Board'
import { Cell, CellStatus } from '../types/Cell'

let initialCells: Cell[] = []
for (let index = 0; index < 12; index++) {
  const cell: Cell = {
    index,
    status: CellStatus.Covered,
    isMine: false,
    numOfMinesAround: 0,
  }
  initialCells.push(cell)
}

test('behaves correctly on click & right click actions', () => {
  const cell: Cell = {
    index: 100,
    status: CellStatus.Covered,
    isMine: false,
    numOfMinesAround: 0,
  }
  const cells = [cell]
  const handleCellRightClick = jest.fn()
  const handleCellClick = jest.fn()
  const { getByText, container } = render(
    <Board 
      cells={cells}
      onCellRightClick={handleCellRightClick}
      onCellClick={handleCellClick}
      numOfCols={1}
      numOfRows={1}
    />
  )
  fireEvent.contextMenu(getByTestId(container, 'cell'))
  expect(handleCellRightClick).toHaveBeenCalledTimes(1)
  
  fireEvent.click(getByTestId(container, 'cell'))
  expect(handleCellClick).toHaveBeenCalledTimes(1)
})

test('should render correct number of cells', () => {
  const handleCellRightClick = jest.fn()
  const handleCellClick = jest.fn()
  const { getByText, container } = render(
    <Board 
      cells={initialCells/* 12 cells */}
      onCellRightClick={handleCellRightClick}
      onCellClick={handleCellClick}
      numOfCols={3}
      numOfRows={4}
    />
  )
  expect(getAllByTestId(container, 'cell').length).toBe(12)
})