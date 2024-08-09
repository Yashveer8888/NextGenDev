document.addEventListener('DOMContentLoaded', function () {
    const boardElement = document.getElementById('game-board');
    let board = ['', '', '', '', '', '', '', '', ''];
    const humanPlayer = 'O';
    const aiPlayer = 'X';
    let currentPlayer = humanPlayer;

    boardElement.addEventListener('click', function (e) {
        if (e.target.classList.contains('cell') && currentPlayer === humanPlayer) {
            const index = Array.from(boardElement.children).indexOf(e.target);
            if (board[index] === '') {
                makeMove(index, humanPlayer);
                if (!isGameOver(board)) {
                    currentPlayer = aiPlayer;
                    makeMove(findBestMove(), aiPlayer);
                    currentPlayer = humanPlayer;
                }
            }
        }
    });

    function initializeBoard() {
        boardElement.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            boardElement.appendChild(cell);
        }
    }

    function makeMove(index, player) {
        board[index] = player;
        boardElement.children[index].textContent = player;
    }

    function isGameOver(board) {
        return checkWin(board, humanPlayer) || checkWin(board, aiPlayer) || board.every(cell => cell !== '');
    }

    function checkWin(board, player) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]  // diagonals
        ];
        return winConditions.some(condition => 
            condition.every(index => board[index] === player)
        );
    }

    function findBestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = aiPlayer;
                let score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    function minimax(board, depth, isMaximizing) {
        if (checkWin(board, aiPlayer)) return 10 - depth;
        if (checkWin(board, humanPlayer)) return depth - 10;
        if (board.every(cell => cell !== '')) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = aiPlayer;
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = humanPlayer;
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    initializeBoard();
});
