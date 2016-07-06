  
  //index.html
    <script src="src/Game3.js"></script>
  game.state.add('Game3',BasicGame.Game3);
    
//Game3.js 
    map = this.game.add.tilemap('roads');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('roads-grass', 'road_tiles');
    
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    layer = map.createLayer('roads-layer');


//====================================================================

var playState = {
    /** 
    * Establish eureca client and setup some globals
    */
    init: function(){

        game.global.uniqueId = null;

        //sessionStorage.removeItem('guid');
        
        if(!sessionStorage.getItem('guid')){
            game.global.uniqueId = guid();
            sessionStorage.setItem('guid',game.global.uniqueId);
        }else{
            game.global.uniqueId = sessionStorage.getItem('guid');
        }

        console.log(game.global.uniqueId );

        //Add the server client for multiplayer
        this.client = new Eureca.Client();
        
        game.global.playerReady = false;

        game.global.dude = null;
        
        game.global.players = {};



    },
    /**
    * Calls the dude's update method
    */
    update: function() {
    	if (!game.global.playerReady) 
    	    return;
    	    
        
        game.global.dude.update();
        //this.hulk.animations.play('right');


    },
    /**
    * Initialize the multiPlayer methods
    * and bind some keys to variables
    */
    create: function(){
        this.initMultiPlayer(game,game.global);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.map = game.add.tilemap('roads-map');
        this.map.addTilesetImage('roads-grass');
        this.map.setCollision(24);



        game.global.layer = this.map.createLayer('roads-layer');
        game.global.layer.resizeWorld();

        console.log(game.global.layer);


        //this.sprite = this.game.add.sprite(this.x, this.y, 'dude');


        npc = new Npc(game,this.map);


    },
    
    /**
    * Handles communication with the server
    */
    initMultiPlayer: function(game,globals){
        
        // Reference to our eureca so we can call functions back on the server
        var eurecaProxy;
        
        /**
        * Fires on initial connection
        */
        this.client.onConnect(function (connection) {
            console.log('Incoming connection');
            
        });
        /**
        * When the connection is established and ready
        * we will set a local variable to the "serverProxy" 
        * sent back by the server side.
        */
        this.client.ready(function (serverProxy) {
             // Local reference to the server proxy to be 
             // used in other methods within this module.
             eurecaProxy = serverProxy;
        });
        
        /**
        * This sets the players id that we get from the server
        * It creates the instance of the player, and communicates
        * it's state information to the server.
        */
        this.client.exports.setId = function(id,info){
            console.log("Setting Id:" + id,info);

            console.log(globals.players);

            eurecaProxy.checkPlayerGuid(id,globals.uniqueId);

            // Assign my new connection Id
            globals.myId = id;
            
            // Create new "dude"
            globals.dude = new Player(id, info.order, game, eurecaProxy);
            
            state = globals.dude.getState();
            console.log(state);
            
            // Put instance of "dude" into list
            globals.players[id] = {state:{},obj:{}};
            globals.players[id].state = globals.dude.getState();
            globals.players[id].obj = globals.dude;
        
            //Send state to server
            //
            eurecaProxy.initPlayer(id,state);
        
            // debugging
            console.log(globals.players);

            // Were ready to go
            globals.playerReady = true;
            
        }

        /**
        * Called from server when another player "disconnects"
        */
        this.client.exports.kill = function(id){	
            
            if(typeof globals.players[id] != 'undefined'){
                globals.players[id].obj.kill();
                delete globals.players[id];

                console.log('killing ', id, globals.players[id]);
            }


        }	

        /**
        * This is called from the server to spawn enemy's in the local game
        * instance.
        */
        this.client.exports.spawnEnemy = function(id, order, enemy_state){
            
            if (id == globals.myId){
                return; //this is me
            }

            console.log('Spawning New Player');
            console.log(enemy_state);
            globals.players[id] = {state:{},obj:{}};
            globals.players[id].state = enemy_state;
            globals.players[id].obj = new Player(id, order, game, eurecaProxy);
            globals.players[id].obj.updateState(enemy_state);
    
            //enemy.init()
            
            console.log(globals.players);

        }

        /**
        * This is called from the server to update a particular players
        * state. 
        */       
        this.client.exports.updateState = function(id,player_state){
            console.log(id,player_state);

            // Don't do anything if its me
            if(globals.myId == id){
                return;
            }
            
            
            globals.players[id].obj.updateState(player_state);
        }
         
        
    },
    /**
    * Not used
    */
    render: function(){
       
    },
    /**
    * Not used, but could be called to go back to the menu.
    */
    startMenu: function() {
        game.state.start('menu');
    },

};

function Npc(game,map){

    this.game = game;
    this.map = map;

    this.level = [];
    this.acceptable = [];

    for(var i = 0;i<this.map.width;i++){
        this.level[i] = [];
        for(var j = 0;j<this.map.height;j++){
            var index = this.map.getTile(i,j).index;
            this.level[i].push(index);
            if(index != 24){
                this.acceptable.push(index);
            }
        }
    }

    this.easystar = new EasyStar.js();
    this.easystar.setGrid(this.level);
    this.easystar.setAcceptableTiles(this.acceptable);
    this.easystar.enableDiagonals();
    this.easystar.enableCornerCutting();
    
}

function Player(index, order, game,proxyServer) {
    this.game = game;

    // this.x = this.game.rnd.integerInRange(40, this.game.width-40);
    // this.y = this.game.rnd.integerInRange(40, this.game.height - 40);

    this.x = 760;
    this.y = 560;  

    this.old_x = this.x;
    this.old_y = this.y;

    this.player_id = index;
    
    this.player_order = order;           // game join order (debugging)
    
    this.alive = true;                  // player alive or dead

    this.proxy = proxyServer;                  // reference to proxy server

    this.tint_val = Math.random();
    
    this.tint;                   // player tint

    //this.sprite = this.game.add.sprite(this.x, this.y, 'dude');
    this.sprite = this.game.add.sprite(this.x, this.y, 'player');
    this.sprite.frame = 1;

    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.sprite.body.collideWorldBounds = true;


    this.sprite.animations.add('down', [0,1,2,3,4,5,6,7,8], 20, true);
    this.sprite.animations.add('up', [20,21,22,23,24,25,26,27], 20, true);
    this.sprite.animations.add('left', [10,11,12,13,14,15,16,17], 20, true);
    this.sprite.animations.add('right', [30,31,32,33,34,35,36,37,38,39], 20, true);

    this.sprite.anchor.setTo(0.5,0.5);

    this.sprite.speed = 200;

    this.game.physics.enable(this.sprite);
    this.game.camera.follow(this.sprite);

    this.sprite.id = index;

    //this.sprite.tint = this.tint_val * 0xffffff;

    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

    this.state = {alive:true,tint_val:this.tint_val,x:this.x,y:this.y};             // state info about player

    this.health = 30;                                                               // player health 
    this.startTime = this.game.time.time;;                                          // starting game time  

    this.lastDirection = 180;

}

Player.prototype.updateState = function(state){
    this.tint_val = state.tint_val;
    this.sprite.x = state.x;
    this.sprite.y = state.y;
    this.alive = state.alive;
    this.health = state.health;
    
    if(this.game.time.time - this.startTime > 2000){
        this.startTime = this.game.time.time;
    }
};

Player.prototype.getState = function(){
    return this.state;
}

Player.prototype.update = function() {
    this.state.tint_val = this.tint_val;
    this.state.x = this.sprite.x;
    this.state.y = this.sprite.y;
    this.state.alive = this.alive;
    this.state.health = this.health;

    //this.sprite.tint = this.state.tint_val * 0xffffff;

    // Send your own state to server on your update and let
    // it do whatever with it.

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    if(this.movedEnough(5)){
        this.proxy.handleState(this.player_id,this.state);
        //this.game.debug.body(this.sprite);
    }

    if (this.upKey.isDown)
    {
        if(typeof this.hulk != 'undefined'){
            this.hulk.destroy();
        }
        if(this.leftKey.isDown){
            this.sprite.animations.play('left');
            this.lastDirection = 270;
        }else if(this.rightKey.isDown){
            this.sprite.animations.play('right');
            this.lastDirection = 90;
        }else{
            this.sprite.animations.play('up');
            this.lastDirection = 0;
        }
        //this.sprite.y-=3;
        this.sprite.body.velocity.y = -this.sprite.speed;
    }
    if (this.downKey.isDown)
    {
        if(this.rightKey.isDown){
            this.sprite.animations.play('right');
            this.lastDirection = 90;
        }else if(this.leftKey.isDown){
            this.sprite.animations.play('left');
            this.lastDirection = 270;
        }else{
            this.sprite.animations.play('down');
            this.lastDirection = 180;
        }
        //this.sprite.y+=3;
        this.sprite.body.velocity.y = this.sprite.speed;
    }

    if (this.leftKey.isDown)
    {
        //this.sprite.x-=3;
        this.sprite.animations.play('left');
        this.lastDirection = 270;
        this.sprite.body.velocity.x = -this.sprite.speed;
    }

    if (this.rightKey.isDown)
    {
        //this.sprite.x+=3;
        this.sprite.animations.play('right');
        this.lastDirection = 90;
        this.sprite.body.velocity.x = this.sprite.speed;
    }
    
    if(!this.rightKey.isDown && !this.leftKey.isDown && !this.downKey.isDown && !this.upKey.isDown){
        this.sprite.animations.stop();
        if(typeof this.hulk == 'undefined'){
            this.theHulk();
            this.hulk.play('smash-right');
        }

        if(this.lastDirection == 0){
            this.sprite.frame = 23;
        }else if(this.lastDirection == 90){
            this.sprite.frame = 31;
        }else if(this.lastDirection == 270){
            this.sprite.frame = 14;
        }else{
            this.sprite.frame = 0;
        }
    }

    this.game.physics.arcade.collide(this.sprite, this.game.global.layer);


};

Player.prototype.movedEnough = function(d){

    if((Math.abs(this.sprite.x - this.old_x) > d) || (Math.abs(this.sprite.y - this.old_y) > d)){
        console.log(Math.abs(this.sprite.x - this.old_x))
        console.log(Math.abs(this.sprite.y - this.old_y))
        this.old_x = this.sprite.x;
        this.old_y = this.sprite.y;
        return true;
    }
    return false;
}

Player.prototype.render = function() {
    this.game.debug.text( "This is debug text", 100, 380 );
};

Player.prototype.kill = function() {
    this.alive = false;
    this.sprite.kill();
};

Player.prototype.theHulk = function() {
    this.hulk = this.game.add.sprite(this.sprite.x-30, this.sprite.y, 'hulk');

    this.game.physics.enable(this.hulk, Phaser.Physics.ARCADE);
    this.hulk.body.collideWorldBounds = false;


    this.hulk.animations.add('smash-left', [4,3,2,1,0], 10, true);
    this.hulk.animations.add('smash-right', [8,9,10,11,12], 10, true);
    this.hulk.animations.add('left', [31,30,29,28,27,26,25,24], 20, true);
    this.hulk.animations.add('right', [16,17,18,19,20,21,22,23], 20, true);

    this.hulk.anchor.setTo(0.5,0.5);
    this.hulk.frame = 32;

    this.hulk.speed = 200;
};



function guid() {
  return btoa(s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4());
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}