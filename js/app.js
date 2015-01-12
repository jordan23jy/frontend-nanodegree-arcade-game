// Store all enemies in array


// Generate random numbers
function randomNum(a, b) {
    return Math.floor(Math.random() * a + b);
}

//Enemy Variables
var
    enemyPositionX = 1, // Enemy starting position
    enemyPositionY = 65 + 83,

    maxNumBugs = 5, // Maximum number of bugs
    allEnemies = []; // Store enemies in an array

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 820) {
        this.x = 0;
    }

};

function initiateObject() {
    // Generate random number between tiles
    var randomRowNum = randomNum(3, 1);
    // Enemy position on rock tile
    if (randomRowNum === 1) y = 65;
    if (randomRowNum === 2) y = 65 + 83;
    if (randomRowNum === 3) y = 65 + 83 * 2;
    var enemySpeed = randomNum(200, 100);
    var enemy = new Enemy(0, y, enemySpeed);
    allEnemies.push(enemy);
}

initiateObject();
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// No8w instantiate your objects.
/*function initiateEnemy() {
var enemy1 = new Enemy(0, 50, 1);
};
*/
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

// Player Variables
var playerMoveX = 101,
    playerMoveY = 83,
    playerInitialPosX = 200,
    playerInitialPosY = 400,
    blockHeight = 83,
    blockWidth = 101;


// Update player's position
// Parameter: dt, a time delta between two ticks for smooth animation
Player.prototype.update = function() {
    if(this.key === 'up') {
        this.y -= playerMoveY;
    } else if (this.key === 'down' && this.y < 400) {
        this.y += playerMoveY;
    } else if (this.key === 'left' && this.x > 0) {
        this.x  -= playerMoveX;
    } else if (this.key === 'right' && this.x < 606) {
        this.x  += playerMoveX;
    }
    this.key = null;

    if(this.y < 60) {
        this.y = playerInitialPosY;
        this.x = playerInitialPosX;
    }

};

// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Call objects
var player = new Player(playerInitialPosX, playerInitialPosY);


/* Update players position
*/
Player.prototype.handleInput = function(key) {
    this.key = key;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

