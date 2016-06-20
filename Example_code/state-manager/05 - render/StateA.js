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
