/*********** ENEMY ***********/
//Enemy Variables
var enemyPositionX = 0, // Enemy starting position
    enemyPositionY = 65 + 83,
    enemyWidth = 101,
    enemyHeight = 70,
    enemySpeed = [50, 150, 300],
    maxNumBugs = 4, // Maximum number of bugs
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
    // Enemies with random speed
    this.speed = randomNum(180, 80);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Reset enemy position once over canvas
    if(this.x > 820) {
        this.x = 0;

        // Random starting position after end of image
        var randomRowNum = randomNum(4, 1);
        // Enemy position on rock tile
        if (randomRowNum === 1) this.y = 65;
        if (randomRowNum === 2) this.y = 65 + 83;
        if (randomRowNum === 3) this.y = 65 + 83 * 2;
        if (randomRowNum === 4) this.y = 65 + 83 * 3;
    }

    // Enemy boundaries for detecing collision
    for(i = 0; i < allEnemies.length; i++) {
       enemies = {
           'x': allEnemies[i].x,
           'y': allEnemies[i].y,
           'w': enemyWidth,
           'h': enemyHeight
       };

       // Collision detection
       if(enemies.x < player.x + player.w && enemies.x + enemies.w > player.x &&
       enemies.y < player.y + player.h && enemies.y + enemies.h > player.y){
        if(!gameOver) {
            // If game is not game over then detect for enemy collision
            console.log("BANG!!!");
            collide();
        }
       }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Initiate enemies
function initiateEnemy() {
    for(i = 0; i < maxNumBugs; i++) {

    // Random starting position
    var randomRowNum = randomNum(4, 1);
    // Enemy position on rock tile
    if (randomRowNum === 1) this.y = 65;
    if (randomRowNum === 2) this.y = 65 + 83;
    if (randomRowNum === 3) this.y = 65 + 83 * 2;
    if (randomRowNum === 4) this.y = 65 + 83 * 3;

    // Create new enemies with random speed
    var enemy = new Enemy(-200, this.y, Enemy.speed);
    // Place all enemy objects in an array called allEnemies
    allEnemies.push(enemy);
    }
}

// Now instantiate your objects.
initiateEnemy();



/*********** PLAYER ***********/
// Now write your own player class

// Player Variables
var playerMoveX = 101,
    playerMoveY = 83,
    playerInitialPosX = 200,
    playerInitialPosY = 400,
    playerWidth = 75,
    playerHeight = 80,
    blockHeight = 83,
    blockWidth = 101,
    maxLife = 5;


// Place the player object in a variable called player
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.w = playerWidth;
    this.h = playerHeight;
    this.score = 0;

};

// Update player's position
// Parameter: dt, a time delta between two ticks for smooth animation
Player.prototype.update = function() {
    if(this.key === 'up') {
        this.y -= playerMoveY;
    } else if (this.key === 'down' && this.y < 483) {
        this.y += playerMoveY;
    } else if (this.key === 'left' && this.x > 0) {
        this.x  -= playerMoveX;
    } else if (this.key === 'right' && this.x < 606) {
        this.x  += playerMoveX;
    }
    this.key = null;

    // Reset if player on water
    if(this.y < 60) {
        collide();
    }

};

/* Update players position
*/
Player.prototype.handleInput = function(key) {
    this.key = key;
};

// Draw player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Initiate Player Object
var player = new Player(playerInitialPosX, playerInitialPosY);


/*********** PLAYER LIFE ***********/

// Players life before game over
var Life = function() {
    this.sprite = 'images/Heart.png';
    this.gameover = 'images/game-over.png';
    this.life = maxLife;

};

// Render life image
Life.prototype.render = function() {
    var x = 0;
    for(var i = 0; i < this.life; i++){
    ctx.drawImage(Resources.get(this.sprite), x, 610, 40, 70);
    x += 50;
}
    if(this.life === 0) {
        gameOver = true;

    }
};

// Decrease life
Life.prototype.update = function() {
    if(this.life > 0) {
        this.life -= 1;
    }
};

// Initiate player life
var playerLife = new Life();




/*********** GEM AND SCORE ***********/
//Gem Variables
var gemMaxNum = 5,
    allGems = [];
    gemWidth = 70;
    gemHeight = 50;
    gemPositionX = 115 + randomNum(7, 0) * blockWidth;
    gemPositionY = 101 + randomNum(4, 0) * blockHeight;

var Gem = function() {
    this.sprite = 'images/Gem Blue.png';
    this.x = gemPositionX;
    this.y = gemPositionY;
    this.w = gemWidth;
    this.h = gemHeight;
};

Gem.prototype.update = function() {
    // Collision detection
    if(gem.x < player.x + player.w && gem.x + gem.w > player.x &&
    gem.y < player.y + player.h && gem.y + gem.h > player.y){
        if(playerLife.life > 0){
    this.x = 115 + randomNum(7, 0) * blockWidth;
    this.y = 101 + randomNum(4, 0) * blockHeight;
    player.score += 30;
    console.log(player.score + " Points!");
    $("#score").html('<p>Score: ' + player.score + '</p>');
    }
    }
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 110);
};


// Initiate Gems
var gem = new Gem();


/*********** GAME OVER ***********/

var GameOver = function() {
    this.sprite = 'images/game-over.png';
};

GameOver.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),254, 303);
};

// Initiate game over
var game = new GameOver();


/*********** GLOBAL FUNCTIONS ***********/
var gameOver = false;
var gameStart = false;
var timeLimit = 30;

// Generate random numbers
function randomNum(a, b) {
    return Math.floor(Math.random() * a + b);
}

// Execute collision function
function collide() {
    player.x = playerInitialPosX;
    player.y = playerInitialPosY;
    playerLife.update();
    var audio = document.getElementById("audio");
    audio.play();

}

// Start game and timer
function start() {
    if (gameOver || !gameStart) {
        gameStart = true;
        countDown(timeLimit,"timer");
    }
}

// Game timer
function countDown(seconds, elem) {
    var element = document.getElementById(elem);

    if(gameStart){
        element.innerHTML = "<p>Timer: " +seconds+ "</p>";
        if (seconds < 1) {
            clearTimeout(timer);
            element.innerHTML = "TIMES UP!";
            gameOver = true;
            gameStart = false;
        } else if(gameOver){
            clearTimeout(timer);
            element.innerHTML = "NO MORE LIVES!";
        }

        seconds --;
        var timer = setTimeout('countDown('+seconds+', "'+elem+'")', 1000);
    }
}

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