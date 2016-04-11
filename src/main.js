var Board = require('./Board.js');
var Ship = require('./Ship.js');
var Point = require('./Point.js');
var stdin = process.stdin;

stdin.setEncoding('utf8');

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

var addNewShip = function() {
    // Show ship details and the keyboard shortcut to use to select a ship.
    showShipOptions(function(selectedShip) {
        // Ask for the position where to put the selected ship on the board.
        showShipCellOption(function (point, orientation) {
            // Add the selected at the provided cell
            var shipAdded = battleShipBoard.addShip(selectedShip, point, orientation);
            if (!shipAdded) {
                console.log(selectedShip.sign + ' could not be added at ' +
                    point.toString() + ' in ' + orientation + ' orientation');
                addNewShip();
            } else {
                // Show the board.
                console.log(battleShipBoard.toString());
                addNewShipPrompt();
            }
        });
    });
};

var addNewShipPrompt = function() {
    // Ask if player wants to add more ships on the board.
    stdin.resume();
    console.log('Do you want to add a ship on the board?');
    console.log('(Y/y) Yes');
    console.log('(N/n) No');
    var dataListener = function(key) {
        key = key.substring(0, key.length - 1);
        stdin.pause();
        stdin.removeListener('data', dataListener);
        if(key === 'Y' || key === 'y') {
            addNewShip();
        } else if(key === 'N' || key === 'n') {
        } else {
            console.log('Make a valid selection');
            addNewShipPrompt();
        }
    };
    stdin.on('data', dataListener);
};

var showShipOptions = function(callback) {
    var selectedShip;
    console.log('Select the ship to place on the board');
    console.log('Keystroke          Ship Name              Ship size');
    console.log('(A)                Aircraft Carrier       5');
    console.log('(B)                Battleship             4');
    console.log('(S)                Submarine              3');
    console.log('(D)                Destroyer              3');
    console.log('(P)                Patrol Boat            2');
    stdin.resume();
    var dataListener = function(key) {
        key = key.substring(0, key.length - 1);
        stdin.pause();
        stdin.removeListener('data', dataListener);
        switch (key) {
            case 'A':
                selectedShip = new AircraftCarrier();
                callback(selectedShip);
                break;
            case 'B':
                selectedShip = new Battleship();
                callback(selectedShip);
                break;
            case 'S':
                selectedShip = new Submarine();
                callback(selectedShip);
                break;
            case 'D':
                selectedShip = new Destroyer();
                callback(selectedShip);
                break;
            case 'P':
                selectedShip = new PatrolBoat();
                callback(selectedShip);
                break;
            default:
                console.log('Make a valid selection');
                console.log();
                showShipOptions(callback);
                break;
        }
    };
    stdin.on('data', dataListener);
};

var showShipCellOption = function(callback) {
    console.log('Where do you want to place the ship?');
    enterCellRow(function(row) {
        enterCellCol(function (col) {
            var cell = new Point(col, row);
            enterShipOrientation(function(orientation) {
               callback(cell, orientation);
            });
        });
    });
};

var enterCellRow = function(callback) {
    console.log('Enter the row number:');
    stdin.resume();
    var dataListener = function(key) {
        stdin.pause();
        stdin.removeListener('data', dataListener);
        key = key.substring(0, key.length - 1);
        key = parseInt(key, 10);
        if (!isNaN(key)) {
            callback(key);
        } else {
            console.log('row entered is ' + key);
            console.log('Enter valid row');
            enterCellRow(callback);
        }
    };
    stdin.on('data', dataListener);
};
var enterCellCol = function(callback) {
    console.log('Enter the column number:');
    stdin.resume();
    var dataListener = function(key) {
        stdin.pause();
        stdin.removeListener('data', dataListener);
        key = key.substring(0, key.length - 1);
        key = parseInt(key, 10);
        if (!isNaN(key)) {
            callback(key);
        } else {
            console.log('Enter valid column');
            enterCellCol(callback);
        }
    };
    stdin.on('data', dataListener);
};

var enterShipOrientation = function(callback) {
    console.log('Enter the ship orientation:');
    console.log('(H) Horizontal');
    console.log('(V) Vertical');
    stdin.resume();
    var dataListener = function(key) {
        stdin.pause();
        stdin.removeListener('data', dataListener);
        key = key.substring(0, key.length - 1);
        switch(key) {
            case 'H':
                callback('horizontal');
                break;
            case 'V':
                callback('vertical');
                break;
            default:
                console.log('Enter valid orientation');
                enterShipOrientation(callback);
        }
    };
    stdin.on('data', dataListener);
};

var doBoardSetup = function() {
    // Show the board.
    console.log(battleShipBoard.toString());
    addNewShip();
};

doBoardSetup();
