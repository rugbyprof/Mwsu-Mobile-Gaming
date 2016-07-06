var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  
// serve static files from the current directory
app.use(express.static(__dirname));

var Eureca = require('eureca.io');


//create an instance of EurecaServer
var eurecaServer = new Eureca.Server({allow:['setId', 'spawnEnemy', 'kill','updateState']});

var players = {};
var Order = 1;
var IdPairs = []; //Array of eureca generated id's and client generated id's.
 
//attach eureca.io to our http server
eurecaServer.attach(server);

//detect client connection
eurecaServer.onConnect(function (conn) {    

	//the getClient method provide a proxy allowing us to call remote client functions
    var remote = eurecaServer.getClient(conn.id);   

	
	//register the client
	players[conn.id] = {order:getOrderConnected(),id:conn.id, remote:remote, state:null}
	
	//here we call setId (defined in the client side)
	remote.setId(conn.id,players[conn.id]);	
    console.log('New Client id: %s Order: %s', conn.id, players[conn.id].order,conn.remoteAddress);
});


//detect client disconnection
eurecaServer.onDisconnect(function (conn) {    
    console.log('Client disconnected ', conn.id);
	
	var removeId = players[conn.id].id;
	
	delete players[conn.id];
	
	for (var c in players)
	{
		var remote = players[c].remote;
		
		//here we call kill() method defined in the client side
		remote.kill(conn.id);
	}	
});

/**
* Player logs itself into the array of players (handshake still needs to be called
* to do the update. That's done on the client right after). 
*/
eurecaServer.exports.initPlayer = function (id,state) {
    console.log("handshake");
    console.log(state);
    
	if(typeof players[id] != 'undefined'){
		players[id].state = state;

		console.log(players);


		for (var c in players)
		{
			var remote = players[c].remote;
			for (var cc in players)
			{	
				// Don't send to myself
				if(c == cc){
					continue;
				}
				remote.spawnEnemy(players[cc].id, players[cc].order,players[cc].state);		
			}
		}
	}else{
		console.log("Error! Player: ",id," is undefined.");
	}
}

/**
* Player calls this method in it's update function and sends in it's state 
* whenever it wants. 
* This method turns around and sends out player states to everyone. 
*/
eurecaServer.exports.handleState = function (id,state) {
    console.log(id,state);
    
	if(typeof players[id] != 'undefined'){
		players[id].state = state;
			
		for (var c in players)
		{
			var remote = players[c].remote;
			
			remote.updateState(id, state);
			
		}
	}else{
		console.log("Error! Player: ",id," is undefined.");
	}
}

eurecaServer.exports.playerExists = function (id){
	// for (var key in players){
	// 	console.log(players[key].id);
	// }
	return (typeof players[id] != undefined);
}

eurecaServer.exports.checkPlayerGuid = function(id,guid){

	var temp = IdPairs;
	IdPairs = [];
	for(var i = 0;i<temp.length;i++){
		if(String(temp[i].cid).trim() == String(guid).trim()){
			//var remote = players[temp[i]].remote;
			//remote.kill(temp[i].eid);
			console.log("Deleting unused id: ",temp[i].eid);
			delete players[temp[i].eid];
		}else{
			IdPairs.push(temp[i]);
		}
		// for(var p in players){
		// 	console.log(p);
		// }
		

	}
	IdPairs.push({'eid':id,'cid':guid});
	//console.log(IdPairs);


}


/**
* This method broadcasts all players state's to everyone. 
*/
eurecaServer.exports.handshake = function()
{
    console.log("handshake");


	for (var c in players)
	{
		if(typeof players[c] != 'undefined'){
			var remote = players[c].remote;
			for (var cc in players)
			{	
				remote.spawnEnemy(players[cc].id,players[cc].state);		
			}
		}else{
			console.log("Error: player with id: ",c," doesn't exist");
		}
	}
}


function getOrderConnected(){
    var id = Order;
    Order = Order + 1;
    return id;
}


app.get('/', function (req, res, next) {
    res.sendFile(__dirname+'/index.html');
});


server.listen(process.env.PORT || 55555, function () {
    console.log('\033[96mlistening on localhost:55555 \033[39m');
});
