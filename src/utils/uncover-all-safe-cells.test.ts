import { Cell, CellStatus } from '../types/Cell'
import { uncoverAllSafeCells } from './uncover-all-safe-cells'

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

/* 
      0 1 *
      0 1 1
      H 0 0
*/
test(`should uncover aggresively including itself`, () => {
  const cells = initialCells.slice()
  cells[2].isMine = true
  cells[1].numOfMinesAround = 1
  cells[4].numOfMinesAround = 1
  cells[5].numOfMinesAround = 1
  const result = uncoverAllSafeCells({
    cells, 
    originCell: cells[6],
    numOfRows: 3,
    numOfCols: 3,
  })
  expect(result[0].status === CellStatus.Uncovered).toBe(true)
  expect(result[1].status === CellStatus.Uncovered).toBe(true)
  expect(result[3].status === CellStatus.Uncovered).toBe(true)
  expect(result[4].status === CellStatus.Uncovered).toBe(true)
  expect(result[5].status === CellStatus.Uncovered).toBe(true)
  expect(result[7].status === CellStatus.Uncovered).toBe(true)
  expect(result[8].status === CellStatus.Uncovered).toBe(true)

  expect(result[6].status === CellStatus.Uncovered).toBe(true)
})