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

• Boot. This is the first state of the game.
• Load. It will load all the game’s assets.
• Menu. That’s the menu of the game.
• Play. This is where the actual game will be played. When dying, we will go back
to the menu.


![](https://s3.amazonaws.com/f.cl.ly/items/3L0W2G0M1G1F3U0X3J1d/Screen%20Shot%202016-06-13%20at%209.21.31%20AM.png)

![](http://f.cl.ly/items/372t18273N2Z1o3x361A/Screen%20Shot%202016-06-13%20at%209.29.01%20AM.png)

![](http://f.cl.ly/items/2T0h1F3s0M203P1T2e2s/Screen%20Shot%202016-06-13%20at%209.29.49%20AM.png)

