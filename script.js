function gameboard() {
  const gameArea = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const getGameArea = () => gameArea;

  const playX = (row, column) => {
    gameArea[row][column] = "X";
    console.log(getGameArea());
  };

  const playO = (row, column) => {
    gameArea[row][column] = "O";
    console.log(getGameArea());
  };

  return { getGameArea, playO, playX };
}

const board = (function () {
  const gameArea = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const getGameArea = () => gameArea

  const playX = (row, column) => {
    gameArea[row][column] = "X";
    console.log(getGameArea());
  };

  const playO = (row, column) => {
    gameArea[row][column] = "O";
    console.log(getGameArea());
  };

  return { getGameArea, playO, playX };
})();


