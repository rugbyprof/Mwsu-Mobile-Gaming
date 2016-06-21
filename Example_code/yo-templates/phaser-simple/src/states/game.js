module.exports = new Phaser.State();

var config = require('config');

module.exports.create = function() {
    var game = this.game;
    var game_config = config.get('game');

    game.stage.backgroundColor = game_config.background_color;

};
