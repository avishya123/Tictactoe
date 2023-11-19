// Variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a]; // Return the winner (X or O)
    }
  }

  if (!gameBoard.includes('')) {
    return 'draw'; // If the board is full and no winner, it's a draw
  }

  return null; // No winner yet
}

// Function to handle cell click
function cellClick(index) {
  if (!gameBoard[index] && gameActive) {
    gameBoard[index] = currentPlayer;
    renderBoard();
    
    const winner = checkWinner();
    if (winner) {
      if (winner === 'draw') {
        document.getElementById('result').innerText = "It's a draw!";
      } else {
        document.getElementById('result').innerText = `Player ${winner} wins!`;
      }
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.getElementById('result').innerText = '';
  renderBoard();
}

// Function to render the game board
function renderBoard() {
  const boardElement = document.getElementById('board');
  boardElement.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const cellElement = document.createElement('div');
    cellElement.className = 'cell';
    cellElement.innerText = gameBoard[i];
    cellElement.addEventListener('click', () => cellClick(i));
    boardElement.appendChild(cellElement);
  }
}
// Initial render
renderBoard();
