import { Cell, CellStatus } from '../types/Cell'

export function getCellDisplayContent(cell: Cell) {
  const { status } = cell
  switch(status) {
    case CellStatus.Covered:
      return null
    case CellStatus.Flagged:
      return null
    case CellStatus.Uncovered: {
      if (cell.isMine) {
        return `*`
      } else {
        if (cell.numOfMinesAround === 0) {
          return null
        } else {
          return cell.numOfMinesAround
        }
      }
    }
  }
}