var MyGame = {};

MyGame.StateA = function (game) {

    this.spinner = null;
    this.text = null;

};

MyGame.StateA.prototype = {

    init: function () {

        var box = this.make.graphics(0, 0);

        box.lineStyle(8, 0xFF0000, 0.8);
        box.beginFill(0xFF700B, 1);
        box.drawRect(-50, -50, 100, 100);
        box.endFill();

        this.spinner = this.add.sprite(this.world.centerX, this.world.centerY, box.generateTexture());
        this.spinner.anchor.set(0.5);

        this.text = this.add.text(400, 300, "Loading: 0%", { font: "32px Arial", fill: "#ffffff", align: "center" });
        this.text.anchor.x = 0.5;

    },

    preload: function () {

        this.load.image('background', '../assets/wave.jpg');
        this.load.image('phaser', '../assets/phaser.png');

        //  Fake the loading of images so you can see what's going on with loadUpdate
        //  
        //  Enable network throttling in Chrome Dev Tools to see the result.
        //  I suggest a speed of Regular 4G (4 Mbps)

        for (var i = 0; i < 20; i++)
        {
            this.load.image('asuna' + i, '../assets/asuna_sao_by_vali233.png?rnd=' + i);
        }

        this.load.onFileComplete.add(this.fileLoaded, this);

    },

    fileLoaded: function (progress) {

        this.text.text = "Loading: " + progress + "%";

    },

    loadUpdate: function () {

        this.spinner.rotation += 0.05;

    },

    create: function () {

        //  The load is now finished, loadUpdate won't run any more, so fade out the spinner

        this.add.tween(this.spinner.scale).to( { x: 0, y: 0 }, 1000, "Elastic.easeIn", true, 250);
        this.add.tween(this.text).to( { alpha: 0 }, 1000, "Linear", true);

    }

};
