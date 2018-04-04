// Enemies our player must avoid
const Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.freeToMove = true;
    this.x = -101;
    this.y = y;
    this.speed = 150 * (Math.floor(Math.random() * 5) + 1);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.freeToMove) {
        this.x += dt * this.speed;
    }
    
    if (this.x > 808) {
        this.x = -101;
        this.speed = 150 * (Math.floor(Math.random() * 5) + 1);;
    }
    
    if (this.y === (player.y - 13)
        && this.x > (player.x - 80)
        && this.x < (player.x + 60)) {
        freeze(this);
        freeze(player);
        message(lose);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function () {
    this.x = 303;
    this.y = 405;
    this.freeToMove = true;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    if (this.y === -10) {
        freeze(this);
        message(win);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.freeToMove) {
        this.x === 0 ? this.x = 606 : this.x -= 101;
    } else if (direction === 'right' && this.freeToMove) {
        this.x === 606 ? this.x = 0 : this.x += 101;
    } else if (direction === 'up' && this.freeToMove) {
        this.y -= 83;
    } else if (direction === 'down' && this.y !== 405 && this.freeToMove) {
        this.y += 83;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [new Enemy(60),
                   new Enemy(143),
                   new Enemy(226)
                   ];
// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function freeze(obj) {
    obj.freeToMove = false;
    setTimeout(function () {
        if (obj === player) {
            player.x = 303;
            player.y = 405;
        }
        obj.freeToMove = true;
    }, 750);
}

function message(state) {
    state.style.display = 'inline-block';
    setTimeout(function() {
        setTimeout(function() {
            state.classList.remove('zoomOutDown');
            state.style.display = 'none';
        }, 750)
        state.classList.add('zoomOutDown');
    }, 400)
}