var MyGame = {};

MyGame.StateA = function (game) {

};

MyGame.StateA.prototype = {

    preload: function () {

        this.load.image('background', '../assets/sky.jpg');
        this.load.image('anizeen', '../assets/fate.png');

    },

    create: function () {

        this.state.start('StateB');

    }

};
