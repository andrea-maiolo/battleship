const cp = require("./computerPlayer/cp");
const playerFactory = require("./factories/playerFactory");
const gameBoardFactory = require("./factories/gameBoardFactory");
const shipFactory = require("./factories/shipFactory");


function gameOn() {

    //this is initialization
    const skynet = cp();

    //this is dom
    let grids = document.querySelector('#grids');
    let containerPlayer = document.querySelector('#containerPlayer');
    let containerComputer = document.createElement('div');
    containerComputer.id = 'containerComputer';
    grids.appendChild(containerComputer);

    //display computer's grid
    for (let i = 0; i < skynet.cpBoard.gameBoard.length; i++) {
        let cell = skynet.cpBoard.gameBoard[i];
        let cellDiv = document.createElement('div');
        //hide this later
        if (cell.shipObj) {
            cellDiv.classList.add("computerShip")
        }
        cellDiv.id = `c${cell.id}`;
        cellDiv.classList.add('computerGridCell')
        containerComputer.appendChild(cellDiv);
    }

    //making the grid a grid(if it makes sense)
    containerComputer.style.gridTemplateColumns = "repeat(10, 1fr)";
    containerComputer.style.gridTemplateRows = "repeat(10, 1fr)";

    const isGameOver = function() {
        const allSink = (value) => value == true;
        let a = andyBoard.gameBoard;
        let b = skynet.cpBoard.gameBoard;
        let temporaryArray1 = [];
        let temporaryArray2 = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i].shipObj) {
                temporaryArray1.push(a[i].shipObj.isSunk())
            }
        }
        for (let j = 0; j < b.length; j++) {
            if (b[j].shipObj) {
                temporaryArray2.push(b[j].shipObj.isSunk())
            }
        }
        if (temporaryArray1.every(allSink)) {
            alert('game is over')
            let body = document.querySelector('body');
            body.removeChild(grids);
            let h1 = document.createElement('h1');
            h1.innerHTML = "You lost!";
            body.appendChild(h1);
        } else if (temporaryArray2.every(allSink)) {
            alert('game is over')
            let body = document.querySelector('body');
            body.removeChild(grids);
            let h1 = document.createElement('h1');
            h1.innerHTML = "You won!";
            body.appendChild(h1);
        } else {
            return play()
        }
    }


    //this function set the property for the color of computer's grid
    const setCSSAttributes = function(grid, domCell) {
        let jsCell
        for (let i = 0; i < grid.gameBoard.length; i++) {
            jsCell = grid.gameBoard[domCell];
        }
        if (grid.randomAttackEnemy) {
            let gridCell = document.getElementById(`c${jsCell.id}`)
            if (jsCell.isBeenShot && (!jsCell.shipObj)) {
                gridCell.setAttribute("missed", 'missed');
            } else if (jsCell.isBeenShot && jsCell.shipObj.totalHits.length > 0) {
                gridCell.setAttribute("hit", "hit")
            }
        } else {
            let gridCell = document.getElementById(`p${jsCell.id}`)
            if (jsCell.isBeenShot && (!jsCell.shipObj)) {
                gridCell.setAttribute("missed", 'missed');
            } else if (jsCell.isBeenShot && jsCell.shipObj.totalHits.length > 0) {
                gridCell.setAttribute("hit", "hit")
            }
        }
        isGameOver()
    }

    let round = andy.name;

    const whoIsPlaying = function() {
        if (round == andy.name) {
            round = skynet.name;
            return round
        } else {
            round = andy.name;
            return round
        }
    }

    const play = function() {
        if (round == andy.name) {
            whoIsPlaying();
            console.log("my move")
            containerComputer.addEventListener('click', function(e) {
                let attackedCell = e.path[0].id;
                attackedCell = attackedCell.replace(/[a-z]/g, "");
                let a = skynet.cpBoard.attackIsBeenShot(attackedCell);
                setCSSAttributes(skynet.cpBoard, a)
            });
        } else {
            console.log("skynet's move")
            whoIsPlaying();
            let c = skynet.cpBoard.randomAttackEnemy(andyBoard);
            setCSSAttributes(andyBoard, c)
        }
    }
    play()


}

module.exports = gameOn