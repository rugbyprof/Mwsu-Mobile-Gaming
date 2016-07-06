var browserify = require('browserify');
var remapify = require('remapify');
var b = browserify();

b.add('./src/main.js');

b.plugin(remapify, [{
    cwd: './src',
    src: '**/*.js',
    expose: ''
}]);

b.bundle().pipe(process.stdout);
