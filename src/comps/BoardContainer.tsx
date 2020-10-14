import React from 'react'
import { Cell } from '../types/Cell'
import BoardComp, { BoardCompProps } from './Board'

interface Props {
  cells: Cell[],
  onCellRightClick(index: number, cells: Cell[]): void,
  onCellClick(index: number): void,
}

function BoardContainerComp(props: BoardCompProps) {
  const {
    cells,
  } = props

  if (!cells.length) {
    return null
  }
  
  return <BoardComp {...props} />
}

export default BoardContainerComp
