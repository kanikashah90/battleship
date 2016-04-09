var Board = require('../src/Board.js'),
    Ship = require('../src/Ship.js'),
    Point = require('../src/Point.js'),
    expect = require('expect.js');

describe('Board', function() {
    describe('#construnctor', function() {
        it('should set height and width of the board', function() {
            var testBoard = new Board(2, 3),
                testBoardExp = [[0, 0], [0, 0], [0, 0]];
            expect(testBoard.width).to.equal(2);
            expect(testBoard.height).to.equal(3);
            expect(testBoard.currentState).to.eql(testBoardExp);
        });
    });

    describe('should perform following operations', function() {
        var testBoard;

        beforeEach(function() {
            testBoard = new Board(5, 5);
        });

        describe('#addShip', function() {
            var testShip,
                testBoardBefore = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ];
            beforeEach(function () {
                testShip = new Ship(3, 'T');
            });

            describe('at the top left position', function () {
                it('should add ship on board when orientation is horizontal', function() {
                    var testPoint = new Point(1, 1),
                       testBoardAfter = [
                           ['T', 'T', 'T', 0, 0 ],
                           [0, 0, 0, 0, 0],
                           [0, 0, 0, 0, 0],
                           [0, 0, 0, 0, 0],
                           [0, 0, 0, 0, 0]
                       ],
                       isShipAdded;
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    isShipAdded = testBoard.addShip(testShip, testPoint, 'horizontal');
                    expect(testBoard.currentState).to.eql(testBoardAfter);
                    expect(isShipAdded).to.equal(true);
                    expect(testBoard.ships).to.eql({
                        0: {
                            type: testShip,
                            orientation: 'horizontal'
                        }
                    });
                });

                it('should add ship on board when orientation is vertical', function() {
                    var testPoint = new Point(1, 1),
                        testBoardAfter = [
                           ['T', 0, 0, 0, 0 ],
                           ['T', 0, 0, 0, 0],
                           ['T', 0, 0, 0, 0],
                           [0, 0, 0, 0, 0],
                           [0, 0, 0, 0, 0]
],
                        isShipAdded;
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    isShipAdded = testBoard.addShip(testShip, testPoint, 'vertical');
                    expect(testBoard.currentState).to.eql(testBoardAfter);
                    expect(isShipAdded).to.equal(true);
                    expect(testBoard.ships).to.eql({
                        0: {
                            type: testShip,
                            orientation: 'vertical'
                        }
                    });
                });

            });

            describe('at the top right position', function() {
                it('should add ship on board when orientation is vertical', function() {
                    var testPoint = new Point(5, 1),
                        testBoardAfter = [
                            [0, 0, 0, 0, 'T'],
                            [0, 0, 0, 0, 'T'],
                            [0, 0, 0, 0, 'T'],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        isShipAdded;
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    isShipAdded = testBoard.addShip(testShip, testPoint, 'vertical');
                    expect(testBoard.currentState).to.eql(testBoardAfter);
                    expect(isShipAdded).to.equal(true);
                    expect(testBoard.ships).to.eql({
                        4: {
                            type: testShip,
                            orientation: 'vertical'
                        }
                    });
                });
                it('should add ship on board when orientation is horizontal', function() {
                    var testPoint = new Point(3, 1),
                        testBoardAfter = [
                            [0, 0, 'T', 'T', 'T'],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0],
                            [0, 0, 0, 0, 0]
                        ],
                        isShipAdded;
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    isShipAdded = testBoard.addShip(testShip, testPoint, 'horizontal');
                    expect(testBoard.currentState).to.eql(testBoardAfter);
                    expect(isShipAdded).to.eql(true);
                    expect(testBoard.ships).to.eql({
                        2: {
                            type: testShip,
                            orientation: 'horizontal'
                        }
                    });
                });
            });

            it('should add ship at the bottom of the board', function() {
                var testPoint = new Point(2, 5),
                    testBoardAfter = [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 'T', 'T', 'T', 0]
                    ],
                    isShipAdded;
                expect(testBoard.currentState).to.eql(testBoardBefore);
                isShipAdded = testBoard.addShip(testShip, testPoint, 'horizontal');
                expect(testBoard.currentState).to.eql(testBoardAfter);
                expect(isShipAdded).to.eql(true);
                expect(testBoard.ships).to.eql({
                    21: {
                        type: testShip,
                        orientation: 'horizontal'
                    }
                });
            });

            describe('at an invalid location', function() {
                it('should not modify the board', function() {
                    var testPoint = new Point(5, 1),
                        isShipAdded;
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    isShipAdded = testBoard.addShip(testShip, testPoint, 'horizontal');
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    expect(isShipAdded).to.eql(false);

                    testPoint = new Point(4, 4);
                    isShipAdded = testBoard.addShip(testShip, testPoint, 'vertical');
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    expect(isShipAdded).to.eql(false);

                    testPoint = new Point(1, 5);
                    isShipAdded = testBoard.addShip(testShip, testPoint, 'vertical');
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    expect(isShipAdded).to.eql(false);
                });
            })
        });

        describe('#removeShip', function() {
            var testPoint1 = new Point(2, 2),
                testPoint2 = new Point(5, 2),
                testShip1 = new Ship(3, 'T1'),
                testShip2 = new Ship(4, 'T2'),
                testBoardBefore = [
                    [0, 0, 0, 0, 0],
                    [0, 'T1', 'T1', 'T1', 'T2'],
                    [0, 0, 0, 0, 'T2'],
                    [0, 0, 0, 0, 'T2'],
                    [0, 0, 0, 0, 'T2']
                ],
                testShipsExpected = {
                    6: {
                        type: testShip1,
                        orientation: 'horizontal'
                    },
                    9: {
                        type: testShip2,
                        orientation: 'vertical'
                    }
                };

            beforeEach(function() {
                testBoard.addShip(testShip1, testPoint1, 'horizontal');
                testBoard.addShip(testShip2, testPoint2, 'vertical');
            });

            it('should set the cells occupied by the ship placed horizontally' +
               ' to default value', function() {
                var testBoardAfter = [
                       [0, 0, 0, 0, 0],
                       [0, 0, 0, 0, 'T2'],
                       [0, 0, 0, 0, 'T2'],
                       [0, 0, 0, 0, 'T2'],
                       [0, 0, 0, 0, 'T2']
                    ];
                expect(testBoard.currentState).to.eql(testBoardBefore);
                expect(testBoard.ships).to.eql(testShipsExpected);
                testBoard.removeShip(testShip1, testPoint1);
                expect(testBoard.currentState).to.eql(testBoardAfter);
            });

            it('should set the cells occupied by the ship placed vertically' +
                ' to default value', function() {
                var testBoardAfter = [
                    [0, 0, 0, 0, 0],
                    [0, 'T1', 'T1', 'T1', 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ];
                expect(testBoard.currentState).to.eql(testBoardBefore);
                expect(testBoard.ships).to.eql(testShipsExpected);
                testBoard.removeShip(testShip2, testPoint2);
                expect(testBoard.currentState).to.eql(testBoardAfter);
            });

        });

        describe('#attackCell', function() {
            it('should reset the cell value to default cell value', function() {
                var testPoint = new Point(1, 1),
                    attackCell = new Point(2, 1),
                    testShip = new Ship(3, 'T'),
                    testBoardBefore = [
                        ['T', 'T', 'T', 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0]
                    ],
                    testBoardAfter = [
                        ['T', 0, 'T', 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0]
                    ];
                testBoard.addShip(testShip, testPoint, 'horizontal');
                expect(testBoard.currentState).to.eql(testBoardBefore);
                testBoard.attackCell(attackCell);
                expect(testBoard.currentState).to.eql(testBoardAfter);
            });
        });

        describe('#isAlive', function() {
            var testPoint,
                testBoardBefore,
                testShip;

            beforeEach(function() {
                testPoint = new Point(1, 1);
                testBoardBefore = [
                    ['T', 'T', 'T', 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ];
                testShip = new Ship(3, 'T');
                testBoard.addShip(testShip, testPoint, 'horizontal');
            });

            it('should return false when all the ships on the board are' +
               ' destroyed', function() {
                    var isAliveReturned;
                    expect(testBoard.currentState).to.eql(testBoardBefore);
                    testBoard.attackCell(new Point(1, 1));
                    testBoard.attackCell(new Point(2, 1));
                    testBoard.attackCell(new Point(3, 1));
                    isAliveReturned = testBoard.isAlive();
                    expect(isAliveReturned).to.equal(false);
            });

            it('should return true when atleast one part of any ship is not' +
                ' destroyed', function() {
                var isAliveReturned;
                expect(testBoard.currentState).to.eql(testBoardBefore);
                testBoard.attackCell(new Point(1, 1));
                testBoard.attackCell(new Point(2, 1));
                isAliveReturned = testBoard.isAlive();
                expect(isAliveReturned).to.equal(true);
            })
        });

        describe('#getCell', function() {
            it('should return the provided cell value on the board', function() {
                var testPoint = new Point(1, 1),
                    testShip = new Ship(3, 'T'),
                    testBoardBefore = [
                        ['T', 'T', 'T', 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0]
                    ];
                testBoard.addShip(testShip, testPoint, 'horizontal');
                expect(testBoard.currentState).to.eql(testBoardBefore);
                expect(testBoard.getCell(new Point(1, 0))).to.equal('T');
            });
        });

        describe('#setCell', function() {
            it('should set the provided cell with the provided value on the' +
               ' board and return true', function() {
               var testPoint = new Point(1, 1),
                   cellValueBefore = testBoard.getCell(testPoint),
                   cellValueAfter,
                   returnValue;
               expect(cellValueBefore).to.equal(0);
               returnValue = testBoard.setCell(testPoint, 'T');
               cellValueAfter = testBoard.getCell(testPoint);
               expect(cellValueAfter).to.equal('T');
               expect(returnValue).to.equal(true);
            });

            it('should return false if the cell is out of board\'s bound', function() {
                var testPoint = new Point(6, 1),
                    returnValue;
                returnValue = testBoard.setCell(testPoint, 'T');
                expect(returnValue).to.equal(false);
            });

        });

        describe('#initiateBoard', function() {
           it('should initialise create the board and initialize all cells' +
               ' to default value', function() {
               var testBoardExp = [
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0]
               ];
               testBoard.initiateBoard();
               expect(testBoard.currentState).to.eql(testBoardExp);
           });
        });
    });
});