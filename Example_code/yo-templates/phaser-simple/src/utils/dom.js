var config  = require('config');
var type_of = require('utils/type');

var tools_node = null;
var game_node = null;

function append_to_head(element) {
    document.getElementsByTagName('head')[0].appendChild(element);
};

function create_script(path) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = path;
    return script;
};

function create_node(id, parent_id) {
    var parent = document.body.nextSibling;
    if (!type_of(parent_id).is_undefined) {
        parent = document.getElementById(parent_id);
    }
    var div = document.createElement('div');
    div.setAttribute('id', id);
    document.body.insertBefore(div, parent);
    return div;
};

module.exports.add_game_node = function() {
    if (document) {
        game_node = create_node(config.get('game').dom_element_id);
        return game_node;
    }
    return null;
};

module.exports.inject_script = function(path, callback) {
    var script = create_script(config.get('game').host + path);
    script.onload = function() {
        if (!type_of(callback).is_undefined) {
            callback();
        }
    }
    append_to_head(script);
};

module.exports.inject_css = function(path, callback) {
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css')
    link.setAttribute('href', config.get('game').host + path);
    append_to_head(link);
    if (!type_of(callback).is_undefined) {
        callback();
    }
};

Object.defineProperty(module.exports, 'game_node', {
    get: function() { return game_node; }
});
