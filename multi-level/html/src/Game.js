
BasicGame.Game = function (game) {

  // When a State is added to Phaser it automatically has the
  // following properties set on it, even if they already exist:

  this.game;       //  a reference to the currently running game
  this.add;        //  used to add sprites, text, groups, etc
  this.camera;     //  a reference to the game camera
  this.cache;      //  the game cache
  this.input;      //  the global input manager (you can access
                   //  this.input.keyboard, this.input.mouse, as well
                   //  from it)
  this.load;       //  for preloading assets
  this.math;       //  lots of useful common math operations
  this.sound;      //  the sound manager - add a sound, play one,
                   //  set-up markers, etc
  this.stage;      //  the game stage
  this.time;       //  the clock
  this.tweens;     //  the tween manager
  this.world;      //  the game world
  this.particles;  //  the particle manager
  this.physics;    //  the physics manager
  this.rnd;        //  the repeatable random number generator

 //  You can use any of these from any function within this State.
 //  But do consider them as being 'reserved words', i.e. don't create
 //  a property for your own game called "world" or you'll over-write
 //  the world reference.

};


BasicGame.Game.prototype = {

  create: function () {

    map = this.game.add.tilemap('desert');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('tmw_desert_spacing', 'desert_tiles');

    this.game.world.setBounds(0, 0, 1600, 1600);

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('Layer1');

    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

    this.spr = this.add.sprite(50, 50,'duke');
    this.spr.pivot.x = this.spr.width * .5;
    this.spr.pivot.y = this.spr.height * .5;
    this.spr.animations.add('wave', null, 8, true);
    this.spr.play('wave');

    this.game.physics.p2.enable(this.spr);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.camera.follow(this.spr);



    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    var fullscreen =
      this.add.button(this.game.width-8, this.game.height-8,
                      'fullscreen',
                      BasicGame.toggleFullscreen,
                      this,
                      'over', 'up', 'down');
    fullscreen.pivot.x = fullscreen.width;
    fullscreen.pivot.y = fullscreen.height;

  },

  update: function () {
    this.spr.body.setZeroVelocity();

    if (this.cursors.up.isDown)
    {
        this.spr.body.moveUp(300)
    }
    else if (this.cursors.down.isDown)
    {
        this.spr.body.moveDown(300);
    }

    if (this.cursors.left.isDown)
    {
        this.spr.body.velocity.x = -300;
    }
    else if (this.cursors.right.isDown)
    {
        this.spr.body.moveRight(300);
    }
    this.game.world.wrap(this.spr, 0, true);

    if(this.spr.body.x > 190 && this.spr.body.x < 575 && this.spr.body.y > 230 && this.spr.body.y < 335){
        BasicGame.life = BasicGame.life * .9;
        console.log(BasicGame);
        this.state.start('Game2');
    }
    //190,230
    //575,335
},

render : function() {

    this.game.debug.cameraInfo(this.game.camera, 500, 32);
    this.game.debug.spriteCoords(this.spr, 32, 32);

},

  quitGame: function (pointer) {

    this.state.start('MainMenu');
  }

};
