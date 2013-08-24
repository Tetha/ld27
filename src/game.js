(function(scope) {
    "use strict";
    var empty = " ";
    var wall = "wall";
    var level = [
        [wall, wall , wall , wall , wall , wall , wall , wall , wall],
        [wall, empty, empty, empty, empty, empty, empty, empty, wall],   
        [wall, empty, empty, empty, empty, empty, empty, empty, wall],   
        [wall, empty, empty, empty, empty, empty, empty, empty, wall],   
        [wall, empty, wall , empty, wall , empty, wall , empty, wall],   
        [wall, wall , wall , wall , wall , wall , wall , wall , wall],
    ];

    function draw_level() {
        var canvas = document.getElementById('game_screen');
        for (var y = 0; y < level.length; y++) {
            for (var x = 0; x < level[y].length; x++) {
                var tile = level[y][x];
                var context = canvas.getContext('2d');
                if (tile === wall) {
                    context.fillStyle = "rgb(127, 127, 255)";
                } else if (tile === empty) {
                    context.fillStyle = "rgb(0, 0, 0)";
                } else {
                    context.fillStyle = "rgb(255, 0, 0)";
                }
                context.fillRect(50 * x, 50 * y, 50, 50);
            }
        }
    }
    scope.update = draw_level;
}(window))
