const sF = require('../factories/shipFactory');
const gBF = require ('../factories/gameBoardFactory');

        
const cp = function(){
    //create the computerPlayer
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

    //create cp board
    const cpBoard = new gBF();

    const randomAllocation = (function(array, board){
        
        const getRandom = function(max){
            return Math.floor(Math.random() * max);
        }
        
        for (let j = 0; j < array.length; j++) {
            let ship = array[j];
            let legalMoves=[];

            for(let i=0; i< board.gameBoard.length; i++){
                if(!board.gameBoard[i].shipObj){
                    legalMoves.push(board.gameBoard[i])
                }
            }

            let randomCell = getRandom(legalMoves.length);
            let randomAxis = getRandom(2);
            if(randomAxis ==0){
                randomAxis = "x"
            }else{ randomAxis = "y"}
        
            board.shipAllocation(ship, randomCell, randomAxis)
        }

    })(cpShipArray, cpBoard);


    return {
        name: name,
        cpShipArray: cpShipArray,
        cpBoard: cpBoard,
    }
}

module.exports = cp