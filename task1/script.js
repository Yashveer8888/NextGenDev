document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const checkWinner = () => {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        message.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return true;
      }
  
      const roundDraw = !boardState.includes('');
      if (roundDraw) {
        message.textContent = 'Game is a draw!';
        gameActive = false;
        return true;
      }
  
      return false;
    };
  
    const handleCellClick = (event) => {
      const clickedCell = event.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
  
      if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
      }
  
      boardState[clickedCellIndex] = currentPlayer;
      clickedCell.textContent = currentPlayer;
  
      if (checkWinner()) {
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `It's ${currentPlayer}'s turn`;
    };
  
    const handleRestartGame = () => {
      currentPlayer = 'X';
      gameActive = true;
      boardState = ['', '', '', '', '', '', '', '', ''];
      message.textContent = `It's ${currentPlayer}'s turn`;
      cells.forEach(cell => (cell.textContent = ''));
    };
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
  
    message.textContent = `It's ${currentPlayer}'s turn`;
  });
  