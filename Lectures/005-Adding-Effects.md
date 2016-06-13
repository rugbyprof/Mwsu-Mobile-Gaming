## Adding Effects

![](http://f.cl.ly/items/0R0A1A1J3s151y2G2n0u/Screen%20Shot%202016-06-13%20at%209.30.22%20AM.png)

### Sounds

#### Browser Compatibility

Sadly in the world of "internet programming" compatability between browsers has been, and always will be an issue. This means one browser interprets the "standard" slightly differently, while other browsers accept certain instruction sets that other don't. 

One such compatability issue is "sound files". Not all browsers play all sound files. Here is a summary:

|   | Chrome | Firefox | IE | Safari |
|---|--------|---------|----|--------|
|**wav** |Yes |Yes |No |Yes|   |
|**mp3** |Yes |No |Yes |Yes|   |
|**ogg** |Yes |Yes |No |No|   |

Best practice: Using `mp3` and `ogg` files. 

### Loading Sounds

***`load.js`***
```js
// Sound when the player jumps
game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
// Sound when the player takes a coin
game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
// Sound when the player dies
game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
```
***`play.js`***
```js
this.jumpSound = game.add.audio('jump');
this.coinSound = game.add.audio('coin');
this.deadSound = game.add.audio('dead');
```

***`play.js`***
```js
// Add this inside the 'movePlayer' function, in the 'if(player jumps)'
this.jumpSound.play();
// Put this in the 'takeCoin' function
this.coinSound.play();
// And this in the 'playerDie' function
this.deadSound.play();
```

### Background Music

Watch out for large music files!

```js
// Load the music in 2 different formats in the load.js file
game.load.audio('music', ['assets/music.ogg', 'assets/music.mp3']);
// Add and start the music in the 'create' function of the play.js file
// Because we want to play the music when the play state starts
this.music = game.add.audio('music'); // Add the music
this.music.loop = true; // Make it loop
this.music.play(); // Start the music
// And don't forget to stop the music in the 'playerDie' function
// Otherwise the music would keep playing
this.music.stop();
```

### More About Sounds

```js
// Change the volume of the sound (0 = mute, 1 = full sound)
sound.volume = 0.5;
// Increase the volume from 0 to 1 over the duration specified
sound.fadeIn(duration);
// Decrease the volume from its current value to 0 over the duration
sound.fadeOut(duration);
```

The fadeIn and fadeOut functions are especially usefull when playing a background music.

## Add Animations

#### Load Player

![](http://f.cl.ly/items/2M0n403l0K010L1y0D1m/Screen%20Shot%202016-06-13%20at%209.24.18%20AM.png)

Above is a "spritesheet" in which each frame or subset of frames portrays a specific animation. Each 
frame is numbered from left to right:

![alt][1]

Think of a sprite as a big image in which the whole image gets moved so the "frame" we want to see
is highlighted in the viewing window:

|Frame #|      |
|-------|------|
|0|![alt][2]|
|1|![alt][3]|
|2|![alt][4]|
|3|![alt][5]|
|4|![alt][6]|

### Movements:
|  Movement |   Frames  |    Sprite   |  Animation |
|-----------|-----------|--------------|-----------|      
| Stop      |   0       |    ![alt][2]  |   ![alt][7] |
| Left      |   3-4      |    ![alt][11]  |   ![alt][10] |
| Right      |   1-2      |    ![alt][12]  |   ![alt][9] |


We can replace `game.load.image('player', 'assets/player.png')` by this in the `load.js` file:

```js
game.load.spritesheet('player', 'assets/player2.png', 20, 20);
```

### Add Animations

Adding a sprite is like adding an image, but we need to give more information:

- `animations.add(name, frames, frameRate, loop)`
    - **name**: name of the animation.
    - **frames**: an array with the frames to add in the right order.
    - **frameRate**: the speed at which the animation should play, in frames per second.
    - **loop**: if set to true the animation will loop indefinitely.

**play.js** (create)
```js
// Create the 'right' animation by looping the frames 1 and 2
this.player.animations.add('right', [1, 2], 8, true);
// Create the 'left' animation by looping the frames 3 and 4
this.player.animations.add('left', [3, 4], 8, true);
```

### Play Animations

**play.js** (movePlayer)
```js
movePlayer: function() {
    if (this.cursor.left.isDown) {
        this.player.body.velocity.x = -200;
        this.player.animations.play('left'); // Left animation
    }
    else if (this.cursor.right.isDown) {
        this.player.body.velocity.x = 200;
        this.player.animations.play('right'); // Right animation
    }
    else {
        this.player.body.velocity.x = 0;
        this.player.animations.stop(); // Stop animations
        this.player.frame = 0; // Change frame (stand still)
    }
    // Then no changes to the jump code
},
```

## Adding Tweens

- A "tween" is a change in an object over time.
- For example:
    - moving a sprite from A to B in x seconds. 
    - rotate a label indefinitely.
    - scale down a lable smoothly.
    - etc.

![](http://f.cl.ly/items/0R0A1A1J3s151y2G2n0u/Screen%20Shot%202016-06-13%20at%209.30.22%20AM.png)

### Tween 1 - Move Label

***menu.js***
```js

// Changed the y position to -50 so we don't see the label
var nameLabel = game.add.text(game.width/2, -50, 'Super Coin Box', { font: '50px Arial', fill: '#ffffff' });

// Create a tween on the label
var tween = game.add.tween(nameLabel);

// Change the y position of the label to 80 in 1000 ms
tween.to({y: 80}, 1000);

// Start the tween
tween.start();
```
- Moves lable from initial position (y=-50) to (y=80)
- Could be combined like:
```js
game.add.tween(nameLabel).to({y: 80}, 1000).start(); 
```

- Default is straight line at constant speed
- We can change this with an easing function:

***menu.js*** (create)
```
game.add.tween(nameLabel).to({y: 80}, 1000).easing(Phaser.Easing.Bounce.Out).start();
```

### Tween 2 - Rotate Label

Rotating the Label:

```js
// Create the tween
var tween = game.add.tween(startLabel);
// Rotate the label to -2 degrees in 500ms
tween.to({angle: -2}, 500);
// Then rotate the label to +2 degrees in 1000ms
tween.to({angle: 2}, 1000);
// And get back to our initial position in 500ms
tween.to({angle: 0}, 500);
// Loop indefinitely the tween
tween.loop();
// Start the tween
tween.start();
```

Combine this:

***menu.js*** (create)

```js
game.add.tween(startLabel).to({angle: -2}, 500).to({angle: 2}, 1000)
.to({angle: 0}, 500).loop().start();
```

### Tween 3 - Scale Coin

- Scale means to enlarge or shrink. 
- The following will scale the coin when it appears.
- Scaling x and y at the same time is doable:

(takeCoin)
```js
// Scale the coin to 0 to make it invisible
this.coin.scale.setTo(0, 0);
// Grow the coin back to its original scale in 300ms
game.add.tween(this.coin.scale).to({x: 1, y: 1}, 300).start();
```

### Tween 4 - Scale Player

- Here’s a last example: each time we take a coin we want to see the player grow slightly for a short amount of time. 
- To do so we add this in the takeCoin function
- The `yoyo` function is the opposite of what we did to the coin

(takeCoin)
```js
game.add.tween(this.player.scale).to({x: 1.3, y: 1.3}, 100).yoyo(true).start();
```

### More About Tweens

- Anything that has a number can be tweened. 
- So it can be: 
    - x/y position, 
    - angle, 
    - x/y scale, 
    - alpha, 
    - volume (for a sound), etc.

```js
// Add a 100ms delay before the tween starts
tween.delay(100);

// Repeat the tween 5 times
tween.repeat(5);

// Stop the tween
tween.stop();

// Return true if the tween is currently playing
tween.isRunning;

// Will call 'callback' once the tween is finished
tween.onComplete.add(callback, this);

// And there are lots of other easing functions you can try, like:
tween.easing(Phaser.Easing.Sinusoidal.In);
tween.easing(Phaser.Easing.Exponential.Out);
```

## Adding Particles

Examples:

- Explosions
- Rain
- Dust

![](http://f.cl.ly/items/1n022j2g160V1q1Y2o0G/Screen%20Shot%202016-06-13%20at%202.17.39%20PM.png)

###  Load Particle

***load.js*** (preload)
```js
game.load.image('pixel', 'assets/pixel.png');
```

### Create Emitter

We need to use an `emitter` to create the particles:

- `game.add.emitter(x, y, maxParticles)`
    - ***x***: the x position of the emitter.
    - ***y***: the y position of the emitter.
    - ***maxParticles***: the total number of particles in the emitter.

- Setting the x and y speed like below means that the particles will go in every possible direction. 
- For example, if we did `this.emitter.setXSpeed(0, 150)`, we wouldn’t see any particles going to the left.

***play.js*** (create)
```js
// Create the emitter with 15 particles. We don't need to set the x y
// Since we don't know where to do the explosion yet
this.emitter = game.add.emitter(0, 0, 15);

// Set the 'pixel' image for the particles
this.emitter.makeParticles('pixel');

// Set the x and y speed of the particles between -150 and 150
// Speed will be randomly picked between -150 and 150 for each particle
this.emitter.setYSpeed(-150, 150);
this.emitter.setXSpeed(-150, 150);

// Scale the particles from 2 time their size to 0 in 800ms
// Parameters are: startX, endX, startY, endY, duration
this.emitter.setScale(2, 0, 2, 0, 800);

// Use no gravity
this.emitter.gravity = 0;
```
### Start Emitter

- `start(explode, lifespan, frequency, quantity)`
    - ***explode***: whether the particles should all burst out at once (true) or at a given frequency (false).
    - ***lifespan***: how long each particle lives once emitted in ms.
    - ***frequency***: if explode is set to false, define the delay between each particles in ms.
    - ***quantity***: how many particles to launch.

(playerDie)
```js
playerDie: function() {
    // Set the position of the emitter on top of the player
    this.emitter.x = this.player.x;
    this.emitter.y = this.player.y;
    // Start the emitter by exploding 15 particles that will live 800ms
    this.emitter.start(true, 800, null, 15);
    // Play the sound and go to the menu state
    this.deadSound.play();
    game.state.start('menu');
},
```

### Add Delay

***play.js*** (new function)
```js
startMenu: function() {
    game.state.start('menu');
},
```

(playerDie)
```js
playerDie: function() {
    // Kill the player to make it disappear from the screen
    this.player.kill();
    // Start the sound and the particles
    this.deadSound.play();
    this.emitter.x = this.player.x;
    this.emitter.y = this.player.y;
    this.emitter.start(true, 800, null, 15);
    
    // Call the 'startMenu' function in 1000ms
    game.time.events.add(1000, this.startMenu, this);
},
```

>The game.time.events.add function works like game.time.events.loop that we used to create the enemies, except that it will call the function only once.

### Fix Sound

Falling in the Hole????

(update function)
```js
// quiz
```

### More Particles

```js
// Emit different particles
emitter.makeParticles(['image1', 'image2', 'image3']);
// Set min and max rotation velocity
emitter.setRotation(min, max);
// Change the alpha value over time
emitter.setAlpha(startAlpha, endAlpha, duration);
// Change the size of the emitter
emitter.width = 69;
emitter.height = 42;
```

## Better Camera

### Flash Effect

![](http://f.cl.ly/items/0d0i2S3K0H3o1p0l1f19/Screen%20Shot%202016-06-13%20at%202.30.02%20PM.png)

(playerDie)
```js
// Flash the color white for 300ms
game.camera.flash(0xffffff, 300);
```

###Shake Effect

```js
// Shake for 300ms with an intensity of 0.02
game.camera.shake(0.02, 300);
```

## Improvements

![](http://f.cl.ly/items/2q471o1y2x2l3F0X0Y39/Screen%20Shot%202016-06-13%20at%209.37.44%20AM.png)

![](http://f.cl.ly/items/1W2j052U3B3z1G2R1D1u/Screen%20Shot%202016-06-13%20at%209.31.43%20AM.png)

![](http://f.cl.ly/items/383q283K0m3s0t3W0f3W/Screen%20Shot%202016-06-13%20at%209.32.36%20AM.png)

<sub>**Source:** All content (including images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>

[1]: http://f.cl.ly/items/3R1F2I1q2h0y3Q1I0t3M/sprite_frames.png "frames"
[2]: http://f.cl.ly/items/0D3s0V0o1K193P1W0i1H/sprite_frame_0.png  "frame 0"
[3]: http://f.cl.ly/items/0V2M0B3A2j3m2p1w1x0o/sprite_frame_1.png  "frame 1"
[4]: http://f.cl.ly/items/1N2y0Y2N3o012Y0b1L1A/sprite_frame_2.png  "frame 2"
[5]: http://f.cl.ly/items/3n1d3H0P3K062K2U2v3d/sprite_frame_3.png "frame 3"
[6]: http://f.cl.ly/items/0p1u3O3c1r0d3Q400Y1H/sprite_frame_4.png "Frame 4"
[7]: http://f.cl.ly/items/2D0K1J2E1S2J3x3U4329/player_0.png "player 0"
[9]: http://f.cl.ly/items/0C3B3c2d3r1w0z1M0B0X/sprite_move_right.gif "move player right"
[10]:http://f.cl.ly/items/3M3Y3j1w1D1M24070v0U/sprite_move_left.gif "move player left"
[11]:http://f.cl.ly/items/241C1r1k3k3n3U0B2c35/sprite_move_left_all.gif "move player left all"
[12]:http://f.cl.ly/items/1Y0D0e3r123g1S2u353z/sprite_move_right_all.gif "move player right all"
