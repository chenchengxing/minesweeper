import { Cell, CellStatus } from '../types/Cell'
import { spreadMines } from './spread-mines'

const INITIAL_CELL_COUNT = 12
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

test('should spread correct number of mines', () => {
  const cellsAfterSpread = spreadMines({
    cells: initialCells, 
    numOfMines: 6,
    numOfRows: 3,
    numOfCols: 4,
  })
  expect(cellsAfterSpread.filter(cell => cell.isMine).length).toBe(6)
})