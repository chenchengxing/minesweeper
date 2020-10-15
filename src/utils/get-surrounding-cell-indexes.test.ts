import { Cell, CellStatus } from "../types/Cell"
import { getSurroundingCellIndexes } from "./get-surrounding-cell-indexes"

const INITIAL_CELL_COUNT = 9
let initialCells: Cell[] = []
for (let index = 0; index < INITIAL_CELL_COUNT; index++) {
  const cell: Cell = {
    index,
    status: CellStatus.Covered,
    isMine: false,
    numOfMinesAround: 0,
  }
  initialCells.push(cell)
}

test('should return the correct indexes', () => {
  const surroundingCellIndexes = getSurroundingCellIndexes({
    cells: initialCells,
    numOfCols: 3,
    numOfRows: 3,
    mineIndex: 1,
  })
  expect(surroundingCellIndexes.includes(0)).toBe(true)
  expect(surroundingCellIndexes.includes(2)).toBe(true)
  expect(surroundingCellIndexes.includes(3)).toBe(true)
  expect(surroundingCellIndexes.includes(4)).toBe(true)
  expect(surroundingCellIndexes.includes(5)).toBe(true)
})

test('should return the correct indexes for corners', () => {
  const surroundingCellIndexes = getSurroundingCellIndexes({
    cells: initialCells,
    numOfCols: 3,
    numOfRows: 3,
    mineIndex: 0,
  })
  expect(surroundingCellIndexes.includes(1)).toBe(true)
  expect(surroundingCellIndexes.includes(3)).toBe(true)
  expect(surroundingCellIndexes.includes(4)).toBe(true)
})

test('should return the correct indexes for the center', () => {
  const surroundingCellIndexes = getSurroundingCellIndexes({
    cells: initialCells,
    numOfCols: 3,
    numOfRows: 3,
    mineIndex: 4,
  })
  expect(surroundingCellIndexes.length).toBe(8)
})



