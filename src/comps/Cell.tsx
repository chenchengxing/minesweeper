import React from 'react'
import { Cell, CellStatus } from '../types/Cell'
import cn from 'classnames'
import { getCellDisplayContent } from '../utils/get-cell-display-content'

interface Props {
  cell: Cell,
}

function CellComp(props: Props) {
  const {
    cell,
  } = props
  const { status } = cell
  return (
    <div 
      className={
        cn('cell', {
          'cell-uncovered': status === CellStatus.Uncovered,
          'cell-flagged': status === CellStatus.Flagged,
        })
      }
    >
      { getCellDisplayContent(cell) }
    </div>
  )
}

export default CellComp
