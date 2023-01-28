import * as React from "react";
import styled from "styled-components";

function calculateWinner(squares: SquareState[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


type SquareState = 'O' | 'X' | null
type SquareProps = {
  value: SquareState;
  onClick: () => void;
}

const Square = (props: SquareProps) => {
  const SquareButton = styled.button`
    width: 1.5cm;
    height: 1.5cm;
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 34px;
  `;
  return (
    <SquareButton className="square" onClick={props.onClick}>
      {props.value}
    </SquareButton>
  )
}
type BoardState = SquareState[]
type BoardProps = {
  squares: BoardState;
  onClick: (i: number) => void;
}

const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  )
  return (
    <div>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

type Step = {
  squares: BoardState
  xIsNext: boolean
}
type GameState = {
  readonly history: Step[]
  readonly stepNumber: number
}
export const Game = () => {
  const [state, setState] = React.useState<GameState>({
    history: [
      {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true,
      },
    ],
    stepNumber: 0,
  })
  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares)
  let status: string
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${current.xIsNext ? 'X' : 'O'}`
  }
  const handleClick = (i: number) => {
    if (winner || current.squares[i]) {
      return
    }
    const next: Step = (({ squares, xIsNext }) => {
      const nextSquares = squares.slice() as BoardState
      nextSquares[i] = xIsNext ? 'X' : 'O'
      return {
        squares: nextSquares,
        xIsNext: !xIsNext,
      }
    })(current)
    setState(({ history, stepNumber }) => { //{ hisotry, stepNumber }は直前の状態。
      //更新された履歴。sliceでミューテートを回避していることに注意。
      const newHistory = history.slice(0, stepNumber + 1).concat(next)

      //stateは以下の値に更新される。
      return {
        history: newHistory,
        stepNumber: newHistory.length - 1,
      }
    })
  }
  const jumpTo = (move: number) => {
    setState(prev => ({
      ...prev,
      stepNumber: move,
    }))
  }

  const moves = state.history.map((_, move) => {
    const desc = move > 0 ? `Go to move #${move}` : 'Go to game start'
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const GameDiv = styled.div`
    display: flex;
    flex-direction: row;
  `
  const GameInfo = styled.div`
    margin-left: 2cm;
  `
  return (
    <GameDiv>
      <div className='game-board'>
        <Board squares={current.squares} onClick={handleClick} />
      </div>
      <GameInfo>
        <div>{status}</div>
        <ol>{moves}</ol>
      </GameInfo>
    </GameDiv>
  )
}