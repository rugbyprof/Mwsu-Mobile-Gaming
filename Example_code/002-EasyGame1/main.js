var mainState = {
    preload: function() {
        
    },

    create: function() { 
        
        //1. Change the background color of the game
        game.stage.backgroundColor = '#3498db';
        
        //2. Tell phaser we are going to use arcade physics for this game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //3. Crisper images when using pixel art
        game.renderer.renderSession.roundPixels = true;
    },

    update: function() {

    } 
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');