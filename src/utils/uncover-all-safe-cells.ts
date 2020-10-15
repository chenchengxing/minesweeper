import { Cell, CellStatus } from '../types/Cell'
import { hasBottom, hasBottomLeft, hasBottomRight, hasLeft, hasRight, hasTop, hasTopLeft, hasTopRight } from './get-surrounding-cell-indexes'

interface CellWithVisited extends Cell {
  visited: boolean,
}

interface Params {
  cells: Cell[],
  originCell: Cell,
  numOfRows: number, 
  numOfCols: number,
}
export function uncoverAllSafeCells(params: Params): Cell[] {
  const {
    cells,
    originCell,
    numOfRows: row,
    numOfCols: col,
  } = params
  const stack: CellWithVisited[] = [{
    ...originCell,
    visited: false,
  }]
  const cellsWithVisited = cells.slice().map(cell => {
    // set the original one uncovered
    if (cell.index === originCell.index) {
      return {
        ...cell,
        visited: false,
        status: CellStatus.Uncovered
      }
    }
    return {
      ...cell,
      visited: false,
    }
  })
  while (stack.length) {
    const currentCell = stack[stack.length - 1] // visit the one on top of stack
    cellsWithVisited[currentCell.index].visited = true
    stack.splice(stack.length - 1, 1) // pop from stack
    dfsVisit(currentCell, cellsWithVisited, row, col, stack)
  }
  return cellsWithVisited
}

/* 
  @param stack will be mutated
*/
function dfsVisit(currentCell: CellWithVisited, cells: CellWithVisited[], row: number, col: number, stack: CellWithVisited[]) {
  const index = currentCell.index
  const len = cells.length
  // a lot, so we do clockwise, top -> top right -> right -> bottom right -> ... -> left -> top left
  const directions = [
    {
      hasDirectionFunction: hasTop,
      getIndex: (index: number, row: number, col: number) => index - col,
    },
    {
      hasDirectionFunction: hasTopRight,
      getIndex: (index: number, row: number, col: number) => index - col + 1,
    },
    {
      hasDirectionFunction: hasRight,
      getIndex: (index: number, row: number, col: number) => index + 1,
    },
    {
      hasDirectionFunction: hasBottomRight,
      getIndex: (index: number, row: number, col: number) => index + col + 1,
    },
    {
      hasDirectionFunction: hasBottom,
      getIndex: (index: number, row: number, col: number) => index + col,
    },
    {
      hasDirectionFunction: hasBottomLeft,
      getIndex: (index: number, row: number, col: number) => index + col - 1,
    },
    {
      hasDirectionFunction: hasLeft,
      getIndex: (index: number, row: number, col: number) => index - 1,
    },
    {
      hasDirectionFunction: hasTopLeft,
      getIndex: (index: number, row: number, col: number) => index - col - 1,
    },
  ]
  directions.forEach(({ hasDirectionFunction, getIndex}) => {
    if (hasDirectionFunction(index, len, row, col)) {
      const visitingIndex = getIndex(index, row, col)
      const cell = cells[visitingIndex]
      cell.status = CellStatus.Uncovered
      if (!cell.visited && cell.numOfMinesAround === 0) {
        stack.push(cell)
      }
    }
  })
}