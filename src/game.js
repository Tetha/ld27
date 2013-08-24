(function(scope) {
    "use strict";
    var empty = " ";
    var wall = "wall";
    var core = "core";

    var crane_state_ceiling = "ceiling";
    var crane_state_placing = "placing";
    var crane_state_rising = "rising";

    var level = [
        [wall, wall , wall , wall , wall , wall , wall , wall , wall],
        [wall, empty, empty, empty, empty, empty, empty, empty, wall],   
        [wall, empty, empty, empty, empty, empty, empty, empty, wall],   
        [wall, empty, empty, empty, empty, empty, empty, empty, wall],   
        [wall, empty, wall , empty, wall , empty, wall , empty, wall],   
        [wall, wall , wall , wall , wall , wall , wall , wall , wall],
    ];
    
    var core = {
        x : 1,
        y : 2
    }

    var crane = {
        x : 1,
        y : 1,
        held_item : core,
        state : crane_state_placing,
        last_animation_tick : Date.now()
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
        var x = crane.x * 50;
        var y = crane.y * 50;
        
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
        var x = core.x * 50;
        var y = core.y * 50;

        var context = canvas.getContext('2d');
        context.fillStyle = "rgb(200, 127, 127)";
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
        if (crane.state == crane_state_placing) {
            var now = Date.now();
            if (1000 < now - crane.last_animation_tick) {
                crane.y += 1;
                if (crane.held_item != undefined) {
                    crane.held_item.y += 1;
                }
                crane.last_animation_tick = now;

                var y_offset_to_check;
                if (crane.held_item == undefined) {
                    var check_y = crane.y + 1;
                    var check_x = crane.x;
                    if (check_x == core.x && check_y == core.y) {
                        crane.held_item = core;
                        crane.state = crane_state_rising;
                    } else if (level[check_y][check_y] == wall) {
                        crane.state = crane_state_rising;
                    }
                } else {
                    if (level[crane.y + 2][crane.x] == wall) {
                        crane.held_item = undefined;
                        crane.state = crane_state_rising;
                    }
                }
            }        
        }

        if (crane.state == crane_state_rising) {
            var now = Date.now();
            if (1000 < now - crane.last_animation_tick) {
                crane.y -= 1;
                if (crane.held_item != undefined) {
                    crane.held_item.y -= 1;
                }
                crane.last_animation_tick = now;
                if (crane.y == 1) {
                    crane.state = crane_state_ceiling;
                }
            }        
        }

        if (key_down in keysDown && crane.state == crane_state_ceiling) {
            crane.state = crane_state_placing;
        }

        if (key_left in keysDown) {
            if (crane.state == crane_state_ceiling) {
                if (2 <= crane.x) {
                    crane.x -= 1;
                    if (crane.held_item != undefined) {
                        crane.held_item.x -= 1;
                    }
                }
                delete keysDown[key_left];
            }
        }

        if (key_right in keysDown) {
            if (crane.state == crane_state_ceiling) {
                if (crane.x <= 6) {
                    crane.x += 1;
                    if (crane.held_item != undefined) {
                        crane.held_item.x += 1;
                    }
                }
                delete keysDown[key_right];
            }
        }
        draw_level();
        draw_crane();
        draw_reactor();
    }

    window.setInterval(update, 1);}(window))
