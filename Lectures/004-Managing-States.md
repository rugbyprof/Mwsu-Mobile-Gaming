## Manage States

![](https://s3.amazonaws.com/f.cl.ly/items/0l2T1C1V2I283v0V3j1Q/Screen%20Shot%202016-06-13%20at%209.19.14%20AM.png)

### Organization

**Issues**:

Some issues with our current configuration

- Game play starts playing as soon as the game loads.
- Each time the game restarts all assets are re-loaded.
- We don’t have any menu to display the game’s name, controls, or score.

We can alleviate these problems by organizing our game into **states**.

### What is a State

>In **computer science** and **automata theory**, the **state** of a digital logic circuit or computer program is a technical term for all the stored information, at a given instant in time, to which the circuit or program has access.

For our needs, a state will be a logical "section" or logical "block" that is somewhat independant of the other sections sharing only a necessary set of variables. 

So a **state** is:
- A section of the game
- A scene

And **states** share:
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

## menu.js

![](http://f.cl.ly/items/2T0h1F3s0M203P1T2e2s/Screen%20Shot%202016-06-13%20at%209.29.49%20AM.png)

```js
var menuState = {
    create: function() {
        // Add a background image
        game.add.image(0, 0, 'background');
        // Display the name of the game
        var nameLabel = game.add.text(game.width/2, 80, 'Super Coin Box', { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);
        // Show the score at the center of the screen
        var scoreLabel = game.add.text(game.width/2, game.height/2,
            'score: ' + game.global.score,
            { font: '25px Arial', fill: '#ffffff' });
        scoreLabel.anchor.setTo(0.5, 0.5);
        // Explain how to start the game
        var startLabel = game.add.text(game.width/2, game.height-80,
            'press the up arrow key to start',
            { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);
        // Create a new Phaser keyboard variable: the up arrow key
        // When pressed, call the 'start' function once
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
    },
    start: function() {
        // Start the actual game
        game.state.start('play');
    },
};
```

#### Background
- For the background image we used `game.add.image` instead of `game.add.sprite`. 
- An image is like a lightweight sprite that doesn’t need physics or animations. It’s perfect for logos, backgrounds, etc.

#### Z-index
- A `Z-index` is the "stack" order of objects
- The lower the z-index the more "on the bottom" an item will be. 
- The earlier an object is loaded or created, the smaller it's z-index is.
- That's why the background is loaded before labels, so it will have a lower z-index.

#### Score
- Score is an example of a needed global var to be shared between the game and the menu.
- `game.global.score` is used to store and display the score. 
- This variable will be initialized in the `game.js` file like so:

```js
game.global = {
    score: 0
};
```

Notice the syntax? Typical object huh? Easy to add other `key:value` pairs in there.

#### Key
- Pauses game until the up arrow key is pressed. 
- `game.input.keyboard.createCursorKeys` is what we saw in the previous chapter.
- `game.input.keyboard.addKey` is a more lightweight method acheiving needed behavior.



<sub>**Source:** All content (including images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>
