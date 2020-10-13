import React from 'react'
import { Cell } from '../types/Cell'

interface Props {
  cell: Cell,
}

function CellComp(props: Props) {
  const {
    cell,
  } = props
  return (
    <div className={'cell'}>
      { cell.numOfMinesAround }
    </div>
  )
}

export default CellComp
