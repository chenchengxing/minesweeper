import { BOARD_COLUMNS, BOARD_ROWS } from '../constants/BoardDimensions'
import { Cell } from '../types/Cell'

export function rearrangeCells(cells: Cell[]) {
  let originalIndex = 0
  let result: Cell[][] = []
  for (let rowIndex = 0; rowIndex < BOARD_ROWS; rowIndex++) {
    let currentRow: Cell[] = []
    for (let colIndex = 0; colIndex < BOARD_COLUMNS; colIndex++) {
      currentRow.push(cells[originalIndex])
      originalIndex += 1
    }
    result.push(currentRow)
  }
  return result
}