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
        rearrangedCells.map((cellRow: Cell[], rowIndex: number) => {
          return (
            <div key={rowIndex} className={'cell-row'}>
              {
                cellRow.map((cell: Cell) => {
                  return <CellComp key={cell.index} cell={cell} />
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
