let boxs = document.querySelectorAll(".box")
let statusText = document.getElementById("status")
let restart = document.getElementById("restart")
let x = "<img src='./images/x.jpeg' >"
let o = "<img src='./images/o.jpeg' >"

let win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = x
let player = "X"
let isActive = false

// x.innerHTML.classList.add('logo')

initialize()

function initialize() {
    boxs.forEach(box => box.addEventListener("click", boxClick))
    isActive = true
    restart.addEventListener("click", resartGame)
    statusText.textContent = `${player} is your turn`
}

function boxClick() {
    let index = this.dataset.index
    if (!options || !isActive) {
        return
    } else {
        updateBox(this, index)
        checkWinner()
    }

}

function updateBox(box, index) {
    options[index] = player
    box.innerHTML = currentPlayer

}

function checkWinner() {
    let isWon = false
    for (let i = 0; i < win.length; i++) {
        let condition = win[0]
        let box1 = options[condition[0]]
        let box2 = options[condition[1]]
        let box3 = options[condition[2]]

        if (box1 == "" && box2 == "" && box3 == "") {
            continue;
        }

        if (box1 == box2 && box2 == box3) {
            isWon = true
            boxs = [condition[0]].classList.add('win')
            boxs = [condition[1]].classList.add('win')
            boxs = [condition[2]].classList.add('win')
        }
    }
    if (isWon) {
        statusText.textContent = `${player} is won`
        isActive = false
    } else if (!options.includes("")) {
        statusText.textContent = "The match is draw"
        isActive = false

    } else {
        changePlayer()
    }


}

function resartGame() {
    options = ["", "", "", "", "", "", "", "", ""]
    currentPlayer = x
    player = "X"
    isActive = true
    boxs.forEach(box => {
        box.innerHTML = ""
    })

}
function changePlayer() {
    player = (player == "X") ? "O" : "X"
    currentPlayer = (currentPlayer == x) ? o : x
    statusText.textContent = `${player} is your turn`
}