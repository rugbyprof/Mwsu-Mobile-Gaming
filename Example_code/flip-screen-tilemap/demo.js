var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');

var PhaserGame = function (game) {

    this.layer = null;
    this.player = null;

    this.flipTween = null;

    this.leftZone = new Phaser.Rectangle(-32, 0, 32, 480);
    this.rightZone = new Phaser.Rectangle(640, 0, 32, 480);
    
    this.ladder = [ 359, 389, 449, 419, 212, 242, 272, 302, 182 ];

};

PhaserGame.prototype = {

    init: function () {

        this.scale.pageAlignHorizontally = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 300;

    },

    preload: function () {

        this.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('tiles');
        this.load.image('sky');
        this.load.spritesheet('wizard', 'wizard.png', 32, 32);

    },

    create: function () {

        var sky = this.add.sprite(0, 0, 'sky');
        sky.fixedToCamera = true;

        this.map = this.add.tilemap('map');
        this.map.addTilesetImage('fantasy_tiles_by_surt', 'tiles');

        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();

        this.map.setCollision( [ 217, 218, 511, 512, 247, 248, 251, 360, 171, 141, 328, 354, 355, 443, 413, 383, 353, 138, 168, 224, 225, 514, 515, 516, 226, 227, 181 ]);

        // this.layer.debug = true;

        this.player = this.add.sprite(0, 384, 'wizard', 0);
        this.player.animations.add('right', [0,1,2,3,4,5,6,7], 8, true);
        this.player.animations.add('left', [8,9,10,11,12,13,14,15], 8, true);

        this.physics.arcade.enable(this.player);

        this.player.body.setSize(28, 32, 0, 0);
        this.player.body.collideWorldBounds = true;

        this.cursors = this.input.keyboard.createCursorKeys();

    },

    update: function () {

        this.physics.arcade.collide(this.player, this.layer);

        this.player.body.velocity.x = 0;

        if (this.flipTween && this.flipTween.isRunning)
        {
            return;
        }

        if (this.cursors.left.isDown)
        {
            this.player.body.velocity.x = -200;
            this.player.play('left');
        }
        else if (this.cursors.right.isDown)
        {
            this.player.body.velocity.x = 200;
            this.player.play('right');
        }
        else
        {
            this.player.animations.stop();
        }

        if (this.cursors.up.isDown && this.onLadder())
        {
            this.player.body.velocity.y = -100;
        }
        else if (this.cursors.down.isDown && this.onLadder())
        {
            this.player.body.velocity.y = 100;
        }
        else if (!this.onLadder())
        {
            this.player.body.velocity.y = 0;
        }

        if (this.player.body.velocity.x > 0 && this.player.x >= this.rightZone.x)
        {
            this.flipRight();
        }
        else if (this.player.body.velocity.x < 0 && this.player.x <= this.leftZone.right)
        {
            this.flipLeft();
        }

    },

    flipLeft: function () {

        if (this.camera.x === 0)
        {
            return;
        }

        this.leftZone.x -= 640;
        this.rightZone.x -= 640;

        this.flipTween = this.add.tween(this.camera).to( { x: "-640" }, 500, "Linear", true);

    },

    flipRight: function () {

        if (this.camera.x === this.game.world.width - 640)
        {
            return;
        }

        this.leftZone.x += 640;
        this.rightZone.x += 640;

        this.flipTween = this.add.tween(this.camera).to( { x: "+640" }, 500, "Linear", true);

    },

    onLadder: function () {

        var x = this.layer.getTileX(this.player.x);
        var y = this.layer.getTileY(this.player.y);
        var tile = this.map.getTile(x, y, this.layer);

        return (tile !== null && this.ladder.indexOf(tile.index) > -1);

    }

};

game.state.add('Game', PhaserGame, true);
