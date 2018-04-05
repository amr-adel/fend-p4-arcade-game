// Global variables
const columnWidth = 101;   // Single block width
const rowHeight = 83;      // Single block height
const bottomRow = 405;     // The bottom most row on canvas


// Enemies constructor function
const Enemy = function(y) {
    // All enemies are free to move by default
    this.freeToMove = true;
    
    // Enemy start position is 1 block before far left
    this.x = -columnWidth;
    
    // Enemy vertical position
    this.y = y;
    
    // Assign enemy speed randomly
    this.speed = 150 * (Math.floor(Math.random() * 5) + 1);
    
    // Enemy character image
    this.sprite = 'images/enemy-bug.png';
};


// Update enemies objects
Enemy.prototype.update = function(dt) {
    
    if (this.freeToMove) { // Move enemy only if it's free to move (not freezed)
        this.x += dt * this.speed;
    }
    
     // If enemy has reached far right, start again from the left and assign new random speed
    if (this.x > (columnWidth * 8)) {
        this.x = -columnWidth;
        this.speed = 150 * (Math.floor(Math.random() * 5) + 1);;
    }
    
    // If an enemy and the player are too close
    if (this.y === (player.y - 13)
        && this.x > (player.x - 80)
        && this.x < (player.x + 60)) {
        // Freeze enemy
        freeze(this);
        
        // Freeze player
        freeze(player);
        
        // Show the "lose" message
        message(lose);
    }
};


// Draw enemy on screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player constructor function
const Player = function () {
    // Player is free to move by default
    this.freeToMove = true;
    
    // Start at 4th column
    this.x = columnWidth * 3;
    
    // Start at bottom most row
    this.y = bottomRow;
    
    // Player character image
    this.sprite = 'images/char-boy.png';
}


// Update player object
Player.prototype.update = function() {
    // If player has reached the winning row successfully
    if (this.y === -10) {
        // Freeze player
        freeze(this);
        
        // Show the "win" message
        message(win);
    }
};


// Draw player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Move player character according to the pressed key
Player.prototype.handleInput = function(direction) {
    if (this.freeToMove) { // Only if the player is free to move (not freezed)
        
        if (direction === 'left') {
            // Start from far right when player is at far left and the left key pressed
            this.x === 0 ? this.x = (columnWidth * 6) : this.x -= columnWidth;
            
        } else if (direction === 'right') {
            // Start from far left when player is at far right and the right key pressed
            this.x === (columnWidth * 6) ? this.x = 0 : this.x += columnWidth;
            
        } else if (direction === 'up') {
            // Move player one row up
            this.y -= rowHeight;
            
        } else if (direction === 'down' && this.y !== bottomRow) {
            // Move player one row down
            this.y += rowHeight;
        }  
    }
};


// Generating new enemies
const allEnemies = [
    // Top track enemy
    new Enemy(60),
    
    // middle track enemy
    new Enemy(143),
    
    // bottom track enemy
    new Enemy(226)
];


// Generate new player
const player = new Player();


// Listen to keyboard arrow keys strokes
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        // left keyboard arrow key
        37: 'left',
        
        // up keyboard arrow key
        38: 'up',
        
        // right keyboard arrow key
        39: 'right',
        
        // down keyboard arrow key
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]); 
});


// Freeze object for some time, then release
function freeze(obj) {
    // Freeze object
    obj.freeToMove = false;
    
    setTimeout(function () {
        // Release object
        obj.freeToMove = true;
        
        if (obj === player) { // Reset player position after release
            player.x = columnWidth * 3;
            player.y = bottomRow;
        };
    }, 750);
}


// Show message according to state
function message(state) {
    // show message
    state.style.display = 'inline-block';
    
    // Remove message with animation after some time
    setTimeout(function() {
        state.classList.add('zoomOutDown');
        
        // Hide message and remove animation class to use it again
        setTimeout(function() {
            state.classList.remove('zoomOutDown');
            state.style.display = 'none';
        }, 750)
    }, 400)
}