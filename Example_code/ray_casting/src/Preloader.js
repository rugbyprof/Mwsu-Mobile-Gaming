
BasicGame.Preloader = function (game) {

  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {

    // Create a progress bar based on cropping on image
    this.preloadBar =
    this.add.sprite(this.game.width/2, this.game.height/2, 'preloader-bar');
    this.preloadBar.pivot.x = this.preloadBar.width/2;
    this.preloadBar.pivot.y = this.preloadBar.height/2;

    this.load.setPreloadSprite(this.preloadBar);


    // Load game assets here...

    this.load.atlasJSONHash('playnow',
                            'assets/ui/playnow.png',
                            'assets/ui/playnow.json');
    this.load.atlasJSONHash('start',
                            'assets/ui/start.png',
                            'assets/ui/start.json');
    this.load.atlasJSONHash('fullscreen',
                            'assets/ui/fullscreen.png',
                            'assets/ui/fullscreen.json');

    this.load.image('logo', 'assets/logo.png');

    this.load.image('monster1', 'assets/monster1_32-0.png');
    this.load.image('monster2', 'assets/monster2_32.png');
    this.load.image('monster3', 'assets/monster3_32.png');
    this.load.image('monster4', 'assets/monster4_32.png');
    this.load.image('monster5', 'assets/monster5_32.png');
    this.load.image('wall', 'assets/wall.png');

    this.load.spritesheet('elf', 'assets/ninja_32.png', 64, 64);

    // Map Layers
    this.load.image('dungeon_tiles', 'assets/dungeon_sheet.png');

    this.game.load.tilemap('dungeon', 'assets/dungeon.json',null, Phaser.Tilemap.TILED_JSON);
    // End Map Layers

    this.game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 23);


  },

  create: function () {

    this.preloadBar.cropEnabled = false;

    var playnow =
      this.add.button(this.game.width/2,
                      this.game.height/2 + this.preloadBar.height*4,
                      'playnow',
                      function() {
                        this.state.start('Game');
                      },
                      this,
                      'over', 'up', 'down');
    playnow.pivot.x = playnow.width * .5;
    playnow.pivot.y = playnow.height * .5;

    var fullscreen =
      this.add.button(this.game.width-8, this.game.height-8,
                      'fullscreen',
                      BasicGame.toggleFullscreen,
                      this,
                      'over', 'up', 'down');
    fullscreen.pivot.x = fullscreen.width;
    fullscreen.pivot.y = fullscreen.height;

  },

};
