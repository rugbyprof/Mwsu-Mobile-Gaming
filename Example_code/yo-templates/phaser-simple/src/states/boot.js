var config = require('config');

module.exports = new Phaser.State();

module.exports.create = function() {
    var game_config = config.get('game');
    var game = this.game;
    var scale = game.scale;

    game.input.maxPointers = 1;
    game.antialias = false;
    Phaser.Canvas.setSmoothingEnabled(game.context, false);

    game.stage.scaleMode = Phaser.ScaleManager.NO_SCALE;
    scale.maxWidth = game_config.width;
    scale.maxHeight = game_config.height;
    scale.forceLandscape = true;
    scale.pageAlignHorizontally = true;
    scale.pageAlignVertically = true;
    scale.setScreenSize(true);

    // TODO: Doesn't work in Chrome. Get's reset
    game.context.imageSmoothingEnabled = false;
    game.context.mozImageSmoothingEnabled = false;
    game.context.oImageSmoothingEnabled = false;
    game.context.webkitImageSmoothingEnabled = false;
    game.context.msImageSmoothingEnabled = false;

    game.state.start('Preloader');
};
