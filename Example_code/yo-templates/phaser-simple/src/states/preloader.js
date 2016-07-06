var config = require('config');

module.exports = new Phaser.State();

module.exports.preload = function() {
    var assets = config.get('preload');
    Object.keys(assets).forEach(function(type) {
        Object.keys(assets[type]).forEach(function(id) {
            this.game.load[type].apply(this.game.load,
                                       [id].concat(assets[type][id]));
        }.bind(this));
    }.bind(this));
};

module.exports.update = function() {
    if (this.game.load.hasLoaded) {
        this.game.state.start('Game');
    }
};
