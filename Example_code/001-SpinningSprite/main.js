var mainState = {
    preload: function() {
        game.load.image('logo', 'logo.png');
    },

    create: function() { 
        this.sprite = game.add.sprite(200, 150, 'logo');
    },

    update: function() {
        this.sprite.angle += 1;
    } 
};

var game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');