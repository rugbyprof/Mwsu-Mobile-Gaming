MyGame.StateC = function (game) {

    this.emitter = null;

};

MyGame.StateC.prototype = {

    create: function () {

        this.emitter = this.add.emitter(this.world.centerX, 200);

        this.emitter.makeParticles('red');

        this.emitter.setXSpeed(-200, 200);
        this.emitter.setYSpeed(-150, -250);
        this.emitter.gravity = 300;

        this.emitter.flow(5000, 500, 1, -1);

        this.input.onDown.addOnce(this.back, this);

    },

    back: function () {

        this.state.start('StateB', true);

    }

};
