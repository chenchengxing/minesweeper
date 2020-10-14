export interface Cell {
  index: number,
  status: CellStatus,
  isMine: boolean,
  numOfMinesAround: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
}

export enum CellStatus {
  Covered,
  Uncovered,
  Flagged,
}

export const isCellCovered = (cell: Cell) => cell.status === CellStatus.Covered
export const isCellUncovered = (cell: Cell) => cell.status === CellStatus.Uncovered
export const isCellFlagged = (cell: Cell) => cell.status === CellStatus.Flagged