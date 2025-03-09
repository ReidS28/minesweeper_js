const game = new Minesweeper(5, 5, 0.4);
console.log(game.mines);
game.fillnumSurrounding();
console.log(game.numSurrounding);
