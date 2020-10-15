import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Cell, CellStatus, isCellCovered, isCellFlagged } from './types/Cell'
import { BOARD_COLUMNS, BOARD_ROWS, NUMBER_OF_MINES } from './constants/BoardDimensions'
import BoardContainerComp from './comps/BoardContainer'
import { spreadMines } from './utils/spread-mines'
import { uncoverAllSafeCells } from './utils/uncover-all-safe-cells'

function App() {
  const [ cells, setCells ] = useState<Cell[]>([])
  useEffect(() => {
    let initialCells = []
    for (let index = 0; index < BOARD_COLUMNS * BOARD_ROWS; index++) {
      const cell: Cell = {
        index,
        status: CellStatus.Covered,
        isMine: false,
        numOfMinesAround: 0,
      }
      initialCells.push(cell)
    }
    setCells(spreadMines({
      cells: initialCells,
      numOfMines: NUMBER_OF_MINES,
      numOfCols: BOARD_COLUMNS,
      numOfRows: BOARD_ROWS,
    }))
  }, [])

  const handleCellRightClick = (index: number) => {
    const targetCell = cells[index]
    if (isCellCovered(targetCell)) {
      setCells([
        ...cells.slice(0, index),
        {
          ...targetCell,
          status: CellStatus.Flagged,
        },
        ...cells.slice(index + 1),
      ])
    } else if (isCellFlagged(targetCell)) {
      setCells([
        ...cells.slice(0, index),
        {
          ...targetCell,
          status: CellStatus.Covered,
        },
        ...cells.slice(index + 1),
      ])
    }
  }
  const handleCellClick = (index: number) => {
    const targetCell = cells[index]
    if (isCellCovered(targetCell)) {
      if (!targetCell.isMine && targetCell.numOfMinesAround === 0) {
        setCells(uncoverAllSafeCells({
          cells, 
          originCell: targetCell,
          numOfCols: BOARD_COLUMNS,
          numOfRows: BOARD_ROWS,
        }))
      } else {
        setCells([
          ...cells.slice(0, index),
          {
            ...targetCell,
            status: CellStatus.Uncovered,
          },
          ...cells.slice(index + 1),
        ])
      }
    }
  }
  return (
    <div className='App'>
      <div className='main'>
        <header>
          Minesweeper!
        </header>
        <BoardContainerComp 
          cells={cells} 
          onCellRightClick={handleCellRightClick}
          onCellClick={handleCellClick}
        />
      </div>
    </div>
  )
}

export default App
