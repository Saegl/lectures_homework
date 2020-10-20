/*
0 = Empty cell
1 = X
2 = O
*/
let cellValues = [
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

function checkWin(side) {
    for (let i = 0; i < winPos.length; i++) {
        x = winPos[i][0];
        y = winPos[i][1];
        z = winPos[i][2];

        if (cellValues[x] == side && cellValues[y] == side && cellValues[z] == side) {
            cells[x].style.backgroundColor = "lightcoral";
            cells[y].style.backgroundColor = "lightcoral";
            cells[z].style.backgroundColor = "lightcoral";
            gameEnded = true;
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

function updateMove() {
    if (checkWin(1)) {
        move.innerHTML = "X is win ";
        addReloadButton(move);
        return;
    }
    if (checkWin(2)) {
        move.innerHTML = "O is win ";
        addReloadButton(move);
        return;
    }

    if (side2move) {
        move.innerHTML = "X to move";
    } else {
        move.innerHTML = "O to move";
    }
}

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', event => {
        moveCount++;
        if (gameEnded || cells[i].innerHTML != "") {
            return;
        }
        if (side2move) {
            cells[i].innerHTML = "X";
            cellValues[i] = 1;
            side2move = false;
        } else {
            cells[i].innerHTML = "O";
            cellValues[i] = 2;
            side2move = true;
        }
        if (moveCount >= 9) {
            move.innerHTML = "draw ";
            addReloadButton(move);
            return;
        }
        updateMove();
    });
}
