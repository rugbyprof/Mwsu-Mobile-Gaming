
### Minimum Phaser Game
```js
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example',
{ 
    preload: preload, create: create, update: update });
    function preload() {
    game.load.image('phaser', 'assets/sprites/phaser.png');
}

var sprite;

function create() {
    sprite = game.add.sprite(0, 0, 'phaser');
}
function update () {
    sprite.rotation += 0.01;
}
```

### What is a State


When explaining what a state is there are two sides to consider: the conceptual and the technical. 

Think of states in your game as being like chapters in a book. Each
one having a specific designated task. Some common examples of states
include:

- A preloader
- A main menu
- A level selection screen
- An intro sequence or story screen
- A game level
- The game over sequence
- A high score screen
- An in-game weapon or items shop
- A Boss Fight

### Remember

- *Only one state can ever be* **active** *at any one time.*
- *States don’t have Display properties*
    - A state isn't "rendered"
    - A state is a logical "chunk" or organization of code
    
### Basic Example

01-Basic Example [Here](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/01-basic)

```js
<!doctype html>
<html>

<head>
    <meta charset="UTF-8" />
    <title>A Guide to the Phaser State Manager</title>
    <script src="../lib/phaser.min.js" type="text/javascript"></script>
    <script src="StateA.js" type="text/javascript"></script>
    <script src="StateB.js" type="text/javascript"></script>
</head>

<body>
    <script type="text/javascript">
        var game = new Phaser.Game(800, 600);
        game.state.add('StateA', MyGame.StateA);
        game.state.add('StateB', MyGame.StateB);
        game.state.start('StateA');
    </script>
</body>

</html>
```

Important Lines:

```js
game.state.add('StateA', MyGame.StateA);
game.state.add('StateB', MyGame.StateB);
       
// Could have been

game.state.add('Preloader', MyGame.StateA);
game.state.add('MainMenu', MyGame.StateB);
```
StateA:

```js
var MyGame = {};
MyGame.StateA = function(game) {};
MyGame.StateA.prototype = {
    preload: function() {
        this.load.image('background', '../assets/sky.jpg');
        this.load.image('anizeen', '../assets/fate.png');
    },
    create: function() {
        this.state.start('StateB');
    }
};
```
StateB:
```js
//Not creating MyGame object again!

MyGame.StateB = function(game) {
    this.background;
    this.girls;
};
MyGame.StateB.prototype = {
    create: function() {
        this.background = this.add.sprite(0, 150, 'background');
        this.girls = this.add.sprite(0, 150, 'anizeen');
        var tween = this.add.tween(this.background).to({
                x: -800
            }, 8000,
            "Linear", true, 0, -1, true);
    }
};
```


## Predefined Methods


The predefined / reserved methods are:

| Method / Function |
|-------------------|
| init| 
| preload| 
| loadUpdate| 
| loadRender| 
| create| 
| update| 
| preRender| 
| render| 
| resize| 
| paused| 
| resumed| 
| pauseUpdate| 
| shutdown| 


***Important***

A **State** is **only** considered valid if it has at least one of these methods:

`preload`, `create`, `update` or `render`. 

Without one of these Phaser will not even load it into the State Manager.


## Predefined Properties

As well as reserved method names there are also 19 predefined properties
on a state. 

| Property | Reference to| 
|----------|-------------|
| game | The Phaser.Game instance| 
| add | Phaser.GameObjectFactory| 
| make | Phaser.GameObjectCreator| 
| camera | Phaser.Camera| 
| cache | Phaser.Cache| 
| input | Phaser.Input| 
| load | Phaser.Loader| 
| math | Phaser.Math| 
| sound | Phaser.SoundManager| 
| scale | Phaser.ScaleManager| 
| state | Phaser.StateManager| 
| stage | Phaser.Stage| 
| time | Phaser.Time| 
| tweens | Phaser.TweenManager| 
| world | Phaser.World| 
| particles | Phaser.Particles| 
| rnd | Phaser.RandomDataGenerator| 
| physics | Phaser.Physics| 
| key | The string based state key| 

Unlike with the predefined methods, where you have to explicitly create
them in your code, all of the above properties are **automatically** created
on your State object by the Phaser State Manager. They are redefined each
time your state starts, not just when it’s added to the State Manager.

## State Flow

![](http://f.cl.ly/items/1c3V1I271H3F3b2N133e/state_flow.png)


### Phase 1 - init
When the State Manager starts a new state it begins by calling the `init`
method. It waits for this method to complete before moving on to phase 2.

### Phase 2 - preload + loop
Once init is complete it then calls preload. During the preload process
Phaser enters a loop. In this loop it calls `loadUpdate` followed by `loadRender` on a continuous looping basis until the loader has finished all of its operations.

### Phase 3 - create + update loop
When the loader is finished (or not used) it calls `create`. This method is
called just once. As soon as `create` has been called it will then enter the
`update` loop.

While in this loop it cycles through `update`, `preRender` and `render` in that exact order. Here it remains until either told to change to another state, the game is paused or the game instance is destroyed.

It’s important to note that `update` is never called until `create` has finished.

### Phase 4 - shutdown
Should the State Manager be told to switch to another state then Phaser
will stop the update loop and then call `shutdown`. Within shutdown you can
clear-up any resources you were using.

After `shutdown` has been called it then swaps to the new state, calls its `init` method and thus starts the flow all over again inside of the new state.

## Init Method

Example code here: [02-init](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/02-init)

The `init` method is the first thing to be called in your state. It’s called just once when the state starts. It’s called before preload, create or anything else, hence its name, a short-form of `initialization`.



## Passing Multiple Params

You can pass as many parameters as you like to the init method. For
example imagine this code is in StateA:

```js
this.state.start('StateB', true, false,
    "Atari",
    { x: 32, y: 64 },
    game.rnd.between(100, 200)
);
```

When StateB starts its init method will receive the following:
```js
init: function (a, b, c) {
    // a = the string "Atari"
    // b = the object { x: 32, y: 64 }
    // c = a random number between 100 and 200
}
```
There is no practical limit to the number of parameters you can pass to a
state, but for your own sanity it should be kept relatively small.


## Preload Method

You’re probably already familiar with the preload method. It’s the main way
Phaser loads assets into your game.

While technically you can place any code into a preload method limit it to calls to the Phaser Loader only. 

Here’s an example of a basic preload method:
```js
    preload: function () {
    this.load.image('background', '../assets/wave.jpg');
    this.load.image('phaser', '../assets/phaser.png');
    this.load.json('shopData', '../assets/shop_items.json');
}
```

It’s important to understand what Phaser is doing behind the scenes here.
Every time you call a Loader method, such as load.image, it adds the file
you specify onto a queue that the Loader manages.

It doesn’t load the file immediately. It simply adds it to a queue.
The code above is adding 2 different images and a JSON file to the Loader
queue.

If the queue is empty, create can start, otherwise it handles all the loads.

If you want to change state immediately after all the assets have loaded
then you should do so inside the create method:

```js
preload: function () {
	this.load.image('background', '../assets/wave.jpg');
	this.load.image('phaser', '../assets/phaser.png');
},
create: function () {
	this.state.start('StateB');
}
```

### Waiting For Audio

Audio is an exception when it comes to the loading process. When you load
an audio file two stages are involved: 

- the actual download of the audio file
- the decoding of it by the browser.

Audio files have to be decoded before they can be played.
Decoding time varies based on lots of factors: the encoding method used,
the audio duration and file size, the device CPU and CPU load and the
browser handling the decoding.

It’s not unheard of for slower mobile devices to take a considerable amount
of time decoding audio. Audio decoding management is outside the realm
of this book, but Phaser does have the ability for you to hold fire until it’s
completed.

Here is one such way of handling it - using the Sound Managers `setDecodedCallback`

```js
function which was introduced in Phaser 2.3:
    preload: function() {
        this.load.audio('explosion', 'assets/audio/explosion.mp3');
        this.load.audio('sword', 'assets/audio/sword.mp3');
        this.load.audio('blaster', 'assets/audio/blaster.mp3');
    },
    create: function() {
        var explosion = game.add.audio('explosion');
        var sword = game.add.audio('sword');
        var blaster = game.add.audio('blaster');
        this.sound.setDecodedCallback(
            [explosion, sword, blaster],
            this.start, this
        );
    },
    start: function() {
        this.state.start('StateB');
    }
}
```

The start method will be called as soon as all of the audio files are decoded
and ready for use. The audio files could be decoded in any order and we
have no control over that.

Although decoding is a non-blocking async process it’s also a real CPU killer
on mobile devices, so try to manage it carefully. Be sure not to be running
any intensive animations or tweens at the same time as decoding audio.

## LoadUpdate Method

`loadUpate` runs while the `preload` method is running. In the example below, `this.sprite.rotation += 0.1` is trying to run on a sprite that hasn't been created because the `create` method hasn't run. 
```js
MyGame.State = function(game) {
    this.sprite = null;
};
MyGame.State.prototype = {
    preload: function() {
        this.load.image('atari', 'AtariST.png');
    },
    create: function() {
        this.sprite = this.add.sprite(0, 0, 'atari');
    },
    update: function() {
        this.sprite.rotation += 0.1;
    }
};

//fix:

update: function() {
    if (this.sprite) {
        this.sprite.rotation += 0.1;
    }
}
```


So if you wanted to to some animation (for example) in a game loader, then you would perform this in the `loadUpate` method. See next section.

### Loading Spinner

Example code here: [03-loadUpdate](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/03-loadUpdate)

```js
var MyGame = {};
MyGame.StateA = function(game) {
    this.spinner = null;
    this.text = null;
};
MyGame.StateA.prototype = {
    init: function() {
        var box = this.make.graphics(0, 0);
        box.lineStyle(8, 0xFF0000, 0.8);
        box.beginFill(0xFF700B, 1);
        box.drawRect(-50, -50, 100, 100);
        box.endFill();
        this.spinner = this.add.sprite(
            this.world.centerX,
            this.world.centerY,
            box.generateTexture()
        );
        this.spinner.anchor.set(0.5);
        var style = {
            font: "32px Arial",
            fill: "#ffffff",
            align: "center"
        };
        this.text = this.add.text(400, 300, "Loading: 0%", style);
        this.text.anchor.x = 0.5;
    },
    preload: function() {
        this.load.image('background', '../assets/wave.jpg');
        this.load.image('phaser', '../assets/phaser.png');
        for (var i = 0; i < 20; i++) {
            this.load.image(
                'asuna' + i,
                '../assets/asuna_sao_by_vali233.png?rnd=' + i
            );
        }
        this.load.onFileComplete.add(this.fileLoaded, this);
    },
    fileLoaded: function(progress) {
        this.text.text = "Loading: " + progress + "%";
    },
    loadUpdate: function() {
        this.spinner.rotation += 0.05;
    },
    create: function() {
        this.add.tween(this.spinner.scale).to({
            x: 0,
            y: 0
        }, 1000, "Elastic.easeIn", true, 250);
        this.add.tween(this.text).to({
            alpha: 0
        }, 1000, "Linear", true);
    }
};
```

## LoadRender Method

The loadRender method works under exactly the same principals as load-
Update does: Internally Phaser works by running what is known as its “core
game loop”. On fast devices this happens 60 times per second. And hooked
into this event are both the `loadRender` and `render` methods of your state.

The difference between loadRender and render is that loadRender is **only**
called while the Phaser Loader is loading assets, and once that is finished
`render` is called instead (if defined.)

After the Loader determines that there are files in its queue it will start the load process. For the entire duration that it is loading files the core game loop will call your states `loadRender` method.

The reason loadRender is called separately to render is simply to allow
you to manage your game objects more cleanly and stop the need for
conditional checks inside your `render` method.

Just as with `render` the `loadRender` method is called **after** Phaser has rendered the entire display list. It allows you to add additional post-processing style effects, or more commonly to overlay debugging information useful during development.

## Create Method

As its name implies it is meant to be used for the creation of game objects.
Things like Sprites, setting up animations, creating tile maps and similar.

Once `create` has been called the core game loop starts. It’s worth mentioning
that the loop doesn’t start until create is finished. If you monitor the
flow of a state you will always see `create` called before the very first `update` occurs. This is to ensure that any objects you reference in `update` already exist.


## Update Method


The `update` method is called automatically, once per logic update by the
core Phaser Game loop.

Phaser will only start calling update once the `create` method has been run,
if it exists.

As the update method is called so often, at such a high frequency, you
should be very careful about what gets placed inside of it. 

Typical examples of actions that take place inside update are things like checking for physics collision, or responding to input pointer movements.

## PreRender Method

Example code here: [04-preRender](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/04-preRender)

Essentially it’s the last point at which you can make final adjustments to
display objects before the render pass starts.

`preRender` is called right after your states `update` method has finished, and after all of the Phaser sub-systems have been updated as well. It’s literally the last thing to happen before rendering begins.

```js
var MyGame = {};

MyGame.StateA = function (game) {

    this.b = 0;
    this.frames = [];
    this.start = false;

    this.sprite = null;

};

MyGame.StateA.prototype = {

    preload: function () {

        this.load.image('background', '../assets/wave.jpg');
        this.load.image('phaser', '../assets/phaser.png');
        this.load.image('asuna', '../assets/fairy_dance_asuna_by_vali233.png');

    },

    create: function () {

        //  Create 10 'frames'
        for (var i = 0; i < 10; i++)
        {
            this.frames.push(this.make.bitmapData(game.width, game.height));
        }

        this.add.sprite(0, 0, 'background');

        this.add.sprite(640, 553, 'phaser');

        this.add.text(16, 16, "State Example: preRender", { font: "16px Arial", fill: "#ffffff" });

        this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'asuna');
        this.sprite.anchor.set(0.5);

        this.add.tween(this.sprite.scale).to( { x: 0.2, y: 0.2 }, 2000, "Sine.easeInOut", true, 500, -1, true);

    },

    update: function () {

        this.sprite.rotation += 0.01;

    },

    preRender: function () {

        this.frames[this.b].cls();
        this.frames[this.b].copyRect(this.game.canvas, this.world.bounds, 0, 0, 0.1);

        this.b++;

        if (this.b === 10)
        {
            this.start = true;
            this.b = 0;
        }

    },

    render: function () {

        if (this.start)
        {
            //  The frame buffer is full, so lets start drawing them back
            for (var i = 0; i < 10; i++)
            {
                this.game.context.drawImage(this.frames[i].canvas, 0, 0);
            }
        }

    }

};
```


## Render Method

Example code here: [05-render](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/05-render)

The render method is called when Phaser has finished rendering the entire
display list. At this stage the canvas has been cleared and fully updated,
with all display objects that will be drawn now rendered to it.

It’s now that you can add some final post-processing style effects, or draw
debug data over your game if you so wish.

### Plugins render last

If you’ve got a Phaser Plugin running and the plugin has a render method,
then it will be applied to your game **after** the state render method.
Remember this should you be using a plugin that draws to the game canvas.
Equally consider moving your own render specific code into a plugin should
you need to use it in more than one state.

```js
var MyGame = {};

MyGame.StateA = function (game) {

    this.sprite;

};

MyGame.StateA.prototype = {

    preload: function () {

        this.load.image('background', '../assets/wave.jpg');
        this.load.image('phaser', '../assets/phaser.png');
        this.load.image('asuna', '../assets/fairy_dance_asuna_by_vali233.png');

    },

    create: function () {

        this.add.sprite(0, 0, 'background');

        this.add.text(16, 16, "State Example: render", { font: "16px Arial", fill: "#ffffff" });
        this.add.sprite(640, 553, 'phaser');

        this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'asuna');
        this.sprite.anchor.set(0.5);

    },

    update: function () {

        this.sprite.rotation += 0.01;

    },

    render: function () {

        //  Let's apply a basic scanline effect over the top of the game

        this.game.context.fillStyle = 'rgba(0, 0, 0, 0.3)';

        for (var y = 0; y < this.game.height; y += 4)
        {
            this.game.context.fillRect(0, y, this.game.width, 1);
        }

    }

};

```

### Resize

The resize method is a special method that is invoked by the Phaser Scale
Manager. It is called each time the game changes size. This only happens if
your game is running with the `Phaser.ScaleManager.RESIZE` scale mode.

A game may change size for a number of reasons. For example if your game
is set to be “100%” sized and the browser window is resized, then the resize
event will fire and your states `resize` method will be called.

When resize is called it is passed two parameters: width and height. These
are the **new** dimensions of your game canvas.

```js
var MyGame = {};

MyGame.StateA = function (game) {

    this.background = null;
    this.sprite = null;
    this.logo = null;

};

MyGame.StateA.prototype = {

    init: function () {

        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    },

    preload: function () {

        this.load.image('background', '../assets/wave.jpg');
        this.load.image('phaser', '../assets/phaser.png');
        this.load.image('yuzuki', '../assets/yuzuki_yukari_by_vali233.png');

    },

    create: function () {

        this.background = this.add.image(0, 0, 'background');
        this.background.width = this.game.width;
        this.background.height = this.game.height;

        this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'yuzuki');
        this.sprite.anchor.set(0.5);

        this.add.text(16, 16, "State Example: resize", { font: "16px Arial", fill: "#ffffff" });

        this.logo = this.add.image(this.game.width, this.game.height, 'phaser');
        this.logo.anchor.set(1, 1);

    },

    resize: function (width, height) {

        this.background.width = width;
        this.background.height = height;

        this.sprite.x = this.world.centerX;
        this.sprite.y = this.world.centerY;

        this.logo.x = width;
        this.logo.y = height;

    }

};

```
### Paused Method

Example code here: [07-paused](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/07-paused)

By default Phaser will listen for a `document.visibilitychange` event (or
any of the browser prefixed versions such as `mozvisibilitychange`). 

It will also listen for window.onblur and window.onfocus. This happens in the
`Phaser.Stage class`. 

If such an event is fired by the browser then the `Stage.visibilityChange`
method is called. This has the responsibility of checking what happened
and then either pausing or resuming the Phaser Game based on it.

Alternatively a game can also pause through code. By calling 
```js
game.paused = true
``` 
it will send the game into a paused state.

```js
paused: function() {
        if (this.pausedSprite) {
            this.pausedSprite.visible = true;
        } else {
            this.pausedSprite = this.make.sprite(0, 0, 'paused');
            this.stage.addChild(this.pausedSprite);
        }
    },
    resumed: function() {
        this.pausedSprite.visible = false;
    }
}
```
### Resumed Method

Example code here: [07-paused](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/07-paused)

As we’ve seen the `paused` method is called whenever the game enters a
paused state. The `resumed` method is its counterpart.

A game can resume either as a result of a visibility event telling it to, or
directly via code.

Prior to resumed being called the `Phaser.Time`, `Phaser.InputManager` and
`Phaser.SoundManagers` are all woken up again. However an `update` call
hasn’t yet taken place.

If for example you had displayed a message to the user that the game is
paused then resumed is where you would then remove that message again.


### Pause Update Method

Example code here: [08-pauseUpdate](https://github.com/rugbyprof/Mwsu-Mobile-Gaming/tree/master/Example_code/state-manager/08-pauseUpdate)

As discussed in section on State Flow the Game update loop is call constantly
while the game is running. Usually the `update` method is called, but
if the game enters a paused mode then `pauseUpdate` is called instead.

During `pauseUpdate` we can manipulate game objects. The game is still
being rendered, so if you change the position of a sprite or rotate it, it’ll
still be reflected in the display.

```js
paused: function() {
        if (this.pausedSprite) {
            this.pausedSprite.visible = true;
        } else {
            this.pausedSprite = this.make.sprite(0, 0, 'paused');
            this.stage.addChild(this.pausedSprite);
        }
        this.pausedSprite.y = 600;
    },
    pauseUpdate: function() {
        this.pausedSprite.y -= 4;
        if (this.pausedSprite.y <= -600) {
            this.pausedSprite.y = 600;
        }
    },
    resumed: function() {
        this.pausedSprite.visible = false;
    }
}
```

## Shutdown Method

The final method that the State Manager looks for is called `shutdown`. If you
consult the State Flow you’ll see that shutdown is invoked when the State
Manager has been instructed to go to another state.

This is where you’d do any house keeping that needs to take place.
Phaser will automatically tell its various sub-systems that a State change
is happening. For example the Input Manager knows to release all of its
input enabled game objects.

But there’s often things you need to clear-up yourself. For example if your
game relies on an `external API` then you may wish to close any open
connections. If there are any custom Game Objects you’ve created that
have more complex set-ups then you should destroy them here as well,
to stop them from bleeding over into the next state.



<sub>**Source**: [Interphase1](http://phaser.io/interphase) Authors: Richard Davey and Ilija Melentijevic</sub>
