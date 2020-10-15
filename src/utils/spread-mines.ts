import { Cell } from '../types/Cell'
import { getSurroundingCellIndexes } from './get-surrounding-cell-indexes'

interface Params {
  cells: Cell[],
  numOfMines: number,
  numOfRows: number, 
  numOfCols: number,
}
export function spreadMines(params: Params) {
  const {
    cells,
    numOfMines,
    numOfRows,
    numOfCols,
  } = params
  let generatedCount = 0
  let generatedHash: {
    [key: string]: boolean,
  } = {}
  const length = cells.length
  let result = cells.slice()
  while(generatedCount < numOfMines) {
    const r = Math.floor(Math.random() * length)
    if (r in generatedHash) {
      // bad luck.. continue
    } else {
      result[r].isMine = true
      const surroundingCellIndexes = getSurroundingCellIndexes({
        cells: result,
        mineIndex: r,
        numOfRows,
        numOfCols,
      })
      result = increaseMineCountForSurroundingCells(result, surroundingCellIndexes)
      generatedHash[r] = true
      generatedCount += 1
    }
  }
  return result
}

function increaseMineCountForSurroundingCells(cells: Cell[], surroundingCellIndexes: number[]) {
  const result = cells.slice()
  return result.map(cell => {
    if (surroundingCellIndexes.includes(cell.index)) {
      // can't be more than 8
      const added = (cell.numOfMinesAround + 1) <= 8 ? cell.numOfMinesAround + 1 : cell.numOfMinesAround
      return {
        ...cell,
        numOfMinesAround: added as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
      }
    }
    return cell
  })
}