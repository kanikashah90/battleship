/***********************************
 * ****** Board Presentation *******
 ***********************************
 *
 * 3 3 3 0 0 0
 * 0 0 2 2 0 0
 * 0 4 0 3 3 3
 * 0 4 0 0 0 0
 * 0 4 0 3 3 3
 * 0 4 3 3 3 0
 *
 * Number > 0 represents the ship with the specified length
 * 0 Represents empty cell on the board.
 * /

/**
 * Class Board
 * It holds the state of the battleship board and provide functions to
 * modify the board.
 * It holds the state of the board in the variable currentState
 * @param width
 * @param height
 * @constructor
 */

var Point = require('./Point.js');

function Board (width, height) {
    this.width = width;
    this.height = height;
    this.initiateBoard();
};

/**
 * Function addShip
 * Puts the ship on the board at the specified location and orientation.
 */
Board.prototype.addShip = function(ship, point, direction) {
    var count;
    point = normalizeUserPoint(point);
    if (direction === 'horizontal') {
        if (point.x < 0 || (ship.size + point.x) > this.width) {
            return false;
        }
        for (count = point.x; count < ship.size + point.x; count++) {
            if(this.getCell(new Point(count, point.y)) !== 0) {
                return false;
            }
        }
        for (count = point.x; count < ship.size + point.x; count++) {
            this.setCell(new Point(count, point.y), ship.sign);
        }
        return true;
    } else if (direction === 'vertical') {
        if (point.y < 0 || (ship.size + point.y) > this.height) {
            return false;
        }
        for (count = point.y; count < ship.size + point.y; count++) {
            if(this.getCell(new Point(point.x, count)) !== 0) {
                return false;
            }
        }
        for (count = point.y; count < ship.size + point.y; count++) {
            this.setCell(new Point(point.x, count), ship.sign);
        }
        return true;
    }
};

/**
 * Function attackCell
 * Destroys the position/ship on the board at the specified cell.
 */
Board.prototype.attackCell = function(cell) {
    cell  = normalizeUserPoint(cell);
    this.setCell(cell, 0);
};

/**
 * Function isAlive
 * Tells if all the ships on the board are destroyed or not.
 */
Board.prototype.isAlive = function() {
    var isAlive = false;
    this.currentState.forEach(function(row) {
       row.forEach(function(cell) {
          if (cell !== 0) {
              isAlive = true;
          }
       });
    });
    return isAlive;
};

/**
 * Function getCell
 * Returns the value in the cell on the board.
 *
 *  @param point: Input point is normalized
 */
Board.prototype.getCell = function(point) {
    return this.currentState[point.y][point.x];
};

/**
 * Function setCell
 * Sets the given value at the particular cell
 * Returns true if successfully set
 *
 * @param point: Input point is normalized
 */
Board.prototype.setCell = function(point, value) {
    if ((point.x >= 0 && point.x < this.width) &&
        (point.y >=0 && point.y < this.height)) {
        this.currentState[point.y][point.x] = value;
        return true;
    }
    return false;
};

/**
 * Function initiateBoard
 * Creats the game board and initializes all cell with value of 0
 */
Board.prototype.initiateBoard = function() {
    this.currentState = [];
    var row;
    for (var i = 0; i < this.height; i++) {
        row = [];
        for (var j = 0; j < this.width; j++) {
            row.push(0);
        }
        this.currentState.push(row);
    }
};

function normalizeUserPoint(point) {
    if (point && point.x) {
        point.x = point.x - 1;
    }
    if (point && point.y) {
        point.y = point.y - 1;
    }
    return point;
}

module.exports = Board;