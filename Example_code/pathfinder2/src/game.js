class Game extends Phaser.State {

  create() {
    this.input.onDown.add(this.onInputDown, this);
      
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.add.tilemap('desert');
    this.map.addTilesetImage('Desert', 'tiles');
    this.currentTile = this.map.getTile(2, 3);
    this.layer = this.map.createLayer('Ground');
    this.layer.resizeWorld();
      

    this.easystar = new EasyStar.js();
      
    this.easystar.setGrid(this.map.layers[0].data);
      
    this.easystar.setAcceptableTiles([30]);  
      
    this.easystar.findPath([0,0], [20,20], function( path ) {
        if (path === null) {
            alert("Path was not found.");
        } else {
            alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
        }
    });
      

    this.sprite = this.add.sprite(450, 80, 'car');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.physics.enable(this.sprite);

    this.camera.follow(this.sprite);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.marker = this.add.graphics();
    this.marker.lineStyle(2, 0x000000, 1);
    this.marker.drawRect(0, 0, 32, 32);
  }

  findPathTo(tilex, tiley) {


    //this.easystar.calculate();
  }

  update() {
    this.physics.arcade.collide(this.sprite, this.layer);

    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.sprite.body.angularVelocity = 0;

    if (this.cursors.left.isDown)
    {
        this.sprite.body.angularVelocity = -200;
    }
    else if (this.cursors.right.isDown)
    {
        this.sprite.body.angularVelocity = 200;
    }

    if (this.cursors.up.isDown)
    {
        this.sprite.body.velocity.copyFrom(this.physics.arcade.velocityFromAngle(this.sprite.angle, 300));
    }

    this.marker.x = this.layer.getTileX(this.input.activePointer.worldX) * 32;
    this.marker.y = this.layer.getTileY(this.input.activePointer.worldY) * 32;

    if (this.input.mousePointer.isDown)
    {
        this.blocked = true;
        this.findPathTo(this.layer.getTileX(this.marker.x), this.layer.getTileY(this.marker.y));
    }

  }
    
  onInputDown() {
    //this.game.state.start('menu');
  }

}

export default Game;
