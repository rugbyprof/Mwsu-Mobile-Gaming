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
