import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Cell, CellStatus, isCellCovered, isCellFlagged } from './types/Cell'
import { BOARD_COLUMNS, BOARD_ROWS, NUMBER_OF_MINES } from './constants/BoardDimensions'
import BoardContainerComp from './comps/BoardContainer'
import { spreadMines } from './utils/spread-mines'
import { uncoverAllSafeCells } from './utils/uncover-all-safe-cells'
import { GameStatus } from './types/GameStatus'
import { checkGameWin } from './utils/check-game-win'

function App() {
  const [ cells, setCells ] = useState<Cell[]>([])
  const [ gameStatus, setGameStatus ] = useState<GameStatus>(GameStatus.PLAYING)

  let initialCells: Cell[] = []
  for (let index = 0; index < BOARD_COLUMNS * BOARD_ROWS; index++) {
    const cell: Cell = {
      index,
      status: CellStatus.Covered,
      isMine: false,
      numOfMinesAround: 0,
    }
    initialCells.push(cell)
  }
  useEffect(() => {
    gameReset()
  }, [])

  const gameReset = () => {
    setGameStatus(GameStatus.PLAYING)
    setCells(spreadMines({
      cells: initialCells,
      numOfMines: NUMBER_OF_MINES,
      numOfCols: BOARD_COLUMNS,
      numOfRows: BOARD_ROWS,
    }))
  }
  const handleCellRightClick = (index: number) => {
    if (gameStatus !== GameStatus.PLAYING) {
      return
    }
    const targetCell = cells[index]
    if (isCellCovered(targetCell)) {
      const upcomingCells = [
        ...cells.slice(0, index),
        {
          ...targetCell,
          status: CellStatus.Flagged,
        },
        ...cells.slice(index + 1),
      ]
      setCells(upcomingCells)
      if (checkGameWin(upcomingCells)) {
        setGameStatus(GameStatus.WIN)
      }
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
    if (gameStatus !== GameStatus.PLAYING) {
      return
    }

    const targetCell = cells[index]
    const { isMine, numOfMinesAround } = targetCell

    if (isCellCovered(targetCell)) {
      let upcomingCells: Cell[]
      if (!isMine && numOfMinesAround === 0) {
        upcomingCells = uncoverAllSafeCells({
          cells, 
          originCell: targetCell,
          numOfCols: BOARD_COLUMNS,
          numOfRows: BOARD_ROWS,
        })
        setCells(upcomingCells)
      } else {
        upcomingCells = [
          ...cells.slice(0, index),
          {
            ...targetCell,
            status: CellStatus.Uncovered,
          },
          ...cells.slice(index + 1),
        ]
        setCells(upcomingCells)
      }
      if (isMine) {
        setGameStatus(GameStatus.LOST)
      } else {
        if (checkGameWin(upcomingCells)) {
          setGameStatus(GameStatus.WIN)
        }
      }
    }
  }
  return (
    <div className='App'>
      <div className='main'>
        <div className='control-bar'>
          <header>
            {`Minesweeper!`}
          </header>
          { gameStatus === GameStatus.PLAYING ? <div>{NUMBER_OF_MINES - cells.filter(cell => isCellFlagged(cell)).length}</div> : null }
          { gameStatus === GameStatus.LOST ? <button onClick={gameReset}>{`Game Over.. Restart?`}</button> : null }
          { gameStatus === GameStatus.WIN ? <button onClick={gameReset}>{`Cong! Restart?`}</button> : null }
        </div>
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
