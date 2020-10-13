import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import BoardComp from './comps/Board'
import { Cell, CellStatus } from './types/Cell'
import { BOARD_COLUMNS, BOARD_ROWS } from './constants/BoardDimensions'

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
  return (
    <div className='App'>
      <header>
        Minesweeper!
      </header>
      <BoardComp 
        cells={cells} 
      />
    </div>
  )
}

export default App
