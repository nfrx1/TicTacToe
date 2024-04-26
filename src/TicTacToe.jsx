import { useState, useEffect } from "react";

export default function TicTacToe() {
  const [board, setBoard] = useState([]);
  const [isWin, setWin] = useState(false)
  const [isX, setIsX] = useState(true);
  useEffect(() => createBoardSize(3), []);

  function createBoardSize(size) {
    let copied_board = [];
    for (let i = 0; i < size; i++) {
      copied_board.push(new Array(size).fill(null));
    }
    setBoard(copied_board);
  }

  function editBoard(index1, index2) {
    let copied_board = [...board];
    copied_board[index1][index2] = isX ? "x" : "o";
    setBoard(copied_board);
    setIsX(!isX);
  }
  function checkRowwWin() {
    for (let row of board) {
      let isWin = true;
      for (let col of row) {
        // console.log('h')
        if (row.indexOf(col) > 0 || col === null) {
          isWin = false;
        }
      }
      if (isWin) {
        return row[0];
      }
    }
    return "no one";
  }
  function checkColWin() {
    for (let i = 0; i < board.length; i++) {
      let isWin = true;
      let squares = [];
      for (let row of board) {
        squares.push(row[i]);
        if (squares.indexOf(row[i]) > 0 || row[i] === null) {
          isWin = false;
        }
      }
      if (isWin) {
        return squares[0];
      }
    }
    return "no one";
  }
  function checkborderWin() {
    let square1 = [];
    let square2 = [];
    for (let i = 0; i < board.length; i++) {
      if (i === 0) {
        square1.push(board[0][0]);
      } else {
        square1.push(board[i][i]);
      }
    }
    for (let i = board.length; i > 0; i--) {
      if (i === board) {
        console.log(board.length);
        square2.push(board[board.length - 1][board.length - 1]);
      } else {
        square2.push(board[board.length - i][i - 1]);
      }
    }
    let isWin = true;
    let isWin2 = true;
    for (let i of square1) {
      if (square1.indexOf(i) > 0 || i === null) {
        isWin = false;
      }
    }
    for (let i of square2) {
      if (square2.indexOf(i) > 0 || i === null) {
        isWin2 = false;
      }
    }
    return isWin ? square1[0] : isWin2 ? square2[0] : "no one";
  }
  function checkWin() {
    const x = checkRowwWin();
    const y = checkColWin();
    const z = checkborderWin();
    if (x == "no one") {
    } else {
      return x;
    }
    if (y == "no one") {
    } else {
      return y;
    }
    if (z == "no one") {
    } else {
      return z;
    }
    return 'no one '
  }
  return (
    <div className="game h-screen flex justify-center place-items-center flex-col">
      <input
        type="range"
        onChange={(event) => createBoardSize(event.target.valueAsNumber)}
        max={7}
        min={3}
        defaultValue={3}
      ></input>
      {board.map((element1, index) => {
        return (
          <div className="row flex" key={index}>
            {element1.map((element2, index2) => {
              return element2 === "x" ? (
                <div
                  className="bg-blue-500 w-32 h-32 flex justify-center place-items-center border-2 border-black"
                  key={index2}
                >
                  <div className="transform rotate-45 bg-red-500 w-1 h-32"></div>
                  <div className="transform rotate-[-45deg] bg-red-500 w-1 h-32"></div>
                </div>
              ) : element2 === "o" ? (
                <div
                  className="bg-blue-500 w-32 h-32 border-2 border-black flex justify-center place-items-center"
                  key={index2}
                >
                  <div className="border-4 border-red-500 h-24 w-24 rounded-full"></div>
                </div>
              ) : (
                <div
                  className="bg-blue-500 w-32 h-32 border-2 border-black"
                  onClick={() => checkWin()==='no one '?editBoard(index, index2):null}
                  key={index2}
                ></div>
              );
            })}
          </div>
        );
      })}
      <h1>{checkWin()} win</h1>
    </div>
  );
}
