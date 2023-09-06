import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

function Square({ value,onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}
function Board(){
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill("."));
  const [showWinner, setShowWinner] = useState(false);

     function handleClick(i) {
      if (squares[i]!=="." || calculateWinner(squares)) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
      
  }
  let winner;
  if(squares && squares.length>0){
     winner = calculateWinner(squares);
  }
  function resetGame(){
    setSquares(Array(9).fill("."));
  setXIsNext(true);
  setShowWinner(false);
  } 
  useEffect(() => {
    if (winner) {
      const timeoutId = setTimeout(() => {
        setShowWinner(true);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [winner]);

  const status = winner ? `Winner: ${winner}` : '';
  return (
    <>
       <div>
      {showWinner && (
        <>
          <div className="status">{status}</div>
          <div className='reset-btn'>
            <button className='reset' onClick={resetGame}>Play Again</button>
          </div>
        </>
      )}
    </div>

    {!showWinner && (
      <>
      <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
    <button className='reset' onClick={()=>resetGame()}>Reset</button>
      </>
    )}
    
  </>
  ); 
}

function calculateWinner(squares) {
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
    if (squares[a]!=="." && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default App;
