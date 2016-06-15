## Tilemaps

![](https://s3.amazonaws.com/cloud.ohloh.net/attachments/21365/about-tiled-logo-square_med.png)

Download "Tiled" [here](http://www.mapeditor.org/download.html)

![](http://f.cl.ly/items/0A452O0S0s0N2X1G3X0G/Screen%20Shot%202016-06-15%20at%2010.36.46%20AM.png)

### Definitions:

- Tile: a small image that represents a tiny part of a level.
- Tileset: a spritesheet that contains all the different tiles.
- Tilemap: the level, stored as a 2 dimensional array of tiles.

A tile looks like this:

![](http://f.cl.ly/items/3e443Y3Q2Q1E1P1t0K2Q/Screen%20Shot%202016-06-15%20at%2010.37.11%20AM.png)

The left side is the walls, and the right side will be used for the holes of doom.

## New Tile Map

#### New Map 1:

Open the tiled app and do the following:

Looking at the "Top Menu":

- File
    - New
        - Now fill out the dialog box like you see below:


![](http://f.cl.ly/items/0Q3H1G2w2x0a0o1L0s0j/Screen%20Shot%202016-06-15%20at%2010.37.22%20AM.png)

#### New Map 2:

Looking at the "Top Menu":

- Map
    - New Tileset
        - Now fill out the dialog box like you see below.
        - Browse and choose the "tileset.png" image in your assets folder of your program.

![](http://f.cl.ly/items/0f010i1J1c3u373F0m0n/Screen%20Shot%202016-06-15%20at%2010.37.29%20AM.png)


#### New Map 3:

Looking at the "Top Menu":

- Map
    - Map Properties
        - Set the background color to blue (see below).
        - Double click on the color box to see a color picker dialogue box.
        
![](http://f.cl.ly/items/3j2y3O1d1p2e3L3h2u0G/Screen%20Shot%202016-06-15%20at%2010.47.34%20AM.png)

#### Your New Empty Map

Notice your "tile" in the bottom right hand side (the black and red tile).

![](http://f.cl.ly/items/250L1U3V0U113f3K1o3V/Screen%20Shot%202016-06-15%20at%2010.37.39%20AM.png)

## The Tilemap

To create a new map we need the "stamp" tool and the "eraser" tool. See below:

![](http://f.cl.ly/items/1z3E263s0l3G083c0B03/Screen%20Shot%202016-06-15%20at%2010.37.49%20AM.png)

To draw a map, pick the "stamp" tool from the menu bar, then choose either side of your tile (from the bottom right). The black side is for walls, the red side is for the holes. We could do this a bunch of different ways, but this is a simple example showing a tile with two frames.

When your done with your level, save it:

Looking at the "Top Menu":

- File
    - Save
        - Select the `json` output format
        - Call your file "map.json" 

![](http://f.cl.ly/items/153S1K0v3c3j1x2Z1q1d/Screen%20Shot%202016-06-15%20at%2010.37.57%20AM.png)

Here is an example of a different level configuration. 

![](http://f.cl.ly/items/0S2L0F3T21352l3x312e/Screen%20Shot%202016-06-15%20at%2010.38.09%20AM.png)

## Use Tilemap

### Load

***`load.js`*** 
```js
// Load the tileset information
game.load.image('tileset', 'assets/tileset.png');
game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);

//REMOVE the wall assets
game.load.image('wallV', 'assets/wallVertical.png');
game.load.image('wallH', 'assets/wallHorizontal.png');
```

### Display 

Replace the changeWorld function to use our new assets:

***`play.js`*** (createWorld)
```js
createWorld: function() {
    // Create the tilemap
    this.map = game.add.tilemap('map');
    
    // Add the tileset to the map
    this.map.addTilesetImage('tileset');
    
    // Create the layer by specifying the name of the Tiled layer
    this.layer = this.map.createLayer('Tile Layer 1');

    // Set the world size to match the size of the layer
    this.layer.resizeWorld();
    
    // Enable collisions for the first tilset element (the blue wall)
    this.map.setCollision(1);
},
```

### Collisions

The walls are gone! And we now are using a tilemap, so we need to amend our physics in the `update` function:

***`play.js`*** (update)
```js
// Replaced 'this.walls' by 'this.layer'
game.physics.arcade.collide(this.player, this.layer);
game.physics.arcade.collide(this.enemies, this.layer);
```
We need to replace `body.touching.down` with `body.onFloor` because were using tiles and not "walls".

### Jump
***`play.js`*** (update)
```js
if ((this.cursor.up.isDown || this.wasd.up.isDown) && this.player.body.onFloor()) {
    this.jumpSound.play();
    this.player.body.velocity.y = -320;
}
```
<sub>**Source:** All content (including some images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>
