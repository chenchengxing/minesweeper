import { Cell, CellStatus } from '../types/Cell'

export function checkGameWin(cells: Cell[]) {
  const isEveryMineFlagged = cells
    .filter(cell => cell.isMine)
    .every(cell => cell.status === CellStatus.Flagged)
  const isEveryNonMineUncovered = cells
    .filter(cell => !cell.isMine)
    .every(cell => cell.status === CellStatus.Uncovered)

  return isEveryMineFlagged && isEveryNonMineUncovered
}