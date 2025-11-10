const gameboard = (function () {
  const gameArea = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getGameArea = () => {
    gameArea.forEach((row) => console.log(row));
  };

  const playTurn = (row, column) => {
    play(row, column, turnCounter[0]);
  };

  const playX = (row, column) => play(row, column, "X");

  const playO = (row, column) => play(row, column, "O");

  const play = (row, column, symbol) => {
    if (gameArea[row][column] !== "") return;

    gameArea[row][column] = symbol;
    // getGameArea();
    const checkWinArray = populateCheckWinArray();
    const winningSymbol = checkWin(checkWinArray, symbol);
    if (winningSymbol) {
      win = winningSymbol;
    }
    const isDraw = checkDraw();
    if (isDraw) {
      draw = isDraw;
    }
    changeTurn();
  };

  let win = "";

  const getWin = () => win;

  let draw = false;

  const getDraw = () => draw;

  const turnCounter = ["O"];

  const getTurnCounter = () => turnCounter[0];

  const assignTurn = (symbol) => {
    turnCounter[0] = symbol;
  };

  const changeTurn = () => {
    if (turnCounter[0] === "O") {
      turnCounter[0] = "X";
    } else {
      turnCounter[0] = "O";
    }
  };

  const populateCheckWinArray = () => {
    const winArr = [];
    const hArr0 = [];
    const hArr1 = [];
    const hArr2 = [];
    const vArr0 = [];
    const vArr1 = [];
    const vArr2 = [];
    const dArr0 = [];
    const dArr1 = [];
    for (let i = 0; i < 3; i++) {
      hArr0.push(gameArea[0][i]);
      hArr1.push(gameArea[1][i]);
      hArr2.push(gameArea[2][i]);
      vArr0.push(gameArea[i][0]);
      vArr1.push(gameArea[i][1]);
      vArr2.push(gameArea[i][2]);
      dArr0.push(gameArea[i][i]);
      dArr1.push(gameArea[2 - i][i]);
    }
    winArr.push(hArr0, hArr1, hArr2, vArr0, vArr1, vArr2, dArr0, dArr1);
    return winArr;
  };

  const checkWin = (checkWinArray, symbol) => {
    for (let i = 0; i < checkWinArray.length; i++) {
      const result = checkWinArray[i].filter((element) => element === symbol);
      if (result.length === 3) {
        return symbol;
      }
    }
  };

  const checkDraw = () => {
    return (
      gameArea.filter((row) => row.some((cell) => cell === "")).length === 0
    );
  };

  const clearGame = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameArea[i][j] = "";
      }
    }
    turnCounter[0] = "O";
    win = "";
    draw = false;
  };

  return {
    getGameArea,
    playO,
    playX,
    playTurn,
    clearGame,
    assignTurn,
    getTurnCounter,
    getWin,
    getDraw,
  };
})();

const newGame = document.querySelector("#new-game");

newGame.addEventListener("click", () => {
  gameboard.clearGame();
  gameMessage.style.color = "black";
  gameMessage.textContent = "O to start";
  setUpBoard();
});

const gameboardElement = document.querySelector("#game-board");

const setUpBoard = () => {
  gameboardElement.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const gameCell = document.createElement("div");
      gameCell.classList = "game-cell";
      gameCell.dataset.row = i;
      gameCell.dataset.column = j;
      gameboardElement.appendChild(gameCell);
    }
  }
  gameboardElement.style.backgroundColor = "white";
};

setUpBoard();

const gameMessage = document.querySelector("#game-message");

gameboardElement.addEventListener("click", (e) => {
  if (gameboard.getWin() !== "") {
    return;
  }
  const row = e.target.dataset.row;
  const column = e.target.dataset.column;
  const turn = gameboard.getTurnCounter();
  gameboard.playTurn(row, column);
  if (turn !== gameboard.getTurnCounter()) {
    e.target.textContent = turn;
    gameMessage.textContent = `${gameboard.getTurnCounter()}'s turn`;
  }
  if (gameboard.getWin() !== "") {
    gameMessage.style.color = "green";
    gameMessage.textContent = `${gameboard.getWin()} wins!`;
  }
  if (gameboard.getDraw()) {
    gameMessage.textContent = `It's a tie!`;
    gameboardElement.style.backgroundColor = "lightgrey";
  }
});
