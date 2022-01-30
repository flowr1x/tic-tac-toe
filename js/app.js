const board = document.querySelector(".board"),
      cells = Array.from(document.querySelectorAll(".cell")),
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

let symbolComputer = "O",
    symbolPlayer = "X",
    originArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function onClickBoard(event) {
    let current = event.target.closest(".cell");
    
    if (!current) return;

    if (!current.innerHTML) {
        current.innerHTML = symbolPlayer;
        originArray.splice(originArray.indexOf(+current.id), 1);
        moveComputer();
    }

    console.log(isCheckWin());
}

function moveComputer() {
    const random = Math.floor(Math.random() * originArray.length);
    cells[originArray[random]].innerHTML = symbolComputer;
    originArray.splice(random, 1);
}

// TODO: Refact
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
            cells.forEach(item => item.innerHTML = "");
            originArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            return;
        }
    }
}
 
board.addEventListener("click", onClickBoard);