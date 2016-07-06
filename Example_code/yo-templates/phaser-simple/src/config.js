'use strict';

// Config loads and prepares the config file. The modules that does the
// actual transformations of the dataset are located in transforms/config.

var type    = require('utils/type');
var config  = null;
var qwest   = require('qwest');

module.exports = {
    // Pass a list of string arguments as the full path for the object
    // you're looking for. E.g.: 'tilesets', 'space', 'tiles' for the
    // tile settings for the space tileset.
    get: function() {
        var args = Array.prototype.slice.call(arguments);
        if (args.length === 0) {
            return null;
        }
        if (config == null) {
            console.log('config is empty');
            return null;
        }
        return crawl(args);
    },

    load: function(callback) {
        var cb = function(value) {
            if (!type(callback).is_undefined) {
                callback(value);
            }
        };

        qwest.get('./config.json')
            .then(function(response) {
                config = response;
                cb(true);
            })
            .catch(function(message) {
                console.error(message);
                cb(false);
            });
    }
};

function crawl(args) {
    var arg = '';
    var obj = config;

    for (var i=0, j=args.length; i<j; i++) {
        arg = args[i];
        obj = obj[arg];
        if (type(obj).is_undefined) {
            console.warn('Config cannot find '+args.join('.'));
            return null;
        }
    }
    return obj;
}
