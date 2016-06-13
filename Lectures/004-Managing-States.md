## Manage States

![](https://s3.amazonaws.com/f.cl.ly/items/0l2T1C1V2I283v0V3j1Q/Screen%20Shot%202016-06-13%20at%209.19.14%20AM.png)

### Organization

Issues:

- We need to start playing as soon as the game loads.
- Each time the game restarts all assets are re-loaded.
- We don’t have any menu to display the game’s name, controls, or score.

### What is a State

- A part of the game
- A scene

Scenes only share:
- preloaded assets
- global variables

Existing Organization:
```js
// Create one state called 'oneState'
var oneState = {
    // Define all the functions of the state
    preload: function() {
        // This function will be executed at the beginning
    },
    create: function() {
        // This function is called after the preload function
    },
    update: function() {
        // This function is called 60 times per second
    },
    // And maybe add some other functions
};
```

### New States

4 States organized like so:

![](https://s3.amazonaws.com/f.cl.ly/items/1p073k1M3A363J0m0R44/Screen%20Shot%202016-06-13%20at%209.20.54%20AM.png)

- **Boot**. This is the first state of the game.
- **Load**. It will load all the game’s assets.
- **Menu**. That’s the menu of the game.
- **Play**. This is where the actual game will be played. When dying, we will go back
to the menu.

### File Structure

![](https://s3.amazonaws.com/f.cl.ly/items/3L0W2G0M1G1F3U0X3J1d/Screen%20Shot%202016-06-13%20at%209.21.31%20AM.png)


### index.html

```js
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title> First game </title>
        <script type="text/javascript" src="phaser.min.js"></script>
        <script type="text/javascript" src="js/boot.js"></script>
        <script type="text/javascript" src="js/load.js"></script>
        <script type="text/javascript" src="js/menu.js"></script>
        <script type="text/javascript" src="js/play.js"></script>
        <script type="text/javascript" src="js/game.js"></script>
    </head>
    <body>
        <p> My first Phaser game </p>
        <div id="gameDiv"> </div>
    </body>
</html>
```

>Make sure that `game.js` is the last file called since it will contain referances to functions
defined in the other files.

### boot.js

- First state of the game.
- Easy to load (it's small) 
- Update in this case is not needed so it's removed.
- Simply sets some colors loads physics and calls load

```js
var bootState = {
    preload: function () {
        // Load the image
        game.load.image('progressBar', 'assets/progressBar.png');
    },
    create: function() {
        // Set some game settings
        game.stage.backgroundColor = '#3498db';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;
        // Start the load state
        game.state.start('load');
    }
};
```
### load.js

![](http://f.cl.ly/items/372t18273N2Z1o3x361A/Screen%20Shot%202016-06-13%20at%209.29.01%20AM.png)

The load state pre-loads all assets of the game and displays a "progress" bar.
- Since the game doesn’t have a lot of assets to load, you may not even have the time to see this state.
- The only new thing in this code is the `game.load.setPreloadSprite` function. It will take care of scaling up the ‘progressBar’ as the game loads.

```js
var loadState = {
    preload: function () {
        // Add a 'loading...' label on the screen
        var loadingLabel = game.add.text(game.width/2, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        // Display the progress bar
        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
        // Load all our assets
        game.load.image('player', 'assets/player.png');
        game.load.image('enemy', 'assets/enemy.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        // Load a new asset that we will use in the menu state
        game.load.image('background', 'assets/background.png');
    },
    create: function() {
        // Go to the menu state
        game.state.start('menu');
    }
};
```



![](http://f.cl.ly/items/2T0h1F3s0M203P1T2e2s/Screen%20Shot%202016-06-13%20at%209.29.49%20AM.png)

<sub>**Source:** All content (including images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>
