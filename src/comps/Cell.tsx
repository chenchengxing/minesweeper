import React from 'react'
import { Cell, CellStatus } from '../types/Cell'
import cn from 'classnames'
import { getCellDisplayContent } from '../utils/get-cell-display-content'

interface Props {
  cell: Cell,
  onClick(e: React.MouseEvent<HTMLElement, MouseEvent>): void,
}

function CellComp(props: Props) {
  const {
    cell,
    onClick,
  } = props
  const { status } = cell
  return (
    <div 
      data-testid='cell'
      className={
        cn('cell', {
          'cell-covered': status === CellStatus.Covered,
          'cell-uncovered': status === CellStatus.Uncovered,
          'cell-flagged': status === CellStatus.Flagged,
        })
      }
      onClick={onClick}
    >
      { getCellDisplayContent(cell) }
    </div>
  )
}

export default CellComp
