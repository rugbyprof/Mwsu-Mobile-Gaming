
BasicGame.Game3 = function (game) {

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
  this.lastDirection = 180;
  this.x = 100;
  this.y = 100;

 //  You can use any of these from any function within this State.
 //  But do consider them as being 'reserved words', i.e. don't create
 //  a property for your own game called "world" or you'll over-write
 //  the world reference.

};


BasicGame.Game3.prototype = {
  preload: function(){
    console.log(BasicGame);
  },

  create: function () {
    map = this.game.add.tilemap('roads');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('roads-grass', 'road_tiles');



    this.game.world.setBounds(0, 0, 1600, 1600);

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    this.layer = map.createLayer('roads-layer');

    //  This resizes the game world to match the layer dimensions
    this.layer.resizeWorld();


    //this.sprite = this.game.add.sprite(this.x, this.y, 'dude');
    this.sprite = this.game.add.sprite(this.x, this.y, 'runner');
    this.sprite.frame = 1;


    this.game.physics.p2.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.sprite.animations.add('down', [0,1,2,3,4,5,6,7,8,9,10,11,12], 20, true);
    this.sprite.animations.add('up', [42,43,44,45,46,47,48,49,50,51,52,53], 20, true);
    this.sprite.animations.add('left', [39,40,41,42,43,44,45,46,47,48,49,50,51], 20, true);
    this.sprite.animations.add('right', [26,27,28,29,30,31,32,33,34,35,36,37,38], 20, true);

    this.sprite.anchor.setTo(0.5,0.5);

    this.sprite.speed = 200;

    this.game.physics.enable(this.sprite);
    this.game.camera.follow(this.sprite);


    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);



  },

  update: function () {



    if (this.upKey.isDown)
    {
        if(this.leftKey.isDown){
            this.sprite.animations.play('left');
            this.lastDirection = 270;
        }else if(this.rightKey.isDown){
            this.sprite.animations.play('right');
            this.lastDirection = 90;
        }else{
            this.sprite.animations.play('up');
            this.lastDirection = 0;
        }
        //this.sprite.y-=3;
        this.sprite.body.velocity.y = -this.sprite.speed;
    }


    //190,230
    //575,335
},

render : function() {

    this.game.debug.cameraInfo(this.game.camera, 500, 32);
    this.game.debug.spriteCoords(this.sprite, 32, 32);

},

  quitGame: function (pointer) {

    this.state.start('MainMenu');
  }

};
