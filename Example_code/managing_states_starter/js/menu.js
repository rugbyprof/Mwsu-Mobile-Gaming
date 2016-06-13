var menuState = {

    create: function() { 
        game.add.image(0, 0, 'background');

        var nameLabel = game.add.text(game.width/2, 80, 'Super Coin Box', { font: '50px Arial', fill: '#ffffff' });
        nameLabel.anchor.setTo(0.5, 0.5);

        var scoreLabel = game.add.text(game.width/2, game.height/2, 'score: ' + game.global.score, { font: '25px Arial', fill: '#ffffff' });
        scoreLabel.anchor.setTo(0.5, 0.5);

        var startLabel = game.add.text(game.width/2, game.height-80, 'press the up arrow key to start', { font: '25px Arial', fill: '#ffffff' });
        startLabel.anchor.setTo(0.5, 0.5);

        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        upKey.onDown.add(this.start, this);
    },

    start: function() {
        game.state.start('play');   
    },
};