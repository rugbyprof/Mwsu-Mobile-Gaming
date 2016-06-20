var MyGame = {};

MyGame.StateA = function (game) {

};

MyGame.StateA.prototype = {

    preload: function () {

        this.load.image('background', '../assets/wave.jpg');
        this.load.image('phaser', '../assets/phaser.png');
        this.load.image('asuna1', '../assets/asuna_sao_by_vali233.png');
        this.load.image('asuna2', '../assets/fairy_dance_asuna_by_vali233.png');
        this.load.image('red', '../assets/red.png');
        this.load.image('white', '../assets/white.png');

    },

    create: function () {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.state.start('StateB');

    }

};
