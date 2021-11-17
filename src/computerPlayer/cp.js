// const sF = require('../factories/shipFactory');
// const gBF = require ('../factories/gameBoardFactory');
// const pF = require('../factories/playerFactory');

        
// const cp = function(){
//     //create the computerPlayer
//     // const cpPlayer = new pF("Skynet");
//     const name = "Skynet"

//     //create ships for cp
//     const cPatrol = new sF('patrol');
//     const cCurser = new sF('curser');
//     const cSub = new sF('sub');
//     const cBattleship = new sF('battleship');
//     const cAdmiral = new sF('admiral');
//     //put the ships in an array so it is easier to work with
//     const cpShipArray = [];
//     cpShipArray.push(cPatrol);
//     cpShipArray.push(cCurser);
//     cpShipArray.push(cSub);
//     cpShipArray.push(cBattleship);
//     cpShipArray.push(cAdmiral);

//     const getRandom = function(max){
//         return Math.floor(Math.random() * max);
//     }

//     //create cp board
//     const cpBoard = new gBF();

//     const randomAllocation = (function(array, board){
         
//         for (let j = 0; j < array.length; j++) {
//             let ship = array[j];
//             let legalMoves=[];

//             for(let i=0; i< board.gameBoard.length; i++){
//                 if(!board.gameBoard[i].shipObj){
//                     legalMoves.push(board.gameBoard[i])
//                 }
//             }

//             let randomCell = getRandom(legalMoves.length);
//             let randomAxis = getRandom(2);
//             if(randomAxis ==0){
//                 randomAxis = "x"
//             }else{ randomAxis = "y"}
        
//             board.shipAllocation(ship, randomCell, randomAxis)
//         }

//     })(cpShipArray, cpBoard);

// //this is the random attack from cp
//     const cpAttack = function(gb){
//         let legalAtt=[];
    
//         for(let i=0; i< gb.gameBoard.length; i++){
//             if(!gb.gameBoard[i].isBeenShot){
//                 legalAtt.push(gb.gameBoard[i])
//             }
//         }
        
//         let coord = getRandom(legalAtt.length);
//         return gb.attackIsBeenShot(coord)
//     }    

//     return {
//         // cpPlayer: cpPlayer ,
//         name: name,
//         cpShipArray: cpShipArray,
//         cpBoard: cpBoard,
//         cpAttack: cpAttack
//     }
// }

// module.exports = cp

const sF = require('../factories/shipFactory');
const gBF = require ('../factories/gameBoardFactory');
const pF = require('../factories/playerFactory');

        
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

        const shipAllocationForCP = function(ship,cell,axis){
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
                        const isEmpty = (currentValue) => gameBoard[currentValue].shipObj === undefined;
                        if(controlCells.every(isEmpty)){
                            for(let i=0; i<ship.length; i++){
                                gameBoard[cell+i].shipObj = ship;
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
    
                    const existenceCheck = (value) => gameBoard[value] ? true : false;
                    if(!controlCells.every(existenceCheck)){
                        return "cannot place your ship here";
                    }else{
                        const isEmpty = (currentValue) => gameBoard[currentValue].shipObj === undefined;
                        if(controlCells.every(isEmpty)){
                            let workingCell = cell;
                            for(let i=0; i<ship.length; i++){
                                gameBoard[workingCell].shipObj = ship
                                workingCell +=10;
                            }
                        }else{
                            return "cannot place 2 ships in the same spot"
                        }
                    }
                    break;
            }
        };

        const randomAllocation = (function(array){
         
            for (let j = 0; j < array.length; j++) {
                let ship = array[j];
                let legalMoves=[];
    
                for(let i=0; i< gameBoard.length; i++){
                    if(!gameBoard[i].shipObj){
                        legalMoves.push(gameBoard[i])
                    }
                }
    
                let randomCell = getRandom(legalMoves.length);
                let randomAxis = getRandom(2);
                if(randomAxis ==0){
                    randomAxis = "x"
                }else{ randomAxis = "y"}
            
                shipAllocationForCP(ship, randomCell, randomAxis)
            }
    
        })(cpShipArray);
    
     
    //this is to read the enemy's fire
        const attackIsBeenShot = function(cell){
            gameBoard[cell].isBeenShot = true;
            if(gameBoard[cell].shipObj){
                let currentShip =  gameBoard[cell].shipObj;
                currentShip.hit(cell);
                if(currentShip.isSunk()){
                   return `your ${currentShip.name} has been sunk!`
                }
                
            }else{
                return 'you missed'
            }
        };

        //this is the random attack from cp
        const cpAttack = function(gb){
            let legalAtt=[];
        
            for(let i=0; i< gameBoard.length; i++){
                if(!gameBoard[i].isBeenShot){
                    legalAtt.push(gameBoard[i])
                }
            }
            
            let coord = getRandom(legalAtt.length);
            return attackIsBeenShot(coord)
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
            cpAttack: cpAttack
        }
    })();

    return {
        // cpPlayer: cpPlayer ,
        name: name,
        cpShipArray: cpShipArray,
        cpBoard: cpBoard,
    }
}

module.exports = cp