angular.module('Battleship', [])
    .controller('boardCtrl', ['$http', function($http) {
        console.log('Let\s have some fun');
        $http.get('/ships', function(reponse){});
        var data = {
            board: [
                [0, 'D', 0, 0, 0, 0],
                [0, 'D', 0, 0, 0, 0],
                [0, 'D', 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ],
            ship: {
                size: 3,
                sign: 'D'
            },
            point: {
                x: 4,
                y: 3
            },
            orientation: 'vertical'
        };

        $http.post('/addShip', data);
    }]);
