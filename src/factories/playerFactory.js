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