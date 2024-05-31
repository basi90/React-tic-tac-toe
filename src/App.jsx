import { useState } from "react";

import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import Log from "./components/Log/Log.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning_combinations.js";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_STATE = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function getPlayerTurn(movesList) {
  let currentPlayer = "X";

  if (movesList.length > 0 && movesList[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function getGameBoard(movesList) {
  let gameBoard = [...INITIAL_STATE.map(array => [...array])];

  for (const move of movesList) {
    const { square, player } = move;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function getWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].col];
    const secondSquare = gameBoard[combination[1].row][combination[1].col];
    const thirdSquare = gameBoard[combination[2].row][combination[2].col];

    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = players[firstSquare];
    }
  }

  return winner;
}

function App() {

  const [players, setPlayers] = useState(PLAYERS);

  const [movesList, setMovesList ] = useState([]);

  const turn = getPlayerTurn(movesList);
  const gameBoard = getGameBoard(movesList);
  const winner = getWinner(gameBoard, players);
  const draw = movesList.length === 9 && !winner;

  function handleTurn(rowIndex, colIndex) {
    setMovesList(oldMoves => {
      const turn = getPlayerTurn(oldMoves);

      const updatedMoves = [{ square: {row: rowIndex, col: colIndex}, player: turn }, ...oldMoves];

      return updatedMoves;
    });
  }

  function handleRematch() {
    setMovesList([]);
  }

  function handleChangeName(symbol, newName) {
    setPlayers(oldNames => {
      return {
        ...oldNames,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" toMove={turn === "X"} onSave={handleChangeName} />
          <Player initialName={PLAYERS.O} symbol="O" toMove={turn === "O"} onSave={handleChangeName} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onMove={handleTurn} toMoveSymbol={turn} board={gameBoard} />
      </div>
      <Log moves={movesList} />
    </main>
  )
}

export default App
