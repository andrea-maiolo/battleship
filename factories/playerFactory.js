const playerFactory = function(name){
    
    let arrayOfIllegalMoves=[] 

    const attackEnemy = function(gb,coord){
        if(arrayOfIllegalMoves.includes(coord)){
            return "you can't shoot on the same cell"
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

// player properties = 
// name 
// function for play 
//     this function allow you to check if is your turn and then it lete you call gameBoard.isBeenShot()

// function for check if move id legal

// Players can take turns playing the game by attacking the enemy Gameboard.

// The game is played against the computer, so make ‘computer’
//  players capable of making random plays. The AI does not have to be smart,
// but it should know whether or not a given move is legal. 
// (i.e. it shouldn’t shoot the same coordinate twice).