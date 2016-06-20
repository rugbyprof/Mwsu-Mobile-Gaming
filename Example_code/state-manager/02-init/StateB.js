MyGame.StateB = function (game) {

    this.key;
    this.sprite;

};

MyGame.StateB.prototype = {

    init: function (pic) {

        this.key = 'asuna' + pic;

    },

    create: function () {

        this.add.sprite(0, 0, 'background');

        this.add.text(16, 16, "State Example: init", { font: "16px Arial", fill: "#ffffff" });
        this.add.sprite(640, 553, 'phaser');

        this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, this.key);
        this.sprite.anchor.set(0.5);

    }

};
