const sudokuBoard: number[][] = [];

for (let i = 0; i < 9; i++) {
  sudokuBoard[i] = Array(9).fill(0);
}

sudokuBoard[0][0] = 5;
sudokuBoard[0][1] = 3;
sudokuBoard[0][4] = 7;

sudokuBoard[1][0] = 6;
sudokuBoard[1][3] = 1;
sudokuBoard[1][4] = 9;
sudokuBoard[1][5] = 5;

sudokuBoard[2][1] = 9;
sudokuBoard[2][2] = 8;
sudokuBoard[2][7] = 6;

sudokuBoard[3][0] = 8;
sudokuBoard[3][4] = 6;
sudokuBoard[3][8] = 3;

sudokuBoard[4][0] = 4;
sudokuBoard[4][3] = 8;
sudokuBoard[4][5] = 3;
sudokuBoard[4][8] = 1;

sudokuBoard[5][0] = 7;
sudokuBoard[5][4] = 2;
sudokuBoard[5][8] = 6;

sudokuBoard[6][1] = 6;
sudokuBoard[6][6] = 2;
sudokuBoard[6][7] = 8;

sudokuBoard[7][3] = 4;
sudokuBoard[7][4] = 1;
sudokuBoard[7][5] = 9;
sudokuBoard[7][8] = 5;

sudokuBoard[8][4] = 8;
sudokuBoard[8][7] = 7;
sudokuBoard[8][8] = 9;

function printSudoku(sudokuBoard: number[][]) {
  for (let i = 0; i < 9; i++) {
    if (i % 3 == 0) {
      console.log('├───────♡───────♡───────┤');
    }
    for (let j = 0; j < 9; j++) {
      if (j % 3 == 0) {
        process.stdout.write('│ ');
      }
      process.stdout.write(`${sudokuBoard[i][j]} `);
    }
    process.stdout.write('│ ');
    console.log();
  }
  console.log('├───────♡───────♡───────┤');
}

printSudoku(sudokuBoard);

function pSudoku(sudokuBoard: number[][], i: number, j: number) {
  if (j == 9) {
    i++;
    j = 0;
  }
  if (i == 9) return;
  console.log(sudokuBoard[i][j]);
  pSudoku(sudokuBoard, i, j + 1);
}

function solveSudoku(sudokuBoard: number[][], i: number, j: number) {
  process.stdout.write('\x1Bc');
  printSudoku(sudokuBoard);
  if (j == 9) {
    i++;
    j = 0;
  }
  if (i == 9) return true;

  if (sudokuBoard[i][j] != 0) return solveSudoku(sudokuBoard, i, j + 1);

  for (let num = 1; num <= 9; num++) {
    if (validateNumber(sudokuBoard, i, j, num) == false) continue;
    sudokuBoard[i][j] = num;
    if (solveSudoku(sudokuBoard, i, j + 1) == true) return true;
    sudokuBoard[i][j] = 0;
  }
  return false;
}

solveSudoku(sudokuBoard, 0, 0);
printSudoku(sudokuBoard);

function validateNumber(
  sudokuBoard: number[][],
  i: number,
  j: number,
  num: number,
) {
  if (sudokuBoard[i].includes(num)) return false;

  for (let x = 0; x < 9; x++) {
    if (sudokuBoard[x][j] == num) return false;
  }

  const cellX = Math.floor(i / 3);
  const cellY = Math.floor(j / 3);

  for (let x = cellX * 3; x < cellX * 3 + 3; x++) {
    for (let y = cellY * 3; y < cellY * 3 + 3; y++) {
      if (sudokuBoard[x][y] == num) return false;
    }
  }
  return true;
}
