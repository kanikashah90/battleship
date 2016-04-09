var Ship = require('../src/Ship.js'),
    Board = require('../src/Board.js'),
    Point = require('../src/Point.js'),
    expect = require('expect.js');

describe('Ship', function() {
    describe('#construnctor', function() {
       it('should set the size and sign of the ship', function() {
           var testShip = new Ship(5, 'T');
           expect(testShip.size).to.equal(5);
           expect(testShip.sign).to.equal('T');
       });
    });

    describe('#getShipPoisitions', function() {
       it('should return positions of all the ships of X type positioned on' +
           ' the board', function() {
            var testBoard = {
                    currentState: [
                       ['T', 'T', 'T', 0, 0],
                       [0, 'T', 0, 0, 0],
                       [0, 'T', 0, 0, 0],
                       [0, 'T', 'T', 'T', 'T'],
                       [0, 'T', 'T', 'T', 0]
                    ],
                    ships: {
                       0: {type: new Ship(3, 'T'), orientation: 'horizontal'},
                       6: {type: new Ship(3, 'T'), orientation: 'vertical'},
                       17: {type: new Ship(3, 'T'), orientation: 'horizontal'},
                       21: {type: new Ship(3, 'T'), orientation: 'horizontal'}
                    },
                    width: 5
                },
                testShip = new Ship(3, 'T'),
                shipsLocationsExpected = [
                   new Point(1, 1),
                   new Point(2, 2),
                   new Point(3, 4),
                   new Point(2, 5)
                ],
                shipsLocationsReturned;
           shipsLocationsReturned = testShip.getShipPositions(testBoard);
           expect(shipsLocationsReturned).to.eql(shipsLocationsExpected);
       });
    });
});