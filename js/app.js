const Enemy = function(y) { // Enemies constructor function
    this.freeToMove = true; // All enemies are free to move by default
    this.x = -101; // Enemy start position is 1 block before far left
    this.y = y; // Enemy vertical position
    this.speed = 150 * (Math.floor(Math.random() * 5) + 1); // Assign enemy speed randomly
    this.sprite = 'images/enemy-bug.png'; // Enemy character image
};

Enemy.prototype.update = function(dt) { // Update enemies objects
    
    if (this.freeToMove) { // Move enemy only if it's free to move (not freezed)
        this.x += dt * this.speed;
    }
    
    if (this.x > 808) { // When enemy reach far right, start again from left and assign new random speed
        this.x = -101;
        this.speed = 150 * (Math.floor(Math.random() * 5) + 1);;
    }
    
    if (this.y === (player.y - 13) // When an enemy and the player are too close
        && this.x > (player.x - 80)
        && this.x < (player.x + 60)) {
        freeze(this); // Freeze enemy
        freeze(player); // Freeze player
        message(lose); // Show the "lose" message
    }
};

Enemy.prototype.render = function() { // Draw the enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function () { // Player constructor function
    this.freeToMove = true; // Player free to move by default
    this.x = 303; // Start at 4th column
    this.y = 405; // Start at bottom row
    this.sprite = 'images/char-boy.png'; // Player character image
}

Player.prototype.update = function() { // Update player object
    if (this.y === -10) { // When player reach the other side successfully
        freeze(this); // Freeze player
        message(win); // Show the "win" message
    }
};

Player.prototype.render = function() { // Draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) { // Move player character according to the pressed key
    if (this.freeToMove) { // Only if the player is free to move (not freezed)
        if (direction === 'left') {
            this.x === 0 ? this.x = 606 : this.x -= 101; // Start from far right when player is at far left and left key pressed
        } else if (direction === 'right') {
            this.x === 606 ? this.x = 0 : this.x += 101; // Start from far left when player is at far right and right key pressed
        } else if (direction === 'up') {
            this.y -= 83; // Move player one block up
        } else if (direction === 'down' && this.y !== 405) {
            this.y += 83; // Move player one block down
        }  
    }
};

const allEnemies = [ // Generating new enemies
    new Enemy(60), // Top row enemy
    new Enemy(143), // middle row enemy
    new Enemy(226) // bottom row enemy
];

const player = new Player(); // Generate new player

document.addEventListener('keyup', function(e) { // Listen to keyboard arrow keys strokes
    const allowedKeys = {
        37: 'left', // left keyboard arrow key
        38: 'up', // up keyboard arrow key
        39: 'right', // right keyboard arrow key
        40: 'down' // down keyboard arrow key
    };

    player.handleInput(allowedKeys[e.keyCode]); 
});


function freeze(obj) { // Freeze object for some time, then release
    obj.freeToMove = false; // Freeze object
    setTimeout(function () {
        if (obj === player) { // Reset player position
            player.x = 303;
            player.y = 405;
        }
        obj.freeToMove = true; // Release object
    }, 750);
}

function message(state) { // Show message according to state
    state.style.display = 'inline-block'; // show message
    setTimeout(function() { // Remove message with animation after some time
        state.classList.add('zoomOutDown');
        setTimeout(function() { // Hide message and remove animation class to use it again
            state.classList.remove('zoomOutDown');
            state.style.display = 'none';
        }, 750)
    }, 400)
}