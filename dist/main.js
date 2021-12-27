(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const sF = require('../factories/shipFactory');

const cp = function() {
    const name = "Skynet";

    //create ships for cp
    const cPatrol = new sF('patrol');
    const cCurser = new sF('curser');
    const cSub = new sF('sub');
    const cBattleship = new sF('battleship');
    const cAdmiral = new sF('admiral');
    //put the ships in an array so it is easier to work with
    const cpShipArray = [];
    cpShipArray.push(cPatrol);
    cpShipArray.push(cCurser);
    cpShipArray.push(cSub);
    cpShipArray.push(cBattleship);
    cpShipArray.push(cAdmiral);



    const cpBoard = (function() {
        const gameBoard = [];
        const initialize = (function() {
            for (let i = 0; i < 100; i++) {
                gameBoard.push({
                    id: i,
                    isBeenShot: false
                });
            }
        })();

        const getRandom = function(max) {
            return Math.floor(Math.random() * max);
        }


        function randomAllocationOfShipsForComputer(ship) {
            let randomAxis = getRandom(2);
            let shipArrayLength
            if (randomAxis === 0) {
                shipArrayLength = [...Array(ship.length).keys()];
                randomAxis = 1
            } else {
                shipArrayLength = [...Array(ship.length).keys()];
                randomAxis = 10;
                shipArrayLength = shipArrayLength.map(x => x * randomAxis)
            };

            let randomStart = getRandom(gameBoard.length - (ship.length * randomAxis));

            //check if all cells are free 
            const isTaken = shipArrayLength.some(index => gameBoard[randomStart + index].shipObj);
            //check that you are not going to wrap around the grid
            let rowLength = 10;
            const isAtRightEdge = shipArrayLength.some(index => (randomStart + index) % rowLength === rowLength - 1)
            //or that you are not on the left edge
            const isAtLeftEdge = shipArrayLength.some(index => (randomStart + index) % rowLength === 0);

            if (!isTaken && !isAtLeftEdge && !isAtRightEdge) {
                for (let i = 0; i < ship.length; i++) {
                    gameBoard[randomStart + shipArrayLength[i]].shipObj = ship;
                }
            } else {
                randomAllocationOfShipsForComputer(ship)
            }
        };
        randomAllocationOfShipsForComputer(cpShipArray[4]);
        randomAllocationOfShipsForComputer(cpShipArray[3]);
        randomAllocationOfShipsForComputer(cpShipArray[2]);
        randomAllocationOfShipsForComputer(cpShipArray[1]);
        randomAllocationOfShipsForComputer(cpShipArray[0]);



        const attackIsBeenShot = function(cell) {
            if (gameBoard[cell].isBeenShot) {
                console.log(cell)
                return console.log("you cannot shoot in the same cell twice, player should repeat the option")
            } else {
                gameBoard[cell].isBeenShot = true;
                console.log(cell)
                if (gameBoard[cell].shipObj) {
                    let currentShip = gameBoard[cell].shipObj;
                    currentShip.hit(cell);
                }
                return cell
            }
        };

        //this is the random attack function form the computer
        let arrayOfIllegalMoves = [];

        const randomAttackEnemy = function(gb) {
            console.log(gb)
            let coord = getRandom(100);
            console.log(coord)
            if (arrayOfIllegalMoves.includes(coord)) {
                return randomAttackEnemy(gb)
            } else {
                arrayOfIllegalMoves.push(coord)
                return gb.attackIsBeenShot(coord)
            }
        }

        return {
            gameBoard: gameBoard,
            attackIsBeenShot: attackIsBeenShot,
            randomAttackEnemy: randomAttackEnemy
        }
    })();

    return {
        name: name,
        cpShipArray: cpShipArray,
        cpBoard: cpBoard,
    }
}

module.exports = cp
},{"../factories/shipFactory":4}],2:[function(require,module,exports){
const gameBoardFactory = function() {
    const gameBoard = [];
    const initialize = (function() {
        for (let i = 0; i < 100; i++) {
            gameBoard.push({
                id: i,
                isBeenShot: false
            });
        }
    })();

    const shipAllocation = function(ship, cell, axis) {
        switch (axis) {
            case "x":
                let rowLength = 10;
                let whichRowAmIIn = 1 + Math.floor(cell / rowLength);
                let maxCoordAvailable = (rowLength * whichRowAmIIn) - ship.length;
                if (cell > maxCoordAvailable) {
                    return "cannot place your ship here"
                } else {

                    let controlCells = [];
                    let lastCell = (cell + ship.length) - 1;
                    for (let i = cell; i <= lastCell; i++) {
                        controlCells.push(i)
                    }
                    const isEmpty = (currentValue) => this.gameBoard[currentValue].shipObj === undefined;
                    if (controlCells.every(isEmpty)) {
                        for (let i = 0; i < ship.length; i++) {
                            this.gameBoard[cell + i].shipObj = ship;
                        }
                        return (this.gameBoard)
                    } else {
                        return "cannot place 2 ships in the same spot"
                    }
                }
                break;
            case "y":
                let controlCells = [];
                let currentCell = cell;
                for (let i = 0; i < ship.length; i++) {
                    controlCells.push(currentCell)
                    currentCell += 10
                }

                const existenceCheck = (value) => this.gameBoard[value] ? true : false;
                if (!controlCells.every(existenceCheck)) {
                    return "cannot place your ship here";
                } else {
                    const isEmpty = (currentValue) => this.gameBoard[currentValue].shipObj === undefined;
                    if (controlCells.every(isEmpty)) {
                        let workingCell = cell;
                        for (let i = 0; i < ship.length; i++) {
                            this.gameBoard[workingCell].shipObj = ship
                            workingCell += 10;
                        }
                        return (this.gameBoard)
                    } else {
                        return "cannot place 2 ships in the same spot"
                    }
                }
                break;
        }
    };

    const attackIsBeenShot = function(cell) {
        gameBoard[cell].isBeenShot = true;
        if (gameBoard[cell].shipObj) {
            let currentShip = gameBoard[cell].shipObj;
            currentShip.hit(cell);
        }
        return cell
    };

    return {
        gameBoard: gameBoard,
        shipAllocation: shipAllocation,
        attackIsBeenShot: attackIsBeenShot,
    }
}

module.exports = gameBoardFactory
},{}],3:[function(require,module,exports){
const playerFactory = function(name){    
    return {
        name:name,
    }
}

module.exports = playerFactory

},{}],4:[function(require,module,exports){
const shipFactory = function(name) {
    let length
    switch (name) {
        case "patrol":
            length = 2;
            break;
        case "curser":
            length = 3;
            break;
        case "sub":
            length = 3;
            break;
        case "battleship":
            length = 4;
            break;
        case "admiral":
            length = 5;
            break;
    }

    const totalHits = [];

    const hit = function(arg) {
        totalHits.push(arg);
        return totalHits
    }

    const isSunk = function() {
        return ((totalHits.length == length) ? true : false)
    }

    return {
        name: name,
        length: length,
        totalHits: totalHits,
        hit: hit,
        isSunk: isSunk
    }
}

module.exports = shipFactory
},{}],5:[function(require,module,exports){
const cp = require("./computerPlayer/cp");
const playerFactory = require("./factories/playerFactory");
const gameBoardFactory = require("./factories/gameBoardFactory");
const shipFactory = require("./factories/shipFactory");


function gameOn(player1Obj) {

    console.log(player1Obj)
    //this is initialization
    const skynet = cp();

    //this is dom
    const grids = document.querySelector('#grids');
    const containerPlayer = document.querySelector('#containerPlayer');
    const containerComputer = document.createElement('div');
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
            let c = skynet.cpBoard.randomAttackEnemy(player1Obj.grid);
            setCSSAttributes(player1Obj.grid, c)
        }
    }
    play()


}

module.exports = gameOn
},{"./computerPlayer/cp":1,"./factories/gameBoardFactory":2,"./factories/playerFactory":3,"./factories/shipFactory":4}],6:[function(require,module,exports){
const startOfGame = require("./startOfGame");

startOfGame()

},{"./startOfGame":7}],7:[function(require,module,exports){
const playerFactory = require("./factories/playerFactory");
const gameBoardFactory = require("./factories/gameBoardFactory");
const shipFactory = require("./factories/shipFactory");
const gameOn = require("./gameOn");

function startOfGame() {

    const body = document.querySelector('body');

    const battleshipTitle = document.createElement('h1');
    battleshipTitle.innerHTML = "Battleship!";
    const enterYourName = document.createElement('h2');
    enterYourName.innerHTML = "Enter your name";
    const playerName = document.createElement('input');
    playerName.type = 'text';
    playerName.maxLength = 8;
    const startButton = document.createElement('button');
    startButton.innerHTML = 'Continue';
    const startGameButton = document.createElement('button');



    body.appendChild(battleshipTitle);
    body.appendChild(enterYourName);
    body.appendChild(playerName);
    body.appendChild(startButton)


    function playerCheck() {
        if (!playerName.value) {
            let errorMessage = document.createElement('p');
            errorMessage.id = "errorMessage";
            errorMessage.innerHTML = 'No name! Enter one to play';
            body.appendChild(errorMessage);
        } else {
            createPlayer()
        }
    }

    startButton.addEventListener('click', playerCheck);

    function createPlayer() {
        //removes everything that is not needed
        body.removeChild(battleshipTitle);
        body.removeChild(enterYourName);
        body.removeChild(startButton);
        let em = document.querySelectorAll('#errorMessage');
        em = Array.from(em);
        em.forEach(e => {
            body.removeChild(e)
        });


        //before removing the input grab the value and create player with grid
        let player1 = new playerFactory(playerName.value);
        body.removeChild(playerName);
        let player1Grid = new gameBoardFactory;

        const player1Obj = {
            player1: player1,
            grid: player1Grid,
        };

        return playerShipPlacement(player1Obj)
    }

    function playerShipPlacement(player1Obj) {
        const grids = document.createElement('div');
        grids.id = 'grids';
        const containerPlayer = document.createElement('div');
        containerPlayer.id = 'containerPlayer';
        const shipContainer = document.createElement('div');
        shipContainer.id = "shipContainer";
        grids.appendChild(containerPlayer);
        grids.appendChild(shipContainer)
        //create button for axis shift
        const axisButton = document.createElement('button');
        axisButton.classList.add("axisButton");
        axisButton.innerHTML = "X";
        axisButton.value = "x";
        body.appendChild(axisButton);
        body.appendChild(grids);

        //create grid in HTML
        let gameboardDOM = player1Obj.grid.gameBoard;
        for (let i = 0; i < gameboardDOM.length; i++) {
            let cell = gameboardDOM[i];
            let cellDiv = document.createElement('div');
            cellDiv.id = cell.id;
            cellDiv.classList.add('playerGridCell')
            containerPlayer.appendChild(cellDiv);
        }
        containerPlayer.style.gridTemplateColumns = "repeat(10, 1fr)";
        containerPlayer.style.gridTemplateRows = "repeat(10, 1fr)";

        let patrolForDrag = document.createElement('div');
        patrolForDrag.id = "patrol";
        patrolForDrag.classList.add("shipsDom")
        patrolForDrag.draggable = true;
        let curserForDrag = document.createElement('div');
        curserForDrag.id = "curser";
        curserForDrag.classList.add("shipsDom")
        curserForDrag.draggable = true;
        let subForDrag = document.createElement('div');
        subForDrag.id = "sub";
        subForDrag.classList.add("shipsDom")
        subForDrag.draggable = true;
        let battleshipForDrag = document.createElement('div');
        battleshipForDrag.id = "battleship";
        battleshipForDrag.classList.add("shipsDom")
        battleshipForDrag.draggable = true;
        let admiralForDrag = document.createElement('div');
        admiralForDrag.id = "admiral";
        admiralForDrag.classList.add("shipsDom")
        admiralForDrag.draggable = true;
        shipContainer.appendChild(patrolForDrag);
        shipContainer.appendChild(curserForDrag);
        shipContainer.appendChild(subForDrag);
        shipContainer.appendChild(battleshipForDrag);
        shipContainer.appendChild(admiralForDrag);

        //change axis
        axisButton.addEventListener('click', (e) => {
            if (e.target.value == "x") {
                e.target.value = "y";
                e.target.innerHTML = "Y";
                shipContainer.classList.add("shipContainer90")
            } else {
                e.target.value = "x";
                e.target.innerHTML = "X";
                shipContainer.classList.remove("shipContainer90")
            }
        });

        let myShipsDom = document.querySelectorAll('.shipsDom');
        myShipsDom.forEach(ship => ship.addEventListener('dragstart', function drag(e) {
            e.dataTransfer.setData("text", e.target.id)
        }));

        let gridCells = document.querySelectorAll('.playerGridCell');
        gridCells.forEach(cell => cell.addEventListener("dragover",
            function allowDrag(e) {
                e.preventDefault()
            }
        ));

        gridCells.forEach(cell => cell.addEventListener('drop',
            function drop(e) {
                e.preventDefault();
                let data = e.dataTransfer.getData('text');
                let currentShip = document.querySelector(`#${data}`);
                let ship = new shipFactory(data);
                let c = parseInt(e.path[0].id);
                if (typeof(player1Obj.grid.shipAllocation(ship, c, axisButton.value)) == "string") {
                    let errorMessage = document.createElement('p');
                    errorMessage.id = "errorMessage"
                    errorMessage.innerHTML = (player1Obj.grid.shipAllocation(ship, c, axisButton.value))
                    body.appendChild(errorMessage);
                } else {
                    shipContainer.removeChild(currentShip)
                    for (let i = 0; i < player1Obj.grid.gameBoard.length; i++) {
                        if (player1Obj.grid.gameBoard[i].shipObj) {
                            //where j is the id of the grid
                            let j = player1Obj.grid.gameBoard[i].id;
                            gridCells.forEach(cell => {
                                if(cell.id == j){
                                    cell.classList.add('playerShip')
                                }
                            })
                        }
                    }
                }
                checkEmptynessOfShipContainer()
            }
        ))

        const checkEmptynessOfShipContainer = function(){
            if ( shipContainer.hasChildNodes() == 0 ) {
                grids.removeChild(shipContainer);
                let em = document.querySelectorAll('#errorMessage');
                em = Array.from(em);
                em.forEach(e => {
                    body.removeChild(e)
                });
                startGameButton.id ="startGameButton";
                startGameButton.innerHTML ='Start Game'
                body.appendChild(startGameButton);
           }
        }
        startGameButton.addEventListener('click',()=>{
            console.log('let s begin')
            gameOn(player1Obj)
        })
    }
}

module.exports = startOfGame
},{"./factories/gameBoardFactory":2,"./factories/playerFactory":3,"./factories/shipFactory":4,"./gameOn":5}]},{},[6]);
