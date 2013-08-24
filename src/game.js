(function(scope) {
    "use strict";
    var empty = " ";
    var wall = "wall";
    var core = "core";
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

    var core = {
        x : 5
    }
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

    function draw_reactor() {
        var canvas = document.getElementById('game_screen');
        var y = 4 * 50;
        var x = core.x * 50;

        var context = canvas.getContext('2d');
        context.fillStyle = "rgb(127, 127, 127)";
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x+50, y);
        context.lineTo(x+40, y+10);
        context.lineTo(x+10, y+10);
        context.lineTo(x, y);
        context.fill();

        context.beginPath();
        context.moveTo(x, y+50);
        context.lineTo(x+50, y+50);
        context.lineTo(x+40, y+40);
        context.lineTo(x+10, y+40);
        context.lineTo(x, y+50);
        context.fill();

        context.fillStyle = "rgb(0, 0, 255)";
        context.beginPath();
        context.moveTo(x+25, y+10);
        context.lineTo(x+10, y+25);
        context.lineTo(x+25, y+40);
        context.lineTo(x+40, y+25);
        context.lineTo(x+25, y+10);
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
            if (2 <= crane.x) {
                crane.x -= 1;
            }
            delete keysDown[key_left];
        }

        if (key_right in keysDown) {
            if (crane.x <= 6) {
                crane.x += 1;
            }
            delete keysDown[key_right];
        }
        draw_level();
        draw_crane();
        draw_reactor();
    }

    window.setInterval(update, 1);
}(window))
