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
    <div>
      { cell.numOfMinesAround }
    </div>
  )
}

export default CellComp
