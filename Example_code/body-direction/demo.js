var BodyDirection = {

    ship: null,
    angleLine: null,
    bulletTime: 0,

    init: function () {

        this.scale.pageAlignHorizontally = true;

    },

    preload: function () {

        this.load.image('ship');
        this.load.image('bullet');

    },

    create: function () {

        this.stage.backgroundColor = 0x754c24;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 100;

        this.ship = this.add.sprite(100, 100, 'ship');
        this.ship.anchor.set(0.5,0.5);

        this.physics.enable(this.ship, Phaser.Physics.ARCADE);

        this.ship.body.bounce.setTo(0.98);
        this.ship.body.velocity.setTo(100, 0);
        this.ship.body.collideWorldBounds = true;
        
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 20; i++)
        {
            var b = this.bullets.create(0, 0, 'bullet');
            b.name = 'bullet' + i;
            b.exists = false;
            b.visible = false;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(this.resetBullet, this);
        }
        
        this.cursors = game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
        
        this.angleLine = new Phaser.Line();

    },

    update: function () {
        
        this.angleLine.fromAngle(this.ship.x, this.ship.y, this.ship.body.angle, this.ship.body.speed / 1);
        
        
        this.ship.rotation = this.ship.body.angle;
        

        
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.fireBullet();
        }
        
         if (this.bullet){
            if(this.bullet.body.x > this.game.world.width){                     
                    this.bullet.body.velocity.x = this.bullet.body.velocity.x * -1;   
                this.bullet.body.rotation += 90;
            }

            if(this.bullet.body.x < 0){           
                this.bullet.body.velocity.x = this.bullet.body.velocity.x * -1;   
                this.bullet.body.rotation -= 90;
            }

            if(this.bullet.body.y > this.game.world.height){                                          
                this.bullet.body.velocity.y = this.bullet.body.velocity.y * -1;
                this.bullet.body.rotation += 90;
            }

            if(this.bullet.body.y < 0){          
                this.bullet.body.velocity.y = this.bullet.body.velocity.y * -1;
                this.bullet.body.rotation -= 90;
            }
        }

    },

    render: function () {

        this.game.debug.geom(this.angleLine, '#00ff00');

        this.game.debug.text('Speed: ' + this.ship.body.speed, 20, 32);

    },
    
    fireBullet: function () {

        
        if (this.game.time.now > this.bulletTime)
        {
            this.bullet = this.bullets.getFirstExists(false);

            if (this.bullet)
            {
                this.bullet.rotation = this.ship.rotation + Math.PI/2;
                var bs = this.bulletStart(40);
                this.bullet.reset(bs.dx, bs.dy);
                //this.bullet.angularVelocity = 300;
                this.game.physics.arcade.velocityFromRotation(this.ship.rotation, 700, this.bullet.body.velocity);
                this.bulletTime = this.game.time.now + 150;
            }
        }

    },
    
    bulletStart: function(d){
        return{
            "dx":this.ship.x + d * Math.cos(this.ship.body.angle),
            "dy":this.ship.y + d * Math.sin(this.ship.body.angle)
        }
    },

    //  Called if the bullet goes out of the screen
     resetBullet: function(bullet) {

            bullet.kill();

    }

};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('Demo', BodyDirection, true);
