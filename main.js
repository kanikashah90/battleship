var Board = require('./Board.js');
var Ship = require('./Ship.js');
var Point = require('./Point.js');

var battleShipBoard = new Board(10, 10);
var AircraftCarrier = function(){
  Ship.call(this, 5, 'A');
};
AircraftCarrier.prototype = Object.create(Ship.prototype);

var Battleship = function() {
    Ship.call(this, 4, 'B');
};
Battleship.prototype = Object.create(Ship.prototype);

var Submarine = function() {
  Ship.call(this, 3, 'S');
};
Submarine.prototype = Object.create(Ship.prototype);

var Destroyer = function() {
    Ship.call(this, 3, 'D');
};
Destroyer.prototype = Object.create(Ship.prototype);

var PatrolBoat = function() {
    Ship.call(this, 2, 'P');
};
PatrolBoat.prototype = Object.create(Ship.prototype);

battleShipBoard.addShip(new AircraftCarrier(), new Point(7, 5), 'vertical');
console.log(battleShipBoard.currentState);

battleShipBoard.attackCell(new Point(7, 7));
console.log(battleShipBoard.currentState);
