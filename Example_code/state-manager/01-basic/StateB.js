MyGame.StateB = function (game) {

    this.background;
    this.girls;

};

MyGame.StateB.prototype = {

    create: function () {

        this.background = this.add.sprite(0, 150, 'background');

        this.girls = this.add.sprite(0, 150, 'anizeen');

        var tween = this.add.tween(this.background).to( { x: -800 }, 8000, "Linear", true, 0, -1, true);

    }

};
