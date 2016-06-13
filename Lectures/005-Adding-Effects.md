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

![alt][1]

Think of a sprite as a big image in which the whole image gets moved so the "frame" we want to see
is highlighted in the viewing window:

![alt][2]
![alt][3]
![alt][4]
![alt][5]
![alt][6]

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

![](http://f.cl.ly/items/0R0A1A1J3s151y2G2n0u/Screen%20Shot%202016-06-13%20at%209.30.22%20AM.png)

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
