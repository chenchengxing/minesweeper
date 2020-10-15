import { Cell } from '../types/Cell'

export function rearrangeCells(cells: Cell[], numOfRows: number, numOfCols: number) {
  if (cells.length !== numOfCols * numOfRows) {
    return []
  }
  let originalIndex = 0
  let result: Cell[][] = []
  for (let rowIndex = 0; rowIndex < numOfRows; rowIndex++) {
    let currentRow: Cell[] = []
    for (let colIndex = 0; colIndex < numOfCols; colIndex++) {
      currentRow.push(cells[originalIndex])
      originalIndex += 1
    }
    result.push(currentRow)
  }
  return result
}