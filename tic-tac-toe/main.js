"user strict";

let mode = 0;
const aiMode = 0;
const twoPlayerMode = 1;
let btnmode = document.getElementById("dropbtn");

function reload() {
    if (moveCount == 0) return;
    moveCount = 0;
    cellValues = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0,
    ];
    move.innerHTML = "X to move";
    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = '';
    }
}

function aimode() {
    mode = aiMode;
    btnmode.innerHTML = 'Play against AI';
    reload();
}

function twoplayersmode() {
    mode = twoPlayerMode;
    btnmode.innerHTML = 'Two players game';
    reload();
}

let cellValues = [
    /*
    0 = Empty cell
    1 = X
    -1 = O
    */
    0, 0, 0,
    0, 0, 0,
    0, 0, 0,
];

let cells = document.getElementsByClassName("cell");
let move = document.getElementById("move");

/* true if X to move, false if O to move */
let side2move = true;
let gameEnded = false;
let moveCount = 0;

let winPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
]

function checkWin(board, side) {
    for (let i = 0; i < winPos.length; i++) {
        x = winPos[i][0];
        y = winPos[i][1];
        z = winPos[i][2];

        if (board[x] == side && board[y] == side && board[z] == side) {
            // cells[x].style.backgroundColor = "lightcoral";
            // cells[y].style.backgroundColor = "lightcoral";
            // cells[z].style.backgroundColor = "lightcoral";
            // gameEnded = true;
            return true;
        };
    }
    return false;
}

function addReloadButton(move) {
    let a = document.createElement("a");
    a.href = "";
    a.onclick = "window.location.reload(true)";
    a.text = "reload";
    move.appendChild(a);
}

function updateLabel() {
    if (checkWin(cellValues, 1)) {
        move.innerHTML = "X is win ";
        addReloadButton(move);
        return;
    }
    if (checkWin(cellValues, -1)) {
        move.innerHTML = "O is win ";
        addReloadButton(move);
        return;
    }

    if (moveCount == 9) {
        move.innerHTML = "draw";
        return;
    }

    if (side2move) {
        move.innerHTML = "X to move";
    } else {
        move.innerHTML = "O to move";
    }
}

function randrange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function availableMoves() {
    let moves = [];
    for (let i = 0; i < cellValues.length; i++) {
        if (cellValues[i] == 0) {
            moves.push(i)
        }
    }
    return moves;
}

function isGameEnded(board) {
    return checkWin(board, 1) || checkWin(board, -1);
}

function boardeval(board) {
    if (checkWin(board, 1)) return 1;
    if (checkWin(board, -1)) return -1;
    return 0;
}

function times(s, x) {
    let resp = "";
    for (let i = 0; i < x; i++) {
        resp += s;
    }
    return resp;
}

function maxi(board, depth) {
    if (depth > 1) {
        return 0;
    }
    if (isGameEnded(board)) {
        return boardeval(board);
    }
    let legalmoves = availableMoves(board);
    let bestmove = -10;

    for (let i = 0; i < legalmoves.length; i++) {
        let move = legalmoves[i];
        board[move] = 1; // Make move
        bestmove = Math.max(bestmove, mini(board, depth + 1));
        board[move] = 0; // Unmake move
    }
    return bestmove;
}

function mini(board, depth) {
    if (depth > 1) {
        return 0;
    }
    if (isGameEnded(board)) {
        return boardeval(board);
    }
    let legalmoves = availableMoves(board)
    let bestmove = 10;

    for (let i = 0; i < legalmoves.length; i++) {
        let move = legalmoves[i];
        board[move] = -1; // Make move
        bestmove = Math.min(bestmove, maxi(board, depth + 1));
        board[move] = 0; // Unmake move
    }
    return bestmove;
}

function aimakemove(movenumber) {
    console.log("AI called");
    let legalmoves = availableMoves();

    let bestmovepos = -1;
    let besteval = 1000;

    for (let j = 0; j < legalmoves.length; j++) {
        let move = legalmoves[j];

        cellValues[move] = -1;
        let neweval = maxi(cellValues, 0);
        cellValues[move] = 0;

        if (neweval <= besteval) {
            besteval = neweval;
            bestmovepos = move;
        }
    }

    console.log("engine move " + bestmovepos + " position evaluation: " + besteval);
    cells[bestmovepos].innerHTML = "O";
    cellValues[bestmovepos] = -1;
    side2move = true;
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', event => {
        console.log('Button called');
        console.log(moveCount);
        moveCount++;
        gameEnded = checkWin(board, 1) || checkWin(board, 1) || moveCount > 9;
        if (gameEnded || cells[i].innerHTML != "") {
            return;
        }

        if (side2move) {
            cells[i].innerHTML = "X";
            cellValues[i] = 1;
            side2move = false;
        } else {
            cells[i].innerHTML = "O";
            cellValues[i] = -1;
            side2move = true;
        }
        updateLabel();

        if (mode == aiMode && !gameEnded) {
            aimakemove(moveCount);
            moveCount++;
        }

        
        updateLabel();
    });
}
