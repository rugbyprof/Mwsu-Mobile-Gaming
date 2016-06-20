MyGame.StateB = function (game) {

    this.sprite = null;
    this.emitter = null;

};

MyGame.StateB.prototype = {

    create: function () {

        var b = this.add.sprite(0, 0, 'background');
        b.alpha = 0.3;

        this.add.text(16, 16, "State Example: clearWorld", { font: "16px Arial", fill: "#ffffff" });
        this.add.sprite(640, 553, 'phaser');

        this.emitter = this.add.emitter(this.world.centerX, 200);

        this.emitter.makeParticles('white');

        this.emitter.setXSpeed(-200, 200);
        this.emitter.setYSpeed(-150, -250);
        this.emitter.gravity = 300;

        this.emitter.flow(5000, 500, 1, -1);

        this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'asuna1');
        this.sprite.anchor.set(0.5);

        this.add.tween(this.sprite.scale).to( { x: 0.5, y: 0.5 }, 3000, "Linear", true, 0, -1, true);

        this.input.onDown.addOnce(this.showEmitter, this);

    },

    showEmitter: function () {

        this.state.start('StateC', true);

    }

};
