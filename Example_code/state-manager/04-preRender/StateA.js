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
