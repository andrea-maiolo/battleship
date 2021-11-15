const playerFactory = require('../factories/playerFactory');

//create the computerPlayer
const computerPlayer = new playerFactory("Skynet");

module.exports = computerPlayer

const sF = require('../factories/shipFactory');

//create ships for cp
const cPatrol = new sF('patrol');
const cCurser = new sF('curser');
const cSub = new sF('sub');
const cBattleship = new sF('battleship');
const cAdmiral = new sF('admiral');
//put the ships in an array so it is easier to work with
const cpShipArray = [];
cpShipArray.push(cPatrol);
cpShipArray.push(cSub);
cpShipArray.push(cCurser);
cpShipArray.push(cBattleship);
cpShipArray.push(cAdmiral);

module.exports = cpShipArray

const gBF = require ('../factories/gameBoardFactory');

//create cp board
const computerBoard = function(){
    const cpBoard = new gBF();

    const getRandom = function(max){
        return Math.floor(Math.random() * max);
    }
    
    const randomAllocation = function(array, board){
        console.log(array)
        console.log(board)
        
        // for (let j = 0; j < array.length; j++) {
        //     let ship = array[j];
        //     let legalMoves=[];
    
        //     for(let i=0; i< board.gameBoard.length; i++){
        //         if(!board.gameBoard[i].shipObj){
        //             legalMoves.push(board.gameBoard[i])
        //     }
        // }
        //     let randomCell = getRandom(legalMoves.length);
        //     let randomAxis = getRandom(2);
    
        //     board.shipAllocation(ship, randomCell, randomAxis)
        // }
        
        // console.log(legalMoves)
    }
    return{
        cpBoard: cpBoard,
        randomAllocation: randomAllocation
    }
} 

module.exports = computerBoard