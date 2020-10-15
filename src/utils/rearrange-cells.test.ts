import { Cell, CellStatus } from '../types/Cell'
import { rearrangeCells } from './rearrange-cells'

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

test('should correctly rearrange according to row and col number', () => {
  /**
  0 1
  2 3
  4 5
  6 7
  8 9
  10 11
 */
  const rearranged = rearrangeCells(initialCells, 6, 2)
  expect(rearranged.length).toBe(6)
  expect(rearranged[0].length).toBe(2)
  expect(rearranged[5][1].index).toBe(11)
})

test('should return empty array, when row * col number not equals to cell length', () => {
  const rearranged = rearrangeCells(initialCells, 3, 2)
  expect(rearranged.length).toBe(0)
})