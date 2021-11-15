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