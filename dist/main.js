(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const sF = require('../factories/shipFactory');

const cp = function(){
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



    const cpBoard = (function(){
        const gameBoard=[];
        const initialize = (function(){
            for(let i=0; i<100;i++){
                gameBoard.push({id:i, isBeenShot:false});
            }
        })();

        const getRandom = function(max){
            return Math.floor(Math.random() * max);
        }


        function randomAllocationOfShipsForComputer(ship){
            let randomAxis = getRandom(2);
            let shipArrayLength
                if(randomAxis === 0){
                    shipArrayLength = [...Array(ship.length).keys()];
                    randomAxis = 1
                }else{
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

            if(!isTaken && !isAtLeftEdge && !isAtRightEdge){
                for(let i=0; i<ship.length; i++){
                    gameBoard[randomStart + shipArrayLength[i]].shipObj = ship;
                }
            }else{
                randomAllocationOfShipsForComputer(ship)
            }
        };
        randomAllocationOfShipsForComputer(cpShipArray[4]);
        randomAllocationOfShipsForComputer(cpShipArray[3]);
        randomAllocationOfShipsForComputer(cpShipArray[2]);
        randomAllocationOfShipsForComputer(cpShipArray[1]);
        randomAllocationOfShipsForComputer(cpShipArray[0]);

        
       
    const attackIsBeenShot = function(cell){
        if(gameBoard[cell].isBeenShot){
            console.log(cell)
            return console.log("you cannot shoot in the same cell twice, player should repeat the option")
        }else{
            gameBoard[cell].isBeenShot = true;
            console.log(cell)
            if(gameBoard[cell].shipObj){
                let currentShip =  gameBoard[cell].shipObj;
                currentShip.hit(cell);
            }
            return cell
        }
    };

        //this is the random attack function form the computer
            let arrayOfIllegalMoves=[]; 
        
            const randomAttackEnemy = function(gb){
                let coord = getRandom(100);
                console.log(coord)
                if(arrayOfIllegalMoves.includes(coord)){
                   return randomAttackEnemy(gb)
                }else{
                    arrayOfIllegalMoves.push(coord)
                    return gb.attackIsBeenShot(coord)
                }
            }

        return {
            gameBoard:gameBoard,
            attackIsBeenShot:attackIsBeenShot,
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
const gameBoardFactory = function(){
    const gameBoard=[];
    const initialize = (function(){
        for(let i=0; i<100;i++){
            gameBoard.push({id:i, isBeenShot:false});
        }
    })();

    const shipAllocation = function(ship,cell,axis){
        switch (axis) {
            case "x":
                let rowLength = 10;
                let whichRowAmIIn = 1 +  Math.floor(cell / rowLength);
                let maxCoordAvailable = (rowLength*whichRowAmIIn) - ship.length;
                if(cell > maxCoordAvailable){
                    return "cannot place your ship here"
                }else{

                    let controlCells =[];
                    let lastCell = (cell + ship.length) - 1;
                    for (let i= cell; i<= lastCell; i++) {
                        controlCells.push(i)
                    }
                    const isEmpty = (currentValue) => this.gameBoard[currentValue].shipObj === undefined;
                    if(controlCells.every(isEmpty)){
                        for(let i=0; i<ship.length; i++){
                            this.gameBoard[cell+i].shipObj = ship;
                        }
                        console.log(this.gameBoard)
                    }else{
                        return "cannot place 2 ships in the same spot"
                    }
                }
                break;
            case "y":
                let controlCells =[];
                let currentCell = cell;
                for (let i= 0; i<ship.length; i++) {
                    controlCells.push(currentCell)
                    currentCell += 10
                }

                const existenceCheck = (value) => this.gameBoard[value] ? true : false;
                if(!controlCells.every(existenceCheck)){
                    return "cannot place your ship here";
                }else{
                    const isEmpty = (currentValue) => this.gameBoard[currentValue].shipObj === undefined;
                    if(controlCells.every(isEmpty)){
                        let workingCell = cell;
                        for(let i=0; i<ship.length; i++){
                            this.gameBoard[workingCell].shipObj = ship
                            workingCell +=10;
                        }
                    }else{
                        return "cannot place 2 ships in the same spot"
                    }
                }
                break;
        }
    };

    const attackIsBeenShot = function(cell){
            gameBoard[cell].isBeenShot = true;
            if(gameBoard[cell].shipObj){
                let currentShip =  gameBoard[cell].shipObj;
                currentShip.hit(cell);
            }
            return cell
    };

    return {
        gameBoard:gameBoard,
        shipAllocation:shipAllocation,
        attackIsBeenShot:attackIsBeenShot,
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
const shipFactory = function (name){
    let length
    switch (name) {
        case "patrol":
           length = 2; 
            break;
        case "curser":
            length = 3;
            break;
        case "sub":
            length=3;
            break;
        case "battleship":
            length=4;
            break;
        case "admiral":
            length=5;
            break;
    }

    const totalHits =[];

    const hit = function(arg){       
        totalHits.push(arg);
        return totalHits
    }

    const isSunk = function(){
        return ((totalHits.length == length)? true : false)
    }

    return {
        name: name,
        length:length,
        totalHits:totalHits,
        hit: hit,
        isSunk:isSunk
    }
}

module.exports  = shipFactory


},{}],5:[function(require,module,exports){
const cp= require ("./computerPlayer/cp");
const playerFactory =  require("./factories/playerFactory");
const gameBoardFactory =require("./factories/gameBoardFactory");
const shipFactory = require("./factories/shipFactory");


function gameOn(){

    //this is initialization
    const skynet = cp();
    const andy = new playerFactory("andy");
    const andyBoard = new gameBoardFactory();

    const andyPatrol = new shipFactory('patrol');
    const andyCurser = new shipFactory('curser');
    const andySub = new shipFactory('sub');
    const andyBattleship = new shipFactory('battleship');
    const andyAdmiral = new shipFactory('admiral');

    andyBoard.shipAllocation(andyPatrol, 3, "y");
    andyBoard.shipAllocation(andyCurser, 7, "x");
    andyBoard.shipAllocation(andySub, 23, "x");
    andyBoard.shipAllocation(andyBattleship, 62, "y");
    andyBoard.shipAllocation(andyAdmiral, 54, "x");

    //this is dom
    let grids = document.querySelector('#grids');
    let containerPlayer = document.querySelector('#containerPlayer');
    let containerComputer = document.querySelector('#containerComputer');

    //remove start button
    grids.removeChild((grids.childNodes[5]))   

    //display player 's grid
    for (let i = 0; i < andyBoard.gameBoard.length; i++) {
        let cell = andyBoard.gameBoard[i];
        let cellDiv = document.createElement('div');
        if(cell.shipObj){cellDiv.classList.add(cell.shipObj.name)}
        cellDiv.id = `p${cell.id}`;
        cellDiv.classList.add('playerGridCell')
        containerPlayer.appendChild(cellDiv);
    }

    //making the grid a grid(if it makes sense)
    containerPlayer.style.gridTemplateColumns = "repeat(10, 1fr)";
    containerPlayer.style.gridTemplateRows = "repeat(10, 1fr)";
    containerComputer.style.gridTemplateColumns = "repeat(10, 1fr)";
    containerComputer.style.gridTemplateRows = "repeat(10, 1fr)";

    //display computer's grid
    for (let i = 0; i < skynet.cpBoard.gameBoard.length; i++) {
        let cell = skynet.cpBoard.gameBoard[i];
        let cellDiv = document.createElement('div');
        //hide this later
        if(cell.shipObj){cellDiv.classList.add("computerShip")}
        //jgkf
        cellDiv.id = `c${cell.id}`;
        cellDiv.classList.add('computerGridCell')
        containerComputer.appendChild(cellDiv);
    }
    
        const isGameOver = function(){
            const allSink = (value)=>value==true ;
            let a  = andyBoard.gameBoard;
            let b = skynet.cpBoard.gameBoard;
            let temporaryArray1=[];
            let temporaryArray2=[];
            for (let i = 0; i < a.length; i++) {
                if(a[i].shipObj){
                    temporaryArray1.push(a[i].shipObj.isSunk())
                }
            }
            for (let j = 0; j < b.length; j++) {
                if(b[j].shipObj){
                    temporaryArray2.push(b[j].shipObj.isSunk())
                }
            }
            if(temporaryArray1.every(allSink)){
                alert('game is over')
                let body = document.querySelector('body');
                body.removeChild(grids);
                let h1 = document.createElement('h1');
                h1.innerHTML = "You lost!";
                body.appendChild(h1);
            }else if(temporaryArray2.every(allSink)){
                alert('game is over')
                let body = document.querySelector('body');
                body.removeChild(grids);
                let h1 = document.createElement('h1');
                h1.innerHTML = "You won!";
                    body.appendChild(h1); 
            }else{ return play()}
        } 


    //this function set the property for the color of computer's grid
    const setCSSAttributes = function(grid, domCell){
        let jsCell
        for (let i = 0; i < grid.gameBoard.length; i++) {
            jsCell = grid.gameBoard[domCell];
        }
        if(grid.randomAttackEnemy){
            let gridCell = document.getElementById(`c${jsCell.id}`)
            if(jsCell.isBeenShot && (!jsCell.shipObj)){
                gridCell.setAttribute("missed", 'missed');
            }else if( jsCell.isBeenShot && jsCell.shipObj.totalHits.length > 0){
                gridCell.setAttribute("hit","hit")
            }
        }else{
            let gridCell = document.getElementById(`p${jsCell.id}`)
            if(jsCell.isBeenShot && (!jsCell.shipObj)){
                gridCell.setAttribute("missed", 'missed');
            }else if( jsCell.isBeenShot && jsCell.shipObj.totalHits.length > 0){
                gridCell.setAttribute("hit","hit")
            }
        }     
        isGameOver()
    }

    let  round = andy.name;

    const whoIsPlaying = function(){
        if(round == andy.name){
            round = skynet.name;
            return round
        }else{
            round = andy.name;
            return round
        }
    }

    const play = function(){ 
        if(round== andy.name ){
            whoIsPlaying();
            console.log("my move")
            containerComputer.addEventListener('click', function(e){
                let attackedCell = e.path[0].id;
                attackedCell = attackedCell.replace(/[a-z]/g, "");
                let a = skynet.cpBoard.attackIsBeenShot(attackedCell);
                setCSSAttributes(skynet.cpBoard, a)
            });
        }else{
            console.log("skynet's move")
            whoIsPlaying(); 
            let c = skynet.cpBoard.randomAttackEnemy(andyBoard);
            setCSSAttributes(andyBoard, c)
        }
    }
    play()


}

module.exports = gameOn 
},{"./computerPlayer/cp":1,"./factories/gameBoardFactory":2,"./factories/playerFactory":3,"./factories/shipFactory":4}],6:[function(require,module,exports){
const gameOn = require("./gameOn");
const startOfGame = require("./startOfGame");
//gameOn()
startOfGame()

},{"./gameOn":5,"./startOfGame":7}],7:[function(require,module,exports){
const playerFactory = require("./factories/playerFactory");
const gameBoardFactory = require("./factories/gameBoardFactory");
const shipFactory = require("./factories/shipFactory");

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
    startButton.innerHTML = 'Start';


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
        //create this
        //  <!-- <div id="grids">
        // <div id="containerPlayer"></div>
        // </div> -->
        const grids = document.createElement('div');
        grids.id = 'grids';
        const containerPlayer = document.createElement('div');
        containerPlayer.id = 'containerPlayer';
        grids.appendChild(containerPlayer);
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

        //making the grid a grid(if it makes sense)
        containerPlayer.style.gridTemplateColumns = "repeat(10, 1fr)";
        containerPlayer.style.gridTemplateRows = "repeat(10, 1fr)";

        //change axis
        axisButton.addEventListener('click', (e) => {
            if (e.target.value == "x") {
                e.target.value = "y";
                e.target.innerHTML = "Y";
            } else {
                e.target.value = "x";
                e.target.innerHTML = "X";
            }
        });

        let player1Patrol = new shipFactory("patrol");
        let player1Curser = new shipFactory("curser");
        let player1Sub = new shipFactory("sub");
        let player1Battleship = new shipFactory("battleship");
        let player1Admiral = new shipFactory("admiral");
        ships = [];
        ships.push(player1Patrol);
        ships.push(player1Curser);
        ships.push(player1Sub);
        ships.push(player1Battleship);
        ships.push(player1Admiral);

        let message = document.createElement('p');
        message.innerHTML = `${player1Obj.player1.name}, place your ${player1Patrol.name}`;
        body.insertBefore(message, body.children[0]);

        let firstShip = document.createElement('div');
        firstShip.style.width = '100px';
        firstShip.style.height = '50px';
        firstShip.style.backgroundColor = "green";
        // firstShip.style.zIndex = 1;
        firstShip.id = "fs";


        containerPlayer.addEventListener('mousemove', function(e) {
            containerPlayer.appendChild(firstShip)
            e.preventDefault();
            let x = (e.clientX - 15);
            let y = (e.clientY - 15);
            firstShip.style.position = "absolute"
            firstShip.style.left = x + "px";
            firstShip.style.top = y + "px";
        });




        containerPlayer.addEventListener('click', function(e) {
            let targetCell = e.path[0].id;
            if (targetCell == "containerPlayer") {
                return
            } else {
                checkShipPlacement(targetCell)
            }
        });

        const checkShipPlacement = function(targetCell) {
            //get ship from somewhere else
            targetCell = parseInt(targetCell);
            let player1Patrol = new shipFactory("patrol");
            player1Obj.grid.shipAllocation(player1Patrol, targetCell, axisButton.value)
        }


    }
}

module.exports = startOfGame
},{"./factories/gameBoardFactory":2,"./factories/playerFactory":3,"./factories/shipFactory":4}]},{},[6]);
