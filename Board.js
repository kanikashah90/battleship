/**
 * Class Board
 * It holds the state of the battleship board and provide functions to
 * modify the board.
 * @param width
 * @param height
 * @constructor
 */

function Board (width, height) {
    this.width = width;
    this.height = height;
};

/**
 * Function addShip
 * Puts the ship on the board at the specified location.
 */
Board.prototype.addShip = function() {};

/**
 * Function attackCell
 * Destroys the position/ship on the board at the specified cell.
 */
Board.prototype.attackCell = function() {};

/**
 * Function isAlive
 * Tells if all the ships on the board are destroyed or not.
 */
Board.prototype.isAlive = function() {};