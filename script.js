const boardSize = 15;
let currentPlayer = 'black';
const board = [];

function initializeBoard() {
  const boardElement = document.getElementById('board');
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.addEventListener('click', () => makeMove(i, j));
      boardElement.appendChild(cell);
      board[i][j] = null;
    }
  }
}

function makeMove(row, col) {
  if (board[row][col] !== null) return;

  const cell = document.querySelector(`#board > div:nth-child(${row * boardSize + col + 1})`);
  cell.classList.add(currentPlayer);
  board[row][col] = currentPlayer;

  if (checkWin(row, col)) {
    alert(`${currentPlayer === 'black' ? '黑棋' : '白棋'}赢了！`);
    resetGame();
    return;
  }

  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
}

function checkWin(row, col) {
  const directions = [
    [ [0, 1], [0, -1] ], // 水平
    [ [1, 0], [-1, 0] ], // 垂直
    [ [1, 1], [-1, -1] ], // 正对角线
    [ [1, -1], [-1, 1] ]  // 反对角线
  ];

  const checkDirection = (dx, dy) => {
    let count = 0;
    let x = row + dx;
    let y = col + dy;
    while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === currentPlayer) {
      count++;
      x += dx;
      y += dy;
    }
    return count;
  };

  for (const [forward, backward] of directions) {
    const total = 1 + checkDirection(...forward) + checkDirection(...backward);
    if (total >= 5) return true;
  }
  return false;
}

function resetGame() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.classList.remove('black', 'white');
  });
  board.forEach(row => row.fill(null));
  currentPlayer = 'black';
}

initializeBoard();