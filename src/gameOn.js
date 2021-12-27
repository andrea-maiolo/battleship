const cp = require("./computerPlayer/cp");

function gameOn(player1Obj) {

    //this is initialization
    const skynet = cp();

    //this is dom
    const shipPlacementStage = document.querySelector('#shipPlacementStage');
    const startGameButton= document.querySelector('#startGameButton');
    shipPlacementStage.removeChild(startGameButton)
    const containerComputer = document.createElement('div');
    containerComputer.id = 'containerComputer';
    shipPlacementStage.appendChild(containerComputer);

    //display computer's grid
    for (let i = 0; i < skynet.cpBoard.gameBoard.length; i++) {
        let cell = skynet.cpBoard.gameBoard[i];
        let cellDiv = document.createElement('div');
        cellDiv.id = `c${cell.id}`;
        cellDiv.classList.add('computerGridCell')
        containerComputer.appendChild(cellDiv);
    }

    //making the grid a grid(if it makes sense)
    containerComputer.style.gridTemplateColumns = "repeat(10, 1fr)";
    containerComputer.style.gridTemplateRows = "repeat(10, 1fr)";

    const isGameOver = function() {
        const allSink = (value) => value == true;
        let a = player1Obj.grid.gameBoard;
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
            let body = document.querySelector('body');
            body.removeChild(shipPlacementStage);
            let h1 = document.createElement('h1');
            h1.id='finalMessage';
            h1.innerHTML = "You lost!";
            let replay = document.createElement('button');
            replay.innerHTML='Replay';
            replay.classList.add('replayButton');
            body.appendChild(h1);
            body.appendChild(replay);
            replay.addEventListener('click',()=>{
                location.reload()
            })
        } else if (temporaryArray2.every(allSink)) {
            let body = document.querySelector('body');
            body.removeChild(shipPlacementStage);
            let h1 = document.createElement('h1');
            h1.id='finalMessage';
            h1.innerHTML = "You won!";
            let replay = document.createElement('button');
            replay.innerHTML='Replay';
            replay.classList.add('replayButton');
            body.appendChild(h1);
            body.appendChild(replay);
            replay.addEventListener('click',()=>{
                location.reload()
            })
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
            let gridCell = document.getElementById(jsCell.id)
            if (jsCell.isBeenShot && (!jsCell.shipObj)) {
                gridCell.setAttribute("missed", 'missed');
            } else if (jsCell.isBeenShot && jsCell.shipObj.totalHits.length > 0) {
                gridCell.setAttribute("hit", "hit")
            }
        }
        isGameOver()
    }

    let round = player1Obj.name;

    const whoIsPlaying = function() {
        if (round == player1Obj.name) {
            round = skynet.name;
            return round
        } else {
            round = player1Obj.name;
            return round
        }
    }

    const play = function() {
        if (round == player1Obj.name) {
            whoIsPlaying();
            containerComputer.addEventListener('click', function(e) {
                let attackedCell = e.path[0].id;
                attackedCell = attackedCell.replace(/[a-z]/g, "");
                let a = skynet.cpBoard.attackIsBeenShot(attackedCell);
                setCSSAttributes(skynet.cpBoard, a)
            });
        } else {
            whoIsPlaying();
            let c = skynet.cpBoard.randomAttackEnemy(player1Obj.grid);
            setCSSAttributes(player1Obj.grid, c)
        }
    }
    play()

}

module.exports = gameOn