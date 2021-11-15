const getRandom = function(max){
    return Math.floor(Math.random() * max);
}

const randomAllocation = function(array, board){
    
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

        board.shipAllocation(ship, randomCell, randomAxis)
    }
    
    console.log(legalMoves)
}

module.exports = randomAllocation