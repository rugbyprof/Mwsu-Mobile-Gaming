var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  
// serve static files from the current directory
app.use(express.static(__dirname));

app.get('/', function (req, res, next) {
    res.sendFile(__dirname+'/index.html');
});


server.listen(process.env.PORT || 55555, function () {
    console.log('\033[96mlistening on localhost:55555 \033[39m');
});

