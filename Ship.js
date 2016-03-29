/**
 * Class Ship
 * Holds the position and current health state of the ship.
 * @param size
 * @constructor
 */
function Ship(size) {
    this.size = size;
}

/**
 * Function isDestroyed
 * Tells if ship is completely destroyed or not.
 */
Ship.prototype.isDestroyed = function() {};

/**
 * Function position
 * Sets the position of the ship on the board.
 */
Ship.prototype.setPosition = function() {};

/**
 * Function getPosition
 * Gets the position of the ship on the board.
 */
Ship.prototype.getPosition = function() {};