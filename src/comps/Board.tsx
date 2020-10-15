import React, { SyntheticEvent, useCallback, useRef } from 'react'
import { BOARD_COLUMNS, BOARD_ROWS, CELL_SIZE } from '../constants/BoardDimensions'
import { useContextMenuEvent } from '../hooks/useContextMenu'
import { Cell } from '../types/Cell'
import { rearrangeCells } from '../utils/rearrange-cells'
import CellComp from './Cell'

export interface BoardCompProps {
  cells: Cell[],
  onCellRightClick(index: number): void,
  onCellClick(index: number): void,
  numOfCols?: number,
  numOfRows?: number,
}
function BoardComp(props: BoardCompProps) {
  const {
    cells,
    onCellRightClick,
    onCellClick,
    numOfCols = BOARD_COLUMNS,
    numOfRows = BOARD_ROWS,
  } = props

  const ref = useRef(null)
  
  const handleRightClick = useCallback((e: MouseEvent) => {
    e.preventDefault()
    const elementRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const relativeX = e.clientX - elementRect.left
    const relativeY = e.clientY - elementRect.top
    const rowIndex = Math.floor(relativeY / CELL_SIZE)
    const colIndex = Math.floor(relativeX / CELL_SIZE)
    // console.log(relativeX, relativeY, rowIndex, colIndex)
    onCellRightClick(rowIndex * numOfCols + colIndex)
  }, [onCellRightClick])

  useContextMenuEvent(ref, handleRightClick)

  const handleClick = (rowIndex: number, colIndex: number) => () => {
    onCellClick(rowIndex * numOfCols + colIndex)
  }

  const rearrangedCells: Cell[][] = rearrangeCells(cells, numOfRows, numOfCols)
  return (
    <div ref={ref}>
      {
        rearrangedCells.map((cellRow: Cell[], rowIndex: number) => {
          return (
            <div key={rowIndex} className={'cell-row'}>
              {
                cellRow.map((cell: Cell, colIndex: number) => {
                  return (
                    <CellComp 
                      key={cell.index} 
                      cell={cell}
                      onClick={handleClick(rowIndex, colIndex)}
                    />
                  )
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
