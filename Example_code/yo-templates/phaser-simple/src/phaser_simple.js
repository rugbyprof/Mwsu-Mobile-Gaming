var config      = require('config');
var dom         = require('utils/dom');
var game_config = null;

// TODO: Add new states via Yeoman. This list needs to be dynamically
// recreated.

var boot        = require('states/boot');
var preloader   = require('states/preloader');
var game_state  = require('states/game');

module.exports = function() {
    config.load(function() {
        game_config = config.get('game');
        dom.add_game_node();

        var game = new Phaser.Game(game_config.width, game_config.height,
                                   Phaser.CANVAS,
                                   game_config.dom_element_id,
                                   null, false, false);

        game.state.add('Boot',      boot);
        game.state.add('Preloader', preloader);
        game.state.add('Game',      game_state);

        game.state.start('Boot');
    });
}
