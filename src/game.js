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
    
    var crane = {
        x : 1
    };

    var keysDown = {};

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

    function draw_crane() {
        var canvas = document.getElementById('game_screen');
        var y = 1 * 50;
        var x = crane.x * 50;
        
        var context = canvas.getContext('2d');
        context.fillStyle="rgb(127,127,127)";
        context.beginPath();
        context.moveTo(x + 20, y);
        context.lineTo(x, y+50);
        context.lineTo(x+50, y+50);
        context.lineTo(x+40, y+40);
        context.lineTo(x+15, y+40);
        context.lineTo(x+30, y);
        context.fill();
    }

    scope.addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);

    scope.addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);

    var key_left = 37;
    var key_up = 38;
    var key_right = 39;
    var key_down = 40;

    scope.update = function() {
        if (key_left in keysDown) {
            crane.x -= 1;
            delete keysDown[key_left];
        }

        if (key_right in keysDown) {
            crane.x += 1;
            delete keysDown[key_right];
        }
        draw_level();
        draw_crane();
    }

    window.setInterval(update, 1);
}(window))
