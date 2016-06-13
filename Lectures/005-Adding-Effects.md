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

### Add Animations

#### Load Player

![](http://f.cl.ly/items/2M0n403l0K010L1y0D1m/Screen%20Shot%202016-06-13%20at%209.24.18%20AM.png)

Above is a "spritesheet" in which each frame or subset of frames portrays a specific animation. Each 
frame is numbered from left to right:

http://f.cl.ly/items/240g3f0I0G3W1x2j2k1m/sprite_frames_numbered.png

#### Frame 0:
![](http://f.cl.ly/items/2D0K1J2E1S2J3x3U4329/player_0.png)

### Frames 1-2:
|  Movement |   Frames  |        |                                       |
|-----------|-----------------------------------|        |                                       |
| Stop      |   0       |       ![](http://f.cl.ly/items/1v0V0j1p3n082n451P1m/player_move_right.gif)

### Frames 1-2:

Moving Left: ![](http://f.cl.ly/items/2Q1m3U1D0y0o302W1m3D/player_move_left.gif)

We can replace `game.load.image('player', 'assets/player.png')` by this in the `load.js` file:

```js
game.load.spritesheet('player', 'assets/player2.png', 20, 20);
```

![](http://f.cl.ly/items/0R0A1A1J3s151y2G2n0u/Screen%20Shot%202016-06-13%20at%209.30.22%20AM.png)

![](http://f.cl.ly/items/2q471o1y2x2l3F0X0Y39/Screen%20Shot%202016-06-13%20at%209.37.44%20AM.png)

![](http://f.cl.ly/items/1W2j052U3B3z1G2R1D1u/Screen%20Shot%202016-06-13%20at%209.31.43%20AM.png)

![](http://f.cl.ly/items/383q283K0m3s0t3W0f3W/Screen%20Shot%202016-06-13%20at%209.32.36%20AM.png)

<sub>**Source:** All content (including images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>
