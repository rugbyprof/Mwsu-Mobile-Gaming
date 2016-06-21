GameCtrl.Game = function (game) {

        //        When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;                //        a reference to the currently running game
    this.add;                //        used to add sprites, text, groups, etc
    this.camera;        //        a reference to the game camera
    this.cache;                //        the game cache
    this.input;                //        the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;                //        for preloading assets
    this.math;                //        lots of useful common math operations
    this.sound;                //        the sound manager - add a sound, play one, set-up markers, etc
    this.stage;                //        the game stage
    this.time;                //        the clock
    this.tweens;        //        the tween manager
    this.world;                //        the game world
    this.particles;        //        the particle manager
    this.physics;        //        the physics manager
    this.rnd;                //        the repeatable random number generator

    //        You can use any of these from any function within this State.
    //        But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

GameCtrl.Game.prototype = {
    
        init: function(){
    
            this.maze = [];
            this.mazeWidth = 100;
            this.mazeHeight = 76;
            this.tileSize = 10;
            this.mazeGraphics = null; 
        },

        create: function () {

              this.mazeGraphics = this.game.add.graphics(0, 0);
              this.moves = [];
              for(var i = 0; i < this.mazeHeight; i ++){
                   this.maze[i] = [];
                   for(var j = 0; j < this.mazeWidth; j ++){
                        this.maze[i][j] = 1;
                   }
              }
              this.posX = 1;
              this.posY = 1;
              this.maze[this.posX][this.posY] = 0; 
              this.moves.push(this.posY + this.posY * this.mazeWidth);          
              while(this.moves.length){       
                   this.possibleDirections = "";
                   if(this.posX+2 > 0 && this.posX + 2 < this.mazeHeight - 1 && this.maze[this.posX + 2][this.posY] == 1){
                        this.possibleDirections += "S";
                   }
                   if(this.posX-2 > 0 && this.posX - 2 < this.mazeHeight - 1 && this.maze[this.posX - 2][this.posY] == 1){
                        this.possibleDirections += "N";
                   }
                   if(this.posY-2 > 0 && this.posY - 2 < this.mazeWidth - 1 && this.maze[this.posX][this.posY - 2] == 1){
                        this.possibleDirections += "W";
                   }
                   if(this.posY+2 > 0 && this.posY + 2 < this.mazeWidth - 1 && this.maze[this.posX][this.posY + 2] == 1){
                        this.possibleDirections += "E";
                   } 
                   if(this.possibleDirections){
                        this.move = this.game.rnd.integerInRange(0, this.possibleDirections.length - 1);
                        switch (this.possibleDirections[this.move]){
                                
                             case "N": 
                                  this.maze[this.posX - 2][this.posY] = 0;
                                  this.maze[this.posX - 1][this.posY] = 0;
                                  this.posX -= 2;
                                  break;
                             case "S":
                                  this.maze[this.posX + 2][this.posY] = 0;
                                  this.maze[this.posX + 1][this.posY] = 0;
                                  this.posX += 2;
                                  break;
                             case "W":
                                  this.maze[this.posX][this.posY - 2] = 0;
                                  this.maze[this.posX][this.posY - 1] = 0;
                                  this.posY -= 2;
                                  break;
                             case "E":
                                  this.maze[this.posX][this.posY + 2]=0;
                                  this.maze[this.posX][this.posY + 1]=0;
                                  this.posY += 2;
                                  break;         
                        }
                        this.moves.push(this.posY + this.posX * this.mazeWidth);     
                   }
                   else{
                        this.back = this.moves.pop();
                        this.posX = Math.floor(this.back / this.mazeWidth);
                        this.posY = this.back % this.mazeWidth;
                   }                                 
              }     
              this.drawMaze(this.posX, this.posY);      
              this.easystar = new EasyStar.js(); 
              this.easystar.setGrid(this.maze);
              this.easystar.setAcceptableTiles([0]);
              this.easystar.findPath(1, 1, 79, 59, this.drawPath);
              this.easystar.calculate();

        },

        update: function () {

                //        Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        },

        quitGame: function (pointer) {

                //        Here you should destroy anything you no longer need.
                //        Stop music, delete sprites, purge caches, free resources, all that good stuff.

                //        Then let's go back to the main menu.
                this.game.state.start('MainMenu');

        },
    
        drawPath: function (path){
             var i = 0;
             this.game.time.events.loop(Phaser.Timer.SECOND/25, function(){
                  if(i < path.length){
                       this.mazeGraphics.beginFill(0xff0000);
                       this.mazeGraphics.drawRect(path[i].x * this.tileSize + 3, path[i].y * this.tileSize + 3, this.tileSize - 6, this.tileSize - 6); 
                       i++;    
                       this.mazeGraphics.endFill(); 
                  }
             })
        },

         drawMaze: function(posX, posY){
             this.mazeGraphics.clear();
             this.mazeGraphics.beginFill(0xcccccc);
             for(i = 0; i < this.mazeHeight; i ++){
                  for(j = 0; j < this.mazeWidth; j ++){
                       if(this.maze[i][j] == 1){
                            this.mazeGraphics.drawRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);                 
                       }
                  }
             }
             this.mazeGraphics.endFill();    
        } 

};