import React from 'react'
import { Cell } from '../types/Cell'
import { rearrangeCells } from '../utils/rearrange-cells'
import CellComp from './Cell'

interface Props {
  cells: Cell[],
}

function BoardComp(props: Props) {
  const {
    cells,
  } = props
  if (!cells.length) {
    return null
  }
  const rearrangedCells: Cell[][] = rearrangeCells(cells)
  return (
    <div>
      {
        rearrangedCells.map((cellRow: Cell[]) => {
          return (
            <div className={'cell-row'}>
              {
                cellRow.map((cell: Cell) => {
                  return <CellComp cell={cell} />
                })
              }
            </div>
          )
          
        })
      }
    </div>
  )
}

export default BoardComp
