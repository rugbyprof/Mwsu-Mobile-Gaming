#### File Organization

![](http://f.cl.ly/items/3R0L3T0p2q2k3Q063E03/Screen%20Shot%202016-06-08%20at%2012.22.42%20PM.png)

#### Html Template
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
    	<title> First project </title>
    	<script type="text/javascript" src="phaser.min.js"></script>
    	<script type="text/javascript" src="main.js"></script>
    </head>
    <body>
        <p> My first project with Phaser </p>
        <div id="gameDiv"> </div>
    </body>
</html>
```
#### Phaser Template

```js
// We create our only state
var mainState = {
	// Here we add all the functions we need for our state
	// For this project we will just have 3
	preload: function() {
		// This function will be executed at the beginning
		// That's where we load the game's assets
	},
	create: function() {
		// This function is called after the 'preload' function
		// Here we set up the game, display sprites, etc.
	},
	update: function() {
		// This function is called 60 times per second
		// It contains the game's logic
	}
};
// We initialize Phaser
var game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');
// And we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');
```

#### main.js
```js
var mainState = {
	preload: function() {
		// Load the image
		game.load.image('logo', 'logo.png');
	},
	create: function() {
		// Display the image on the screen
		this.sprite = game.add.sprite(200, 150, 'logo');
	},
	update: function() {
		// Increment the angle of the sprite by 1, 60 times per seconds
		this.sprite.angle += 1;
	}
};
var game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');
```

## Breaking It Down


#### Width and Height of a Sprite (image)

```js
//in the preload function
game.load.image('logo', 'logo.png');

//in the create function
var width = this.game.cache.getImage("logo").width;
var height = this.game.cache.getImage("logo").height;
console.log(width);
console.log(height);
```

#### Center of the game world

