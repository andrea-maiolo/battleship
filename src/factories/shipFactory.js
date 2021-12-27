const shipFactory = function(name) {
    let length
    switch (name) {
        case "patrol":
            length = 2;
            break;
        case "curser":
            length = 3;
            break;
        case "sub":
            length = 3;
            break;
        case "battleship":
            length = 4;
            break;
        case "admiral":
            length = 5;
            break;
    }

    const totalHits = [];

    const hit = function(arg) {
        totalHits.push(arg);
        return totalHits
    }

    const isSunk = function() {
        return ((totalHits.length == length) ? true : false)
    }

    return {
        name: name,
        length: length,
        totalHits: totalHits,
        hit: hit,
        isSunk: isSunk
    }
}

module.exports = shipFactory