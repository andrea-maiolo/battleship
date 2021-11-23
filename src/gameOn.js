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
    let body = document.querySelector('body');
    let containerPlayer = document.querySelector('#containerPlayer');
    let containerComputer = document.querySelector('#containerComputer');

    //remove start button
    body.removeChild((body.childNodes[5]))   

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
            let referenceGrid = skynet.cpBoard  
            andy.attackEnemy(referenceGrid, attackedCell.id)
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
            }else if(!jsCell.missed && jsCell.shipObj.totalHits.length > 0){
                domCell.setAttribute("hit","hit")
            }
        }
    }
}

module.exports = gameOn 