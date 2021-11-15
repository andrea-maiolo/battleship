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