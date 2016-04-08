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
    });
});