'use strict';

if (document.readyState === 'complete' ||
    document.readyState === 'interactive') {
    window.setTimeout(_boot, 0);
} else {
    document.addEventListener('DOMContentLoaded', _boot, false);
    window.addEventListener('load', _boot, false);
}

function _boot() {
    if (!document.body) {
        window.setTimeout(_boot, 20);
    } else {
        document.removeEventListener('DOMContentLoaded', _boot);
        window.removeEventListener('load', _boot);

        window.log = console.log.bind(console);

        var phaser_simple = require('phaser_simple');
        phaser_simple();
    }
};
