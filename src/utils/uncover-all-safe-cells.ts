import { Cell } from '../types/Cell'

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
    numOfRows,
    numOfCols,
  } = params
  
  return []
}