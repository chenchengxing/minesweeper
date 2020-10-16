import { Cell, CellStatus } from '../types/Cell'
import { checkGameWin } from './check-game-win'

test('should win the game when every mine is flagged and every other cell is revealed', () => {
  const cells: Cell[] = [
    {
      index: 1,
      status: CellStatus.Uncovered,
      isMine: false,
      numOfMinesAround: 1,
    },
    {
      index: 2,
      status: CellStatus.Flagged,
      isMine: true,
      numOfMinesAround: 0,
    },
  ]
  expect(checkGameWin(cells)).toBe(true)
})

test('should not yet win the game if some cells are still covered', () => {
  const cells: Cell[] = [
    {
      index: 1,
      status: CellStatus.Covered,
      isMine: false,
      numOfMinesAround: 1,
    },
    {
      index: 2,
      status: CellStatus.Flagged,
      isMine: true,
      numOfMinesAround: 0,
    },
  ]
  expect(checkGameWin(cells)).toBe(false)
})