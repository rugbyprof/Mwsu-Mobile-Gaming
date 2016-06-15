## Mobile Friendly

![](http://f.cl.ly/items/2X3N2b0H0K0T0g0J3W2M/use_mobile_view.png)

- **No scale**: That’s the default behaviour where the game doesn’t change its size.
- **Exact fit**: The game is stretched to fill every pixel of the screen.
- **Show all**: It displays the whole game on the screen without changing its proportions.

|    `SHOW_ALL`         |     NO SCALE         |`EXACT_FIT`|
|--------------|--------------|--------------|
| ![](http://f.cl.ly/items/3U0U3x0O1L2c2v3f150Y/show_all.png) | ![](http://f.cl.ly/items/3u1v1o1D2K2R23302k0W/no_scale.png) |![](http://f.cl.ly/items/1r0Q2z0A110H3w0O0u3h/exact_fit.png) |

Most common way is "show all".


### Boot File

***`boot.js`*** (create) Just before the `game.state.start('load')` line.
```js
// If the device is not a desktop (so it's a mobile device)
if (!game.device.desktop) {
	// Set the type of scaling to 'show all'
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	
	// Set the min and max width/height of the game
	game.scale.setMinMax(game.width/2, game.height/2,
	game.width*2, game.height*2);
	
	// Center the game on the screen
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	
	// Add a blue color to the page to hide potential white borders
	document.body.style.backgroundColor = '#3498db';
}
```

- It’s always a good practice to specify a minimum and a maximum size for the scaling.
- This way we will never have the game so small that it’s unplayable, and we will avoid
having the game too big with blurry assets.

### Game File

***`game.js`***
```js
// Replace this in game.js
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

// By this
var game = new Phaser.Game(500, 340, Phaser.AUTO, '');

//The last 2 parmeters are optionals, and their default value is Phaser.AUTO and ''. 
//So we can actually initialize Phaser like this:
var game = new Phaser.Game(500, 340);
```

### Index File

- Add a CSS rule to remove every margin and padding, to make sure there are no gaps between the game and the borders of the screen.
- Add a meta tag to scale the page properly on mobile devices.
- Remove the text “my first Phaser game” since we want the game to take all the space.
- Remove the “gameDiv”, as explained previously.

***`index.html`***
```js
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title> First Game </title>
        <style type="text/css">
            @import url(http://fonts.googleapis.com/css?family=Geo);
            * {
                margin: 0;
                padding: 0;
            }
            .hiddenText {
                font-family: Geo;
                visibility: hidden;
                height: 0;
            }
        </style>
        <meta name="viewport" content="initial-scale=1 user-scalable=no" />
        <script type="text/javascript" src="phaser.min.js"></script>
        <script type="text/javascript" src="js/boot.js"></script>
        <script type="text/javascript" src="js/load.js"></script>
        <script type="text/javascript" src="js/menu.js"></script>
        <script type="text/javascript" src="js/play.js"></script>
        <script type="text/javascript" src="js/game.js"></script>
    </head>
    <body>
    	<p class="hiddenText"> . </p>
    </body>
</html>
```

### Touch Inputs

Lets add some touch screen action!


![](http://f.cl.ly/items/303d3Z1a3z3x1u043g16/touch_screen_start.png)

### Change Label

***`menu.js`***
```js
// Store the relevant text based on the device used
var text;
if (game.device.desktop) {
	text = 'press the up arrow key to start';
}
else {
	text = 'touch the screen to start';
}
// Display the text variable
var startLabel = game.add.text(game.width/2, game.height-80, text, { font: '25px Arial', fill: '#ffffff' });
```

### Touch Event

Previously we did this to start the game when the up arrow key is pressed:

```js
var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
upKey.onDown.add(this.start, this);
```

For touch events it’s even easier. 

***`menu.js`*** (create)
```js
if (!game.device.desktop) {
	game.input.onDown.add(this.start, this);
}
```

### Mute Button

So, the above code will start the game if we touch the mute button. So...

***`menu.js`*** (start)
```js
// If we tap in the top left corner of the game on mobile
if (!game.device.desktop && game.input.y < 50 && game.input.x < 60) {
	// It means we want to mute the game, so we don't start the game
	return;
}
```

## Touch Buttons

![](http://f.cl.ly/items/0p0n452O0T0A0N3U0s3q/touch_screen.png)


We can handle interaction in a variety of ways:

- Use a plugin that displays a virtual controller in the game.
- Handle touch gestures to control the player.
- **Add custom buttons on the screen that we can press**.


### Load Buttons

***`load.js`***
```js
game.load.image('jumpButton', 'assets/jumpButton.png');
game.load.image('rightButton', 'assets/rightButton.png');
game.load.image('leftButton', 'assets/leftButton.png');
```

Example:

![](http://f.cl.ly/items/371U0y3n2X2l1a303H06/Screen%20Shot%202016-06-15%20at%202.25.48%20PM.png)

###Display Buttons

We could do something like the "mute" button, but the author says it's easier to use regular sprites:

- Create a sprite with the button image at the correct position.
- Enable inputs on the sprite to be able to have some callbacks when the user interacts with it.
- Make the sprite a little transparent to not hide the game behind it.



***`play.js`*** (**New Function!!**) 
```js
addMobileInputs: function() {
    // Add the jump button
    var jumpButton = game.add.sprite(350, 240, 'jumpButton');
    jumpButton.inputEnabled = true;
    jumpButton.alpha = 0.5;
    
    // Add the move left button
    var leftButton = game.add.sprite(50, 240, 'leftButton');
    leftButton.inputEnabled = true;
    leftButton.alpha = 0.5;
    
    // Add the move right button
    var rightButton = game.add.sprite(130, 240, 'rightButton');
    rightButton.inputEnabled = true;
    rightButton.alpha = 0.5;
},
```

**Important**: Mobile Inputs!

***`plays.js`*** (create)
```js
if (!game.device.desktop) {
	this.addMobileInputs();
}
```

### Handling Events

Since our buttons have inputEnabled = true, we can track precisely how the user interacts with them thanks to these 4 functions:

```js
// Triggered when the pointer is over the button
sprite.events.onInputOver.add(callback, this);

// Triggered when the pointer is moving away from the button
sprite.events.onInputOut.add(callback, this);

// Triggered when the pointer touches the button
sprite.events.onInputDown.add(callback, this);

// Triggered when the pointer goes up over the button
sprite.events.onInputUp.add(callback, this);
```

### Jump

***`play.js`*** (mobileInputs)
```js
// Call 'jumpPlayer' when the 'jumpButton' is pressed
jumpButton.events.onInputDown.add(this.jumpPlayer, this);
```

Now we create the new jumpPlayer function:

***`play.js`*** (new function)
```js
jumpPlayer: function() {
    // If the player is touching the ground
    if (this.player.body.onFloor()) {
        // Jump with sound
        this.player.body.velocity.y = -320;
        this.jumpSound.play();
    }
},
```
And it should work. But before we move on we should also edit the movePlayer
function to use jumpPlayer. This way we avoid duplicating the jump code.

***`play.js`*** (movePlayer)
```js
movePlayer: function() {
    // Do not change the beginning
    // ...
    // That's the part we need to edit, to call our new function
    if (this.cursor.up.isDown || this.wasd.up.isDown) {
	    this.jumpPlayer();
    }
},
```

Now each time a key or the ‘jumpButton’ is pressed, we will call jumpPlayer.

### Left Right

- We define a new variable `moveRight` set to `false` by default.
- If `onInputOver` or `onInputDown` is triggered, then we will set the variable to `true`.
- If `onInputOut` or `onInputUp` is triggered, we will set the variable to `false`.
- This way if `moveRight` is `true`, it means that the user is currently pressing the right button.



***`play.js`*** (addMobileInputs)
```js
addMobileInputs: function() {
    // Add the jump button (no changes)
    var jumpButton = game.add.sprite(350, 240, 'jumpButton');
    jumpButton.inputEnabled = true;
    jumpButton.alpha = 0.5;
    jumpButton.events.onInputDown.add(this.jumpPlayer, this);
    
    // Movement variables
    this.moveLeft = false;
    this.moveRight = false;
    
    // Add the move left button
    var leftButton = game.add.sprite(50, 240, 'leftButton');
    leftButton.inputEnabled = true;
    leftButton.alpha = 0.5;
    leftButton.events.onInputOver.add(this.setLeftTrue, this);
    leftButton.events.onInputOut.add(this.setLeftFalse, this);
    leftButton.events.onInputDown.add(this.setLeftTrue, this);
    leftButton.events.onInputUp.add(this.setLeftFalse, this);
    
    // Add the move right button
    var rightButton = game.add.sprite(130, 240, 'rightButton');
    rightButton.inputEnabled = true;
    rightButton.alpha = 0.5;
    rightButton.events.onInputOver.add(this.setRightTrue, this);
    rightButton.events.onInputOut.add(this.setRightFalse, this);
    rightButton.events.onInputDown.add(this.setRightTrue, this);
    rightButton.events.onInputUp.add(this.setRightFalse, this);
},
    
// Basic functions that are used in our callbacks

setLeftTrue: function() {
    this.moveLeft = true;
},
setLeftFalse: function() {
    this.moveLeft = false;
},
setRightTrue: function() {
    this.moveRight = true;
},
setRightFalse: function() {
    this.moveRight = false;
},
```

You can see that:
- We defined 2 new variables: moveRight and moveLeft.
- For each right and left button we added the 4 events.onInput functions.
- Each time the user interacts with one of the buttons we update the value of the new variables accordingly.

***`play.js`*** (movePlayer)
```js
movePlayer: function() {
// Player moving left
if (this.cursor.left.isDown || this.wasd.left.isDown ||
	this.moveLeft) { // This is new
	this.player.body.velocity.x = -200;
	this.player.animations.play('left');
}
// Player moving right
else if (this.cursor.right.isDown || this.wasd.right.isDown ||
	this.moveRight) { // This is new
	this.player.body.velocity.x = 200;
	this.player.animations.play('right');
}
// Do not change the rest of the function
}
```

### Small Fix

But what if you start pressing on the left button, then drag your finger on the right
button, and let go your finger? The player will keep moving right.

To fix that, add this at the beginning of the movePlayer function:

```js
// If 0 finger are touching the screen
if (game.input.totalActivePointers == 0) {
   	// Make sure the player is not moving
    this.moveLeft = false;
    this.moveRight = false;
}
```

## Device Orientation

Game needs to be in landscape!!

- If it’s portrait, we pause the game and display an error message.
- If it’s landscape, we resume the game and remove the error message.

### Code

***`play.js`*** (new function)
```js
orientationChange: function() {
    // If the game is in portrait (wrong orientation)
    if (game.scale.isPortrait) {
    	// Pause the game and add a text explanation
    	game.paused = true;
    	this.rotateLabel.text = 'rotate your device in landscape';
    }
    // If the game is in landscape (good orientation)
    else {
    	// Resume the game and remove the text
    	game.paused = false;
    	this.rotateLabel.text = '';
    }
},
```
New Phaser variables:

- `game.scale.isPortrait` that returns true when the game is currently in portrait orientation. 
- We could have also used `game.scale.isLandscape`.
- `game.paused` that stops everything in the game when set to true.

***`play.js`*** (create)
```js
if (!game.device.dekstop) {
	// Call 'orientationChange' when the device is rotated
	game.scale.onOrientationChange.add(this.orientationChange, this);
	
    // Create an empty label to write the error message if needed
    this.rotateLabel = game.add.text(game.width/2, game.height/2, '',
    { font: '30px Arial', fill: '#fff', backgroundColor: '#000' });
    this.rotateLabel.anchor.setTo(0.5, 0.5);
    
    // Call the function at least once
    this.orientationChange();
}
```

- The Phaser function `onOrientationChange.add` will automatically call our new function whenever the device is rotated. 
- But if the game starts in the wrong orientation our function won’t be called. 
- Add the call to `orientationChange` at the end to make sure it is executed at least once.

### Result

![](http://f.cl.ly/items/3v1p0a2u1D0y1Q3g433b/Screen%20Shot%202016-06-15%20at%202.49.17%20PM.png)


<sub>**Source:** All content (including images) obtained from "[Discover Phaser](https://www.discoverphaser.com/)", Author:Thomas Palef</sub>
