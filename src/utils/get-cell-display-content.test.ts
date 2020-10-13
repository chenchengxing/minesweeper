import { Cell, CellStatus } from '../types/Cell'
import { getCellDisplayContent } from './get-cell-display-content'

test('should display null when cell is covered', () => {
  const cell: Cell = {
    index: 100,
    status: CellStatus.Covered,
    isMine: false,
    numOfMinesAround: 0,
  }
  const expected = getCellDisplayContent(cell)
  expect(expected).toBe(null)
})

test('should display null when cell is flagged', () => {
  const cell: Cell = {
    index: 100,
    status: CellStatus.Flagged,
    isMine: false,
    numOfMinesAround: 0,
  }
  const expected = getCellDisplayContent(cell)
  expect(expected).toBe(null)
})

test('should display * when bomb cell is uncovered', () => {
  const cell: Cell = {
    index: 100,
    status: CellStatus.Uncovered,
    isMine: true,
    numOfMinesAround: 0,
  }
  const expected = getCellDisplayContent(cell)
  expect(expected).toBe(`*`)
})

test('should display null when cell is uncovered with 0 mines around it', () => {
  const cell: Cell = {
    index: 100,
    status: CellStatus.Uncovered,
    isMine: false,
    numOfMinesAround: 0,
  }
  const expected = getCellDisplayContent(cell)
  expect(expected).toBe(null)
})

test('should display the exact number when cell is uncovered with mines around it', () => {
  const NumOfMinesAround = 2
  const cell: Cell = {
    index: 100,
    status: CellStatus.Uncovered,
    isMine: false,
    numOfMinesAround: NumOfMinesAround,
  }
  const expected = getCellDisplayContent(cell)
  expect(expected).toBe(NumOfMinesAround)
})