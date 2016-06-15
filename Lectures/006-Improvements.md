## Improvements

Let's add:
- best score,
- a mute button
- increasing difficulty

### Best Score

One great feature of HTML5 is called “local storage”, it lets us store some information on a persons computer. This is really useful but also limited. Remember, javascript has to be secure, so we really don't have access to the local file system, just a place to store "some" data (like a high score, the player’s progress, or some settings).

Local storage uses two functions:
- `localStorage.getItem('name') that returns the value stored for ‘name’`
- `localStorage.setItem('name', value) that stores ‘value’ in ‘name’`

***`menu.js`*** (create)
```js
// If 'bestScore' is not defined
// It means that this is the first time the game is played
if (!localStorage.getItem('bestScore')) {
    // Then set the best score to 0
    localStorage.setItem('bestScore', 0);
}
// If the score is higher than the best score
if (game.global.score > localStorage.getItem('bestScore')) {
    // Then update the best score
    localStorage.setItem('bestScore', game.global.score);
}
```

### Display Best Score

![](http://f.cl.ly/items/2q471o1y2x2l3F0X0Y39/Screen%20Shot%202016-06-13%20at%209.37.44%20AM.png)

Displaying the score is even easier, we just have to use `localStorage.getItem`.

So far we used this to display the score in the menu.js file:

```js
var scoreLabel = game.add.text(game.width/2, game.height/2,'score: ' + game.global.score,{ font: '25px Arial', fill: '#ffffff' });
```

All we have to do is to edit it like this:
```js
var text = 'score: ' + game.global.score + '\nbest score: ' + localStorage.getItem('bestScore');
var scoreLabel = game.add.text(game.width/2, game.height/2, text, { font: '25px Arial', fill: '#ffffff', align: 'center' });
```

- The `\n` will add a line break. And since the label is now on 2 lines, we added align: `center` to center everything.
- Just make sure to put this code after storing the best score, so that `localStorage.getItem` retrieves the newest best score.

### Mute Button

![](http://f.cl.ly/items/1W2j052U3B3z1G2R1D1u/Screen%20Shot%202016-06-13%20at%209.31.43%20AM.png)

We need a button that we can press to mute the game. Since the button will have 2 different images (mute and unmute).

***`load.js`***
```js
game.load.spritesheet('mute', 'assets/muteButton.png', 28, 22);
```

Remember that the last 2 parameters are the width and height of each individual image in the spritesheet.

![](http://f.cl.ly/items/383q283K0m3s0t3W0f3W/Screen%20Shot%202016-06-13%20at%209.32.36%20AM.png)

You can see that the sprite has 2 frames:
- Frame 0 (top) where the speaker shows some sound. It will be displayed when the game emits sound.
- And frame 1 (bottom) where the speaker shows no sound. It will be displayed when the game is muted.

### Add Button

We can show the button in the top left corner of the menu with `game.add.button`.
- `game.add.button(x, y, name, callback, context)`
    - ***x***: position x of the button.
    - ***y***: position y of the butto.
    - ***name***: the name of the image to display.
    - ***callback***: the function called when the button is clicked.
    - ***context***: the context in which the callback will be called, usually this.

***`menu.js`*** (create)
```js
// Add the button that calls the 'toggleSound' function when pressed
this.muteButton = game.add.button(20, 20, 'mute', this.toggleSound,this);
```

***`menus.js`*** (new function)
```js
// Function called when the 'muteButton' is pressed
toggleSound: function() {
    // Switch the variable from true to false, or false to true
    // When 'game.sound.mute = true', Phaser will mute the game
    game.sound.mute = !game.sound.mute;
    // Change the frame of the button
    this.muteButton.frame = game.sound.mute ? 1 : 0;
},
```
If you die while the sound is muted, then we get our "states" out of whack. So we apply the following after we create the button:

```js
// If the game is already muted, display the speaker with no sound
this.muteButton.frame = game.sound.mute ? 1 : 0;
```

### Better Keyboard Inputs

Force phaser to capture keys directly without use of the browser, which may mess up game play if the browser decides to "scroll" instead of sending the key on to phaser.

***`play.js`*** (create)
```js
game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
```

Some people like to use WASD instead of the arrow keys:

***`play.js`*** (create)
```js
this.wasd = {
    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: game.input.keyboard.addKey(Phaser.Keyboard.D)
};
```

Now you need to edit your `movePlayer` function to act accordingly, meaning it will move up for both the "up arrow" key and the "w" key, etc..

### Custom Fonts

Adding this to your html file will import a custom font from google:

```js
<style type="text/css">
    @import url(http://fonts.googleapis.com/css?family=Geo);
    .hiddenText {
            font-family: Geo;
        visibility: hidden;
        height: 0;
    }
</style>

<p class="hiddenText"> . </p>
```

## Better Difficulty

### Static Frequency

***`play.js`***
```js
// Contains the time of the next enemy creation
this.nextEnemy = 0;
```

***`play.js`*** (update)
```js
// If the 'nextEnemy' time has passed
if (this.nextEnemy < game.time.now) {
    // We add a new enemy
    this.addEnemy();
    // And we update 'nextEnemy' to have a new enemy in 2.2 seconds
    this.nextEnemy = game.time.now + 2200;
}
```

### Dynamic Frequency

1. Start difficulty: how often should we create new enemies at the beginning of the game?
2. End difficulty: how fast can we create enemies with the game still begin playable?
3. Progression: when do we reach the maximum difficulty?

How do we decide these values?





<sub>**Source:** All content (including images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>
