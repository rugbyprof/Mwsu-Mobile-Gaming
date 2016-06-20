## How to create a State

There are two main methods of creating a state. Either by directly defining
an object that will act as your state, or by extending the Phaser.State class
that already exists.

### Using an Object Literal


A parent container object is created called MyGame. The prototype is then
created with explicit functions set on it:
```js
var MyGame = {};

MyGame.StateA = function(game) {
    this.player = null;
};

MyGame.StateA.prototype = {
    preload: function() {
        // Load assets
    },
    create: function() {
        // Create game objects
    }
};
```

###Extending Phaser State


```js
var MyGame = {};
MyGame.StateA = function() {
    this.score = 0;
};
MyGame.StateA.prototype = Object.create(Phaser.State.prototype);
MyGame.StateA.prototype.constructor = MyGame.StateA;
MyGame.StateA.prototype.preload = function() {
    // Load assets
};
MyGame.StateA.prototype.create = function() {
    // Create game objects
};
```

### Adding State to State Manager


#### Simple Example:
```js
<!doctype html>
<html>

<head>
    <meta charset="UTF-8" />
    <script src="phaser.min.js" type="text/javascript"></script>
    <script src="StateA.js" type="text/javascript"></script>
</head>

<body>
    <script type="text/javascript">
        var game = new Phaser.Game(800, 600);
        game.state.add('StateA', MyGame.StateA, true);
    </script>
</body>

</html>
```

#### Complex Game:

```js
game.state.add('Boot', ArtTools.Boot);
game.state.add('Preloader', ArtTools.Preloader);
game.state.add('AssetLoader', ArtTools.AssetLoader);
game.state.add('MainMenu', ArtTools.MainMenu);
game.state.add('WebCam', ArtTools.WebCam);
game.state.add('LineArt', ArtTools.LineArt);
game.state.add('Paint', ArtTools.Paint);
game.state.add('Frame', ArtTools.Frame);
game.state.add('WellDone', ArtTools.WellDone);
game.state.add('PrintSave', ArtTools.PrintSave);
game.state.add('Pause', ArtTools.Pause);
game.state.add('Help', ArtTools.Help);
game.state.start('Boot', false, false, 'config.json');
```

### Dynamically adding a State

You don’t have to include all of your states at the start. For particularly large
games it may be worth starting the game with only the core states needed
and then calling `StateManager.add` from within the game code.


An example of when you may do this could be a multi-game suite. The
JavaScript files containing the game code could be loaded at run-time as
needed. The State Manager doesn’t need all states to belong to the same
core object - any valid object is allowed:

```js
game.state.add('Boot', GameSuite.Boot);
game.state.add('MainMenu', GameSuite.Menu);
game.state.add('Game1', SuperLate.DukeNuke);
game.state.add('Game2', MoonCresta);
game.state.add('Game3', MagicLand.Dizzy);
game.state.add('Game4', Outrun.Game);
```

### Changing States

Once your states are added to the State Manager you can swap between
them using: this.state.start('key'), where key should be replaced for
the unique string-based key given to the state when it was added to the
State Manager.

Based on the example structure below:

```js
game.state.add('Boot', ArtTools.Boot);
game.state.add('Preloader', ArtTools.Preloader);
game.state.add('MainMenu', ArtTools.MainMenu);
```

To change from the Boot state to the Preloader state you’d do:

```js
this.state.start('Preloader');
```

## The State Change Process

1. The `state.shutdown` method is called (remember this is the current
state, not the pending state)
2. All tweens are removed from the Tween Manager.
3. The Camera and Input Manager are reset.
4. The physics sub-systems are cleared (in P2 this clears the P2 World)
5. All Timer related events are removed.
6. The Scale Manager is reset.
7. If loaded, the Debug module is reset.
8. If the clearWorld argument was true the World is cleared of game objects.
9. If the clearCache argument was true, the Cache is destroyed.

Once all of this has happened the **new** state is started.

## clearWorld Method

https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/10-clearWorld

## clearCache Method

The `clearCache` argument (default ‘false’) is the third argument of the
`StateManager.start` method. As its name implies it will call `Cache.destroy`
if set to true. 

This tells the Phaser Cache to literally remove everything from
within it. It’s something of a nuclear option and not usually something you’d
want to do very often. However if you’ve got a game shutdown process you
need to go through then it can be useful to call.

**Important note**: You cannot set `clearCache` to true if `clearWorld` is false.
Both must be set to true. 

```js
this.state.start('GameAbort', true, true);
```

### Restarting a State
As well as starting a new state you can restart the current state:

```js
this.state.restart();
```

It has the same two arguments as start does: `clearWorld` and `clearCache`.
And it goes through the exact same state change process as when swapping
to another state, the difference is that at the end the current state
restarts itself instead.
