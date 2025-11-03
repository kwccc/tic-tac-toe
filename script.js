const gameboard = (function () {
  const gameArea = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getGameArea = () => gameArea;

  const playX = (row, column) => play(row, column, "X");

  const playO = (row, column) => play(row, column, "O");

  const play = (row, column, symbol) => {
    if (gameArea[row][column] === "") {
      gameArea[row][column] = symbol;
    } else {
      console.log("Cell is already populated!");
    }
    const checkWinArray = populateCheckWinArray();
    checkWin(gameArea, checkWinArray, symbol);
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

  const checkWin = (gameArea, checkWinArray, symbol) => {
    for (let i = 0; i < checkWinArray.length; i++) {
      const result = checkWinArray[i].filter((element) => element === symbol);
      if (result.length === 3) {
        console.log(`Win for ${symbol}!`);
      }
      console.log(result);
    }
  };

  return { getGameArea, playO, playX };
})();

function createPlayer(name) {
  const playerName = name;
}
