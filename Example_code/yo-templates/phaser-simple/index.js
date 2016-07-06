// Put route config in a separate file. That way I can use the config to
// include libs in a runnable build.
// I want to create a npm task that wraps the public dir and any necessary
// external libraries in a package and deploys it to e.g. GitHub pages.
// An index.html file should also be genrated to make each playable
// build easily accessible.

// Route config:
// {
//     "lib": {
//         "phaser.js": "node_modules/phaser/dist/phaser.min.js"
//     }
// }

// index.html:
// <script src="lib/phaser.js"></script>

// Server router:
// Object.keys(config.routes).forEach(function(path) {
//     router.get('/'+path+'/:lib', function(req, res, next) {
//         Object.keys(path).forEach(function(library) {
//             if (library === req.params.lib) {
//                 res.sendFile('../'+config.routes[path][library]);
//             }
//         });
//     });
// });

var node_static = require('node-static');
var file_server = new node_static.Server('./public');
var fs = require('fs');
var port = 5000;

var server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        if (!isLibFile(request, response)) {
            file_server.serve(request, response);
        }
    }).resume();
});

server.on('listening', function() {
    console.log('Static server listening on port '+port);
});

server.listen(port);

function isLibFile(req, res) {
    if (req.url.substring(0, 5) == '/lib/' ||
        req.url.substring(0, 4) == 'lib/') {

        var file_name = getLib(req.url);
        if (file_name) {
            file_server.serveFile(file_name, 200, {}, req, res);
            return true;
        }

        console.log('Error serving: ' + req.url);
        res.writeHead(404);
        res.end();
    }

    return false;
}

function getLib(path) {
    var parts = path.split('/');
    for (var i=parts.length-1; i>=0; i--) {
        if (parts[i] === 'lib' ||
            parts[i] === '') {
            parts.splice(i, 1);
        }
    }
    var libs = JSON.parse(fs.readFileSync('./libs.json', 'utf8'));
    return libs[parts.join('')];
}
