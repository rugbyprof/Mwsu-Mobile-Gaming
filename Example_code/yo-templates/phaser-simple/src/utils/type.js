var type = '';

module.exports = function(element) {
    type = Object.prototype.toString.call(element);
    return module.exports;
};

Object.defineProperty(module.exports, 'is_object', {
    get: function() { return type === '[object Object]'; }
});
Object.defineProperty(module.exports, 'is_array', {
    get: function() { return type === '[object Array]'; }
});
Object.defineProperty(module.exports, 'is_string', {
    get: function() { return type === '[object String]'; }
});
Object.defineProperty(module.exports, 'is_date', {
    get: function() { return type === '[object Date]'; }
});
Object.defineProperty(module.exports, 'is_number', {
    get: function() { return type === '[object Number]'; }
});
Object.defineProperty(module.exports, 'is_num', {
    get: function() { return type === '[object Number]'; }
});
Object.defineProperty(module.exports, 'is_function', {
    get: function() { return type === '[object Function]'; }
});
Object.defineProperty(module.exports, 'is_fn', {
    get: function() { return type === '[object Function]'; }
});
Object.defineProperty(module.exports, 'is_regexp', {
    get: function() { return type === '[object RegExp]'; }
});
Object.defineProperty(module.exports, 'is_boolean', {
    get: function() { return type === '[object Boolean]'; }
});
Object.defineProperty(module.exports, 'is_bool', {
    get: function() { return type === '[object Boolean]'; }
});
Object.defineProperty(module.exports, 'is_null', {
    get: function() { return type === '[object Null]'; }
});
Object.defineProperty(module.exports, 'is_undefined', {
    get: function() { return type === '[object Undefined]'; }
});
