/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//const WIDTH = 7;
//const HEIGHT = 6;

//let currPlayer = 1; // active player: 1 or 2
//let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */


class Game{
  constructor(width, height, player1, player2){
    this.players = [player1, player2];
    this.width = width;
    this.height = height;
    this.currPlayer = this.players[0];
    this.board = [];
    //this.gameClick = ""; //event handler goes here
    this.gameOver = false;

    this.makeBoard();
    this.makeHtmlBoard();

    /*
    const startButton = document.querySelector("button")
    
    startButton.addEventListener("click",() => {
      console.log("clicked start game");
      this.board = [];
    })*/

  }

  
  makeBoard(){
    const {width, height, board} = this;
    for (let y = 0; y < height; y++) {
      board.push(Array.from({ length: width }));
    }
  }

  makeHtmlBoard(){
    const board = document.getElementById('board');
    const {width, height} = this;
    //let {gameClick} = this;
    
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');

    this.gameClick = this.handleClick.bind(this);
    top.addEventListener('click', this.gameClick);


    for (let x = 0; x < width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    // make main part of board
    for (let y = 0; y < height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x){
    const {board, height} = this;

    for (let y = height - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    }
    return null;
  }

  swapPlayerTurn(){
    [this.players[1],this.players[0]] = [this.players[0],this.players[1]];
    this.currPlayer = this.players[0];
    console.log(this.currPlayer);
  }

  placeInTable(y, x){
    const currPlayer = this.currPlayer;

    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer.color}`);
    piece.style.top = -50 * (y + 2);
    piece.style.backgroundColor = currPlayer.color;

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
    //this.swapPlayerTurn();
  }

  endGame(msg){
    alert(msg);
    const {gameClick} = this;
    const top = document.querySelector("#column-top");
    top.removeEventListener("click", gameClick);

  }

  handleClick(evt){
    console.log("clicked");
    const {board} = this;
    let {currPlayer} = this;

    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    board[y][x] = currPlayer;
    this.placeInTable(y, x);
    
    // check for win
    if (this.checkForWin()) {
      this.gameOver = true;
      return this.endGame(`Player ${currPlayer.color} won!`);
    }
    
    // check for tie
    if (board.every(row => row.every(cell => cell))) {
      this.gameOver = true;
      return this.endGame('Tie!');
    }
      
    // switch players
    this.swapPlayerTurn();
    //currPlayer = currPlayer === 1 ? 2 : 1;
  }

  checkForWin() {
    const {board, width, height,currPlayer} = this;

    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < height &&
          x >= 0 &&
          x < width &&
          board[y][x] === currPlayer
      );
    }
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }


} //end of game class


class Player{
  constructor(color){
    this.color = color;

  }
}

function validateColor(color){
  const hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]; 
  
  if ((color.indexOf("#") === 0 && color.length === 7)){
    const colorChars = color.split("");
    colorChars.shift();
    const validateHex = colorChars.every((char) => {
      char.toLowerCase();
      const validateMatch = hexValues.some((hex) => {
        return char === hex;
      })

      return validateMatch;

    })
  return validateHex;
  } 
  
  const style = new Option().style;
  style.color = color;

  if(style.color === "") return false;

  return style.color === color;
}

const startButton = document.querySelector("button")
   
    //const player1 = new Player()
startButton.addEventListener("click",() => {
    const player1Color = document.getElementById("color-input-player1").value;
    const player2Color = document.getElementById("color-input-player2").value;
    
    if(!(validateColor(player1Color) && validateColor(player2Color))){
      alert("Input valid colors");
      return;
    }

    document.getElementById("board").innerHTML = "" //clear the board

    const player1 = new Player(player1Color);
    const player2 = new Player(player2Color);

    let game = new Game(6, 7, player1, player2);
})