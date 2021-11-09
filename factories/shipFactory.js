const shipFactory = function (length){
    const totalHits =[];

    const hit = function(arg){       
        totalHits.push(arg);
        console.log(totalHits)
        return totalHits
    }

    const isSunk = function(){
        return ((totalHits.length == length)? true : false)
    }

    return {
        length:length,
        totalHits:totalHits,
        hit: hit,
        isSunk:isSunk
    }
}

module.exports  = shipFactory

