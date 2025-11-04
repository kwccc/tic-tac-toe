const gameboard = (function () {
  const gameArea = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getGameArea = () => gameArea;

  const playTurn = (row, column) => {
    if (turnCounter[0] === "") {
      console.log("Choose your symbol!");
    } else {
      play(row, column, turnCounter[0]);
    }
  };

  const playX = (row, column) => play(row, column, "X");

  const playO = (row, column) => play(row, column, "O");

  const play = (row, column, symbol) => {
    if (gameArea[row][column] === "") {
      gameArea[row][column] = symbol;
      const checkWinArray = populateCheckWinArray();
      checkWin(checkWinArray, symbol);
      changeTurn();
    } else {
      console.log("Cell is already populated!");
    }
  };

  const turnCounter = [""];

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
    for (let i = 0; i <= 2; i++) {
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
        console.log(`Win for ${symbol}!`);
      }
      console.log(result);
    }
  };

  const checkDraw = (gameArea) => {
    // Add function to check if the game is a draw
    // Maybe check if no elements in gameArea are empty ""
  };

  const clearGame = () => {
    for (let i = 0; i <= 2; i++) {
      for (let j = 0; j <= 2; j++) {
        gameArea[i][j] = "";
      }
    }
    turnCounter[0] = "";
  };

  return {
    getGameArea,
    playO,
    playX,
    playTurn,
    clearGame,
    assignTurn,
    getTurnCounter,
  };
})();

const assignTurn = document.querySelector("#assign-turn");

assignTurn.addEventListener("click", () => {
  const symbol = prompt(`Please choose "O" or "X"`);
  gameboard.assignTurn(symbol);
});

gameboard.assignTurn("O"); // Debug
