import { Cell } from '../types/Cell'

interface Params {
  cells: Cell[],
  mineIndex: number,
  numOfRows: number, 
  numOfCols: number,
}

export function getSurroundingCellIndexes(params: Params): number[] {
  const {
    cells,
    mineIndex: index,
    numOfRows: row,
    numOfCols: col,
  } = params
  const len = cells.length

  const result: number[] = []
  
  if (hasTop(index, len, row, col)) {
    const topIndex = index - col
    result.push(topIndex)
    if (hasLeft(topIndex, len, row, col)) {
      result.push(topIndex - 1)
    }
    if (hasRight(topIndex, len, row, col)) {
      result.push(topIndex + 1)
    }
  }
  if (hasLeft(index, len, row, col)) {
    result.push(index - 1)
  }
  if (hasRight(index, len, row, col)) {
    result.push(index + 1)
  }
  if (hasBottom(index, len, row, col)) {
    const bottomIndex = index + col
    result.push(bottomIndex)
    if (hasLeft(bottomIndex, len, row, col)) {
      result.push(bottomIndex - 1)
    }
    if (hasRight(bottomIndex, len, row, col)) {
      result.push(bottomIndex + 1)
    }
  }
  
  return result
}

export const hasTop = (index: number, len: number, row: number, col: number) => {
  return !(index < col)
}
export const hasBottom = (index: number, len: number, row: number, col: number) => {
  return !(index >= (row - 1) * col)
}
export const hasLeft = (index: number, len: number, row: number, col: number) => {
  return !(index % col === 0)
}
export const hasRight = (index: number, len: number, row: number, col: number) => {
  return !((index + 1) % col === 0)
}
export const hasTopLeft = (index: number, len: number, row: number, col: number) => {
  return hasTop(index, len, row, col) && hasLeft(index - col, len, row, col)
}
export const hasTopRight = (index: number, len: number, row: number, col: number) => {
  return hasTop(index, len, row, col) && hasRight(index - col, len, row, col)
}
export const hasBottomLeft = (index: number, len: number, row: number, col: number) => {
  return hasBottom(index, len, row, col) && hasLeft(index + col, len, row, col)
}
export const hasBottomRight = (index: number, len: number, row: number, col: number) => {
  return hasBottom(index, len, row, col) && hasRight(index + col, len, row, col)
}