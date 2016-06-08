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
// Tell Phaser that the player will use the Arcade physics engine
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

<sub>**Source**:Discover Phaser: Learn how to make great HTML5 games. Author: Thomas Palef </sub>
