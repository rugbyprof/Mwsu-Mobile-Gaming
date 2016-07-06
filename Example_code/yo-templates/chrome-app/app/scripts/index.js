/* global Phaser */
/* global Boot */
/* global Gameover */
/* global Menu */
/* global Play */
/* global Preload */


'use strict';
document.addEventListener('DOMContentLoaded', function() {
    var game = new Phaser.Game(900, 700, Phaser.AUTO, 'chrome-app');

    // Game States

    game.state.add('boot', Boot);
    game.state.add('gameover', Gameover);
    game.state.add('menu', Menu);
    game.state.add('play', Play);
    game.state.add('preload', Preload);
    

    game.state.start('boot');

}, false);
