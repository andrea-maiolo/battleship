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
     
    //this is to read the enemy's fire
        const attackIsBeenShot = function(cell){
            this.gameBoard[cell].isBeenShot = true;
            if(this.gameBoard[cell].shipObj){
                let currentShip =  this.gameBoard[cell].shipObj;
                currentShip.hit(cell);
                if(currentShip.isSunk()){
                   return `your ${currentShip.name} has been sunk!`
                }else{
                    this.gameBoard[cell].missed = "missed";
                }
            }
        };

        //this is the random attack function form the computer
            let arrayOfIllegalMoves=[]; 
        
            const randomAttackEnemy = function(gb){
                let coord = getRandom(100);
                if(arrayOfIllegalMoves.includes(coord)){
                    randomAttackEnemy(gb)
                }else{
                    arrayOfIllegalMoves.push(coord)
                    return gb.attackIsBeenShot(coord)
                }
            }
    
        // Gameboards should be able to report whether or not all of their ships have been sunk.
        const isTheGameOver = function(){
            let arrayOfShips=[];
            let tempArr= [];
            for(let i=0; i< gameBoard.length; i++){
                if(gameBoard[i].shipObj){
                    arrayOfShips.push(gameBoard[i].shipObj)
                    arrayOfShips.forEach(ship => tempArr.push(ship.isSunk()));
                }
            }
            const allTrue = (currentValue) => currentValue ==true;
        
            return tempArr.every(allTrue)
        }

        return {
            gameBoard:gameBoard,
            attackIsBeenShot:attackIsBeenShot,
            isTheGameOver: isTheGameOver,
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
            if(currentShip.isSunk()){
               return `your ${currentShip.name} has been sunk!`
            }else{
                this.gameBoard[cell].missed = "missed";
            }
        }
    };

    // Gameboards should be able to report whether or not all of their ships have been sunk.
    const isTheGameOver = function(){
        let arrayOfShips=[];
        let tempArr= [];
        for(let i=0; i< gameBoard.length; i++){
            if(gameBoard[i].shipObj){
                arrayOfShips.push(gameBoard[i].shipObj)
                arrayOfShips.forEach(ship => tempArr.push(ship.isSunk()));
            }
        }
        const allTrue = (currentValue) => currentValue ==true;
    
        return tempArr.every(allTrue)

    }

    return {
        gameBoard:gameBoard,
        shipAllocation:shipAllocation,
        attackIsBeenShot:attackIsBeenShot,
        isTheGameOver: isTheGameOver
    }
}

module.exports = gameBoardFactory
},{}],3:[function(require,module,exports){
const playerFactory = function(name){
    
    let arrayOfIllegalMoves=[] 

    const attackEnemy = function(gb,coord){
        if(arrayOfIllegalMoves.includes(coord)){
            return "you can't shoot on the same cell, it is player turn again untill he shots in an empty spot"
        }else{
            arrayOfIllegalMoves.push(coord)
            return gb.attackIsBeenShot(coord)
        }
    }
    
    return {
        name:name,
        attackEnemy: attackEnemy
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
const startOfGame = require("./startOfGame");


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
    let info = document.querySelector('#info');

    //remove start button
    grids.removeChild((grids.childNodes[5]))   

    //display player 's grid
    for (let i = 0; i < andyBoard.gameBoard.length; i++) {
        let cell = andyBoard.gameBoard[i];
        let cellDiv = document.createElement('div');
        if(cell.shipObj){cellDiv.classList.add(cell.shipObj.name)}
        cellDiv.id = cell.id;
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
        cellDiv.id = cell.id;
        cellDiv.classList.add('computerGridCell')
        containerComputer.appendChild(cellDiv);
    }


    //create a function for event listener when mouse hover over enemy's grid
    function callAttack(e){
        let attackedCell = e.path[0];
        if(e.path[1].id === "containerComputer"){
            let referenceGrid = skynet.cpBoard;
            console.log(andy.attackEnemy(referenceGrid, attackedCell.id))  
            // if(andy.attackEnemy(referenceGrid, attackedCell.id) === "you missed"){
            //     info.innerHTML="missed";
            // }
            setAttributesForCSS(attackedCell)
        }
    }

    containerComputer.addEventListener('mousedown', callAttack)

    //this function set the property for the color
    function setAttributesForCSS(domCell){
        for (let i = 0; i < skynet.cpBoard.gameBoard.length; i++) {
            const jsCell = skynet.cpBoard.gameBoard[domCell.id];
            if(jsCell.missed){
                domCell.setAttribute("missed", 'missed');
                console.log(jsCell)
            // }else if(!jsCell.missed && jsCell.shipObj.totalHits.length > 0){
            //     domCell.setAttribute("hit","hit")
            }
        }
    }
}

module.exports = gameOn 
},{"./computerPlayer/cp":1,"./factories/gameBoardFactory":2,"./factories/playerFactory":3,"./factories/shipFactory":4,"./startOfGame":7}],6:[function(require,module,exports){
const gameOn = require("./gameOn");
gameOn()
},{"./gameOn":5}],7:[function(require,module,exports){
const playerFactory =  require("./factories/playerFactory");
const gameBoardFactory =require("./factories/gameBoardFactory");
const shipFactory = require("./factories/shipFactory");

function startOfGame(){

    const containerComputer = document.querySelector('#containerComputer');
    containerComputer.style.display = 'none';
    const body = document.querySelector('body');
    const containerPlayer = document.querySelector('#containerPlayer');
    const startButton = document.querySelector('#start');

    const playerName = document.createElement('input');
    playerName.type = 'text';
    playerName.maxLength = 8;
    body.appendChild(playerName);


    function playerCheck(){
        if(!playerName.value){
            alert("no name")
        }else{
            createPlayer()
        }
    }

    function createPlayer(){
        let player1 = new playerFactory(playerName.value);
        let player1Grid = new gameBoardFactory;
        let player1Patrol = new shipFactory("patrol");
        let player1Curser = new shipFactory("curser");
        let player1Sub = new shipFactory("sub");
        let player1Battleship = new shipFactory("battleship");
        let player1Admiral = new shipFactory("admiral");
        let shipArray = [];
        shipArray.push(player1Patrol)
        shipArray.push(player1Curser)
        shipArray.push(player1Sub)
        shipArray.push(player1Battleship)
        shipArray.push(player1Admiral)

        const player1Obj= {
            player1:player1,
            player1Grid:player1Grid,
            shipArray: shipArray
        };
        playerShipPlacement(player1Obj)
    }

    function playerShipPlacement(obj){
        //remove input
        body.removeChild(playerName);
        //create grid
        let pGrid = obj.player1Grid.gameBoard;
        for (let i = 0; i < pGrid.length; i++) {
            let cell = pGrid[i];
            let cellDiv = document.createElement('div');
            //this will be done later on
            // if(cell.shipObj){cellDiv.classList.add(cell.shipObj.name)}
            cellDiv.id = cell.id;
            cellDiv.classList.add('playerGridCell')
            containerPlayer.appendChild(cellDiv);
        }
        
        //making the grid a grid(if it makes sense)
        containerPlayer.style.gridTemplateColumns = "repeat(10, 1fr)";
        containerPlayer.style.gridTemplateRows = "repeat(10, 1fr)";
        //to rotate the ships
        const axisButton = document.createElement('button');
        axisButton.classList.add("x");
        axisButton.innerHTML="Axis x";
        axisButton.value = "x";
        body.appendChild(axisButton);

        //change axis
        axisButton.addEventListener('click', (e)=> {
            if(e.target.value =="x"){
                e.target.value = "y";
                e.target.innerHTML = "Axis y";
            }else{
                e.target.value ="x";
                e.target.innerHTML = "Axis x";
            }
        })

        //take the ship array and place ships
        let shipArray = obj.shipArray;
        shipArray.forEach(ship=>{
            let message = document.createElement('p');
            message.innerHTML = `${obj.player1.name} place your ${ship.name}`;
            body.appendChild(message);

            // //create a dummy ship
            // let dummyShip = document
            
        });
//        pGrid.shipAllocation() this is the actual grid so it doesnt have any function















    }

    startButton.addEventListener('click', playerCheck);

}

module.exports  = startOfGame
},{"./factories/gameBoardFactory":2,"./factories/playerFactory":3,"./factories/shipFactory":4}]},{},[6]);
