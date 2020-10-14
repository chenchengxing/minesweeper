import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Cell, CellStatus, isCellCovered, isCellFlagged } from './types/Cell'
import { BOARD_COLUMNS, BOARD_ROWS } from './constants/BoardDimensions'
import BoardContainerComp from './comps/BoardContainer'

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
    setCells(initialCells)
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
  return (
    <div className='App'>
      <header>
        Minesweeper!
      </header>
      <BoardContainerComp 
        cells={cells} 
        onCellRightClick={handleCellRightClick}
        onCellClick={handleCellClick}
      />
    </div>
  )
}

export default App
