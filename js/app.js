const board = document.querySelector(".board"),
      wrapper = document.querySelector(".wrapper"),
      cells = Array.from(document.querySelectorAll(".cell")),
      [btnReload, btnPlayerOne, btnPlayerTwo] = document.querySelectorAll(".btn");
      winCombas = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

// CONFIG GAME
let symbolComputer = "O",
    symbolPlayer   = "X",
    initialCells   = [],
    message        = null;

isBeginGame();

// Main funciton. Here the steps of the opponents take place
function onClickBoard(event) {
    let current = event.target.closest(".cell");
    
    if (!current) return;

    if (!current.innerHTML) {
        current.innerHTML = symbolPlayer;
        initialCells.splice(initialCells.indexOf(+current.id), 1);

        if (initialCells.length) moveComputer();

        isCheckWin();
    }
}

function reloadGame() {
    isBeginGame();
}

//  Pre-game setup
function isBeginGame() {
    initialCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    cells.forEach(item => item.innerHTML = "");
    board.addEventListener("click", onClickBoard);
    if (message) message.remove();
}

// Step compputer
function moveComputer() {
    const random = Math.floor(Math.random() * initialCells.length);
    cells[initialCells[random]].innerHTML = symbolComputer;
    initialCells.splice(random, 1);
}

// Happen when the cells are over or one of the combinations is true
function gameOver(total) {
    let result = "draw";
    if (total == symbolComputer) result = "win computer";
    else if (total == symbolPlayer) result = "win player";

    board.removeEventListener("click", onClickBoard);
    createMessageTotal(result);
}

function createMessageTotal(text) {
    message = document.createElement("div");
    message.className = "message__total";
    message.innerHTML = text;
    console.log(text);
    wrapper.append(message);
}

// TODO: Refact
// Iterates over all combinations until it finds the true one
function isCheckWin() {
 for (let i = 0; i < winCombas.length; i++) {
        let prev, isCheck = true;
        for (let item of winCombas[i]) {
            let current = cells[item].innerHTML;
            if (!current) {
                isCheck = false;
                break;
            }
            if (!prev) {
                prev = current;
            } else if (prev != current) {
                isCheck = false;
                break;
            }
        }
        if (isCheck) {
            gameOver(prev);
            return;
        }
    }
    if (!initialCells.length) {
            gameOver();
            return;
        } 
}


btnReload.addEventListener("click", reloadGame);