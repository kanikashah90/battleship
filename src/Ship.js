var Point = require('./Point.js');

/**
 * Class Ship
 * Holds the position and current health state of the ship.
 * @param size
 * @constructor
 */
function Ship(size, sign) {
    this.size = size;
    this.sign = sign;
}

/**
 * Function getPosition
 * Gets the position of the all the ships of this type  on the board.
 */
Ship.prototype.getShipPositions = function(board) {
    // Get all the ships on the board
    var allShips = board.ships,
        allShipsLocation = allShips && Object.keys(allShips),
        ship,
        normalizedCell,
        shipsLocation = [],
        _this = this;

    // Filter the one's whose sign and size matches to this Ship
    allShipsLocation.forEach(function(location) {
        ship = allShips[location].type;
        if (ship.size === _this.size && ship.sign === _this.sign) {
            normalizedCell = calcCellFromNumber(location, board.width);
            shipsLocation.push(deNormalizePoint(normalizedCell))
        }
    });

    return shipsLocation;
};

/**
 * Function calcCellFromNumber
 * Calculates the cell location in (x,y) co-ordinated when provided with single
 * value based on following calculation
 * x = number % board width
 * y = Floor of (Number / board width)
 * @param number
 * @param width
 * @returns {*}
 */
function calcCellFromNumber(number, width) {
    var x = number % width,
        y = (number - x)/width;
    return new Point(x, y);
}

/**
 * Function deNormalizePoint
 * Denormalizes the point by changing the index from 0 to 1
 * @param point
 * @returns {*}
 */
function deNormalizePoint(point) {
    if (point !== undefined && point.x !== undefined) {
        point.x = point.x + 1;
    }
    if (point !== undefined && point.y !== undefined) {
        point.y = point.y + 1;
    }
    return point;
}

module.exports = Ship;