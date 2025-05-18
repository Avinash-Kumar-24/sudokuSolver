function solveSudoku(board) {
    solve(board);
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '.') {
                for (let c = 1; c <= 9; c++) {
                    const char = c.toString();
                    if (isValid(board, row, col, char)) {
                        board[row][col] = char;

                        if (solve(board)) return true;

                        board[row][col] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, char) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === char || board[i][col] === char ||
            board[3 * Math.floor(row / 3) + Math.floor(i / 3)]
                 [3 * Math.floor(col / 3) + i % 3] === char) {
            return false;
        }
    }
    return true;
}
function resetBoard(){
    const inputs = document.querySelectorAll("#sudoku-board input");
    inputs.forEach(input => {input.value ='';});
}
function handleSolve() {
    const inputs = document.querySelectorAll("#sudoku-board input");
    const board = Array.from({ length: 9 }, () => Array(9).fill('.'));

    inputs.forEach((input, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const val = input.value;
        if (val >= '1' && val <= '9') {
            board[row][col] = val;
        }
    });

    if (solveSudoku(board) !== false) {
        inputs.forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            input.value = board[row][col];
        });
    } else {
        alert("No solution found.");
    }
}

// On page load: create the input grid
window.onload = function() {
    const board = document.getElementById("sudoku-board");
    for (let i = 0; i < 81; i++) {
        const input = document.createElement("input");
        input.setAttribute("maxlength", "1");
        input.setAttribute("type", "text");
        board.appendChild(input);
    }
};
