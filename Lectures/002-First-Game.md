## Game Intro

Using the [first phaser](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/001-SpinningSprite) example as a template

### Game Background Color

```js
game.stage.backgroundColor = '#3498db';
```

### Physics Engine

One of the great features of Phaser is that it has 3 physics engines included. A physics
engine will manage the collisions and movements of all the objects in the game.

The 3 engines available are:
- P2. It’s a full featured physics system for games with complex collisions, like Angry Birds.
- Ninja. It’s less powerful than P2, but still has some interesting features to handle tilemaps and slopes.
- Arcade. It’s a system that only deals with rectangle collisions (called AABB), but it also has the best performance.

Adding game physics to our game:

```js
game.physics.startSystem(Phaser.Physics.ARCADE);
```


### Crisp Pixels
We are going to use pixel art for the sprites of our game. In order to have them always
look crisp, we should add this line in the create function:
```js
game.renderer.renderSession.roundPixels = true;
```

### Adding a player
```js
game.load.image('player', 'assets/player.png');
```

### Display the Player
Load the sprite, then display it using: `game.add.sprite`.
- `game.add.sprite(positionX, positionY, imageName)`
    - positionX: horizontal position of the sprite.
    - positionY: vertical position of the sprite.
    - imageName: the name of the image, as defined in the preload function.

`0 0` would be in the top left corner of the game.

Adding the player (few different ways)
```js
// Create a local variable with 'var player'
var player = game.add.sprite(250, 170, 'player');

// Create a state variable with 'this.player'
this.player = game.add.sprite(250, 170, 'player');

// Using predefined vars to center the image
this.player = game.add.sprite(game.width/2, game.height/2, 'player');
```

### Anchor Point

![](http://f.cl.ly/items/0S1x3Z061X0e0X3U0e3G/Screen%20Shot%202016-06-08%20at%202.01.05%20PM.png)

```js
// Set the anchor point to the top left of the sprite (default value)
this.player.anchor.setTo(0, 0);
// Set the anchor point to the top right
this.player.anchor.setTo(1, 0);
// Set the anchor point to the bottom left
this.player.anchor.setTo(0, 1);
// Set the anchor point to the bottom right
this.player.anchor.setTo(1, 1);
```
![](http://f.cl.ly/items/3Z2g2f221a1I2t202K07/Screen%20Shot%202016-06-08%20at%202.02.01%20PM.png)

To center the player we can use??

### Gravity

```js
// Tell Phaser that the player will use the Arcade physics engine in the create function
game.physics.arcade.enable(this.player);
// Add vertical gravity to the player
this.player.body.gravity.y = 500;
```

### Control the Player
There are a couple of things that need to be done if we want to move the player around with the arrow keys.
First we have to tell Phaser which keys we want to use in our game. For the arrow keys we add this in the create function:
```js
this.cursor = game.input.keyboard.createCursorKeys();
```

#### Move Player Function

```js
movePlayer: function() {
  // If the left arrow key is pressed
  if (this.cursor.left.isDown) {
    // Move the player to the left
    // The velocity is in pixels per second
    this.player.body.velocity.x = -200;
  }
  // If the right arrow key is pressed
  else if (this.cursor.right.isDown) {
    // Move the player to the right
    this.player.body.velocity.x = 200;
  }
  // If neither the right or left arrow key is pressed
  else {
    // Stop the player
    this.player.body.velocity.x = 0;
  }
  // If the up arrow key is pressed and the player is on the ground
  if (this.cursor.up.isDown && this.player.body.touching.down) {
    // Move the player upward (jump)
    this.player.body.velocity.y = -320;
  }
}
```

Add `this.movePlayer();` to the `update` function. 

### More About Sprites


Sprites have lots of methods, here are some notable ones:

```js
// Change the position of the sprite
sprite.x = 21;
sprite.y = 21;
// Return the width and height of the sprite
sprite.width;
sprite.height;
// Change the transparency of the sprite, 0 = invisible, 1 = normal
sprite.alpha = 0.5;
// Change the angle of the sprite, in degrees
sprite.angle = 42;
// Change the color of the sprite
sprite.tint = 0xff0000;
// Remove the sprite from the game
sprite.kill();
// Return false if the sprite was killed
sprite.alive;
```

### Adding Walls

Attempt 1:
```js
// Create the left wall
var leftWall = game.add.sprite(0, 0, 'wallV');

// Add Arcade physics to the wall (for collisions with the player)
game.physics.arcade.enable(leftWall);

// Set a property to make sure the wall won't move
// We don't want to see it fall when the player touches it
leftWall.body.immovable = true;

// Do the same for the right wall
var rightWall = game.add.sprite(480, 0, 'wallV');
game.physics.arcade.enable(rightWall);
rightWall.body.immovable = true;
```

Attempt 2:

```js
// Create a new group
this.walls = game.add.group();

// Add Arcade physics to the whole group
this.walls.enableBody = true;

// Create 2 walls in the group
game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left wall
game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right wall

// Set all the walls to be immovable
this.walls.setAll('body.immovable', true);
```

Final Attempt:
```js
createWorld: function() {
    // Create our group with Arcade physics
    this.walls = game.add.group();
    this.walls.enableBody = true;
    // Create the 10 walls in the group
    game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
    game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right
    game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
    game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
    game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
    game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right
    game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
    game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right
    var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
    middleTop.scale.setTo(1.5, 1);
    var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
    middleBottom.scale.setTo(1.5, 1);
    // Set all the walls to be immovable
    this.walls.setAll('body.immovable', true);
```

Now call the function `this.createWorld();` in the `create` method.

### Collisions

```js
// Tell Phaser that the player and the walls should collide
game.physics.arcade.collide(this.player, this.walls);
```

### Make the Player Die

```js
playerDie: function() {
    game.state.start('main');
}

// Check to see if the player leaves the world to kill them.

if (!this.player.inWorld) {
    this.playerDie();
}
```

### Adding Coins

Add the coin:
```js
game.load.image('coin', 'assets/coin.png');
```

Create the coin:
```js
// Display the coin
this.coin = game.add.sprite(60, 140, 'coin');
// Add Arcade physics to the coin
game.physics.arcade.enable(this.coin);
// Set the anchor point to its center
this.coin.anchor.setTo(0.5, 0.5);
```

### Display the Score

- `game.add.text(positionX, positionY, text, style)`
    - positionX: position x of the text.
    - positionY: position y of the text.
    - text: text to display.
    - style: style of the text.
    
```js
// Display the score
this.scoreLabel = game.add.text(30, 30, 'score: 0', { font: '18px Arial', fill: '#ffffff' });
// Initialize the score variable
this.score = 0;
```

### Keeping Score (Collisions) 

- `game.physics.arcade.overlap(objectA, objectB, callback, process, context)`
    - objectA: the first object to check.
    - objectB: the second object to check.
    - callback: the function that gets called when the 2 objects overlap.
    - process: if this is set then callback will only be called if process returns true.
    - context: the context in which to run the callback, most of the time it will be this.

Function to "take" a coin:
```js
takeCoin: function(player, coin) {
// Kill the coin to make it disappear from the game
this.coin.kill();
// Increase the score by 5
this.score += 5;
// Update the score label by using its 'text' property
this.scoreLabel.text = 'score: ' + this.score;
}
```

Add to the update function (notice the callback parameter):
```js
game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
```
### Moving the Coin

**Attempt 1:**

```js
// Return a random integer between a and b
var number = game.rnd.integerInRange(a, b);
// Change the coin's position to x, y
this.coin.reset(x, y);
```
So we could replace the this.coin.kill in the takeCoin function by something like this:

```js
// Get 2 random numbers
var newX = game.rnd.integerInRange(0, game.width);
var newY = game.rnd.integerInRange(0, game.height);
// Set the new coin position
this.coin.reset(newX, newY);
```
 Problems??
 
 
**Attempt 2:**
```js
 updateCoinPosition: function() {
    // Store all the possible coin positions in an array
    var coinPosition = [
        {x: 140, y: 60}, {x: 360, y: 60}, // Top row
        {x: 60, y: 140}, {x: 440, y: 140}, // Middle row
        {x: 130, y: 300}, {x: 370, y: 300} // Bottom row
    ];
    // Remove the current coin position from the array
    // Otherwise the coin could appear at the same spot twice in a row
    for (var i = 0; i < coinPosition.length; i++) {
        if (coinPosition[i].x == this.coin.x) {
            coinPosition.splice(i, 1);
        }
    }
    // Randomly select a position from the array with 'game.rnd.pick'
    var newPosition = game.rnd.pick(coinPosition);
    // Set the new position of the coin
    this.coin.reset(newPosition.x, newPosition.y);
}
```

New TakeCoin function:
```js
takeCoin: function(player, coin) {
// Update the score
this.score += 5;
this.scoreLabel.text = 'score: ' + this.score;
// Change the coin position
this.updateCoinPosition();
}
```

<sub>**Source:** All content (including images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>
