BasicGame.Game = function(game) {

    // When a State is added to Phaser it automatically has the
    // following properties set on it, even if they already exist:

    this.game; //  a reference to the currently running game
    this.add; //  used to add sprites, text, groups, etc
    this.camera; //  a reference to the game camera
    this.cache; //  the game cache
    this.input; //  the global input manager (you can access
    //  this.input.keyboard, this.input.mouse, as well
    //  from it)
    this.load; //  for preloading assets
    this.math; //  lots of useful common math operations
    this.sound; //  the sound manager - add a sound, play one,
    //  set-up markers, etc
    this.stage; //  the game stage
    this.time; //  the clock
    this.tweens; //  the tween manager
    this.world; //  the game world
    this.particles; //  the particle manager
    this.physics; //  the physics manager
    this.rnd; //  the repeatable random number generator



    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create
    //  a property for your own game called "world" or you'll over-write
    //  the world reference.

};


BasicGame.Game.prototype = {

    create: function() {

        this.shake = 0;


        this.map = this.game.add.tilemap('dungeon');

        //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
        //  The second parameter maps this name to the Phaser.Cache key 'tiles'

        this.map.addTilesetImage('dungeon_sheet', 'dungeon_tiles');

        this.game.world.setBounds(0, 0, 3200, 3200);

        this.map.setCollision([9, 10, 33, 34, 57, 58, 81, 9]);


        //  Creates a layer from the World1 layer in the map data.
        //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
        this.layer = this.map.createLayer('Tile Layer 1');

        //  This resizes the game world to match the layer dimensions
        this.layer.resizeWorld();

        this.spr = this.add.sprite(this.game.width/2, this.game.height/2, 'elf');
        this.spr.speed = 300;
        this.spr.anchor.x = .5
        this.spr.anchor.y = .5


        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.game.physics.enable(this.spr, Phaser.Physics.ARCADE);

        this.game.camera.follow(this.spr);


        var fullscreen =
            this.add.button(this.game.width - 8, this.game.height - 8,
                'fullscreen',
                BasicGame.toggleFullscreen,
                this,
                'over', 'up', 'down');
        fullscreen.pivot.x = fullscreen.width;
        fullscreen.pivot.y = fullscreen.height;


        // Create a bitmap texture for drawing lines
        this.bitmap = this.game.add.bitmapData(this.game.width, this.game.height);
        this.bitmap.context.fillStyle = 'rgb(255, 255, 255)';
        this.bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
        this.game.add.image(0, 0, this.bitmap);

        // Build some walls. These will block line of sight.
        var NUMBER_OF_WALLS = 4;
        this.walls = this.game.add.group();
        var i, x, y;
        for(i = 0; i < NUMBER_OF_WALLS; i++) {
            x = i * this.game.width/NUMBER_OF_WALLS + 50;
            y = this.game.rnd.integerInRange(50, this.game.height - 200);
            this.game.add.image(x, y, 'wall', 0, this.walls).scale.setTo(.5,.5);
        }

        // Place some people in random locations
        var NUMBER_OF_PEOPLE = 6;
        var monster_array = ['monster1','monster2','monster3','monster4','monster5'];
        this.monsters = this.game.add.group();
        for(i = 0; i < NUMBER_OF_PEOPLE; i++) {
            // Choose a random location on the screen
            x = this.game.rnd.integerInRange(32, this.game.width - 32);
            y = this.game.rnd.integerInRange(32, this.game.height - 32);

            // Create a person
            var monster = this.game.add.sprite(x, y, monster_array[this.game.rnd.integerInRange(0, 4)]);

            // Set the pivot point of the person to the center of the texture
            monster.anchor.setTo(0.5, 0.5);

            // Add the person to the people group
            this.monsters.add(monster);
        }

        this.explosions = this.game.add.group();

        for (var i = 0; i < 10; i++)
        {
            this.explosionAnimation = this.explosions.create(0, 0, 'kaboom', [0], false);
            this.explosionAnimation.anchor.setTo(0.5, 0.5);
            this.explosionAnimation.animations.add('kaboom');
        }

    },

    update: function() {
        // Separate any people overlapping walls.
        // This isn't necessary for the algorithm but it looks nicer.
        this.walls.forEach(function(wall) {
            this.monsters.forEach(function(monster) {
                if (monster.overlap(wall)) {
                    if (wall.width > wall.height) {
                        monster.y += 64;
                    } else {
                        monster.x += 64;
                    }
                }
            }, this);
        }, this);

        // Move the ball to the pointer/touch location
        //this.spr.body.x = this.game.input.activePointer.x;
        //this.spr.body.y = this.game.input.activePointer.y;

        // Clear the bitmap where we are drawing our lines
        this.bitmap.context.clearRect(0, 0, this.game.width, this.game.height);

        // Ray casting!
        // Test if each person can see the ball by casting a ray (a line) towards the ball.
        // If the ray intersects any walls before it intersects the ball then the wall
        // is in the way.
        this.monsters.forEach(function(monster) {
            // Define a line that connects the person to the ball
            // This isn't drawn on screen. This is just mathematical representation
            // of a line to make our calculations easier. Unless you want to do a lot
            // of math, make sure you choose an engine that has things like line intersection
            // tests built in, like Phaser does.
            var ray = new Phaser.Line(monster.x, monster.y, this.spr.body.x, this.spr.body.y);

            // Test if any walls intersect the ray
            var intersect = this.getWallIntersection(ray);

            if (intersect) {
                console.log(intersect);
                // A wall is blocking this persons vision so change them back to their default color
                monster.tint = 0xffffff;
                // this.bitmap.context.beginPath();
                // this.bitmap.context.moveTo(monster.x, monster.y);
                // this.bitmap.context.lineTo(this.spr.body.x, this.spr.body.y);
                // this.bitmap.context.stroke();
            } else {
                // This person can see the ball so change their color
                monster.tint = 0xffaaaa;

                // Draw a line from the ball to the person
                this.bitmap.context.beginPath();
                this.bitmap.context.moveTo(monster.x, monster.y);
                this.bitmap.context.lineTo(this.spr.body.x+16, this.spr.body.y+16);
                this.bitmap.context.stroke();
                if(this.fireButton.isDown){
                    this.destroyMonster(monster);
                }
            }
        }, this);

        // This just tells the engine it should update the texture cache
        this.bitmap.dirty = true;


        this.spr.body.velocity.x = 0;
        this.spr.body.velocity.y = 0;

        if (this.cursors.up.isDown) {
            this.spr.body.velocity.y = -this.spr.speed;
        } else if (this.cursors.down.isDown) {
            this.spr.body.velocity.y = this.spr.speed;
        }

        if (this.cursors.left.isDown) {
            this.spr.body.velocity.x = -this.spr.speed;
        } else if (this.cursors.right.isDown) {
            this.spr.body.velocity.x = this.spr.speed;
        }
        this.game.world.wrap(this.spr, 0, true);

        if (this.spr.body.x > 60 && this.spr.body.x < 100 && this.spr.body.y > 400 && this.spr.body.y < 500) {
            BasicGame.life = BasicGame.life * .9;
            console.log(BasicGame);
            this.shake = 40;
            this.shakeWorld();
            //this.state.start('Game2');
        }

        this.game.physics.arcade.collide(this.spr, this.layer);
    },

    shakeWorld: function() {
        var rand1 = this.game.rnd.integerInRange(-20, 20);
        var rand2 = this.game.rnd.integerInRange(-20, 20);
        this.game.world.setBounds(rand1, rand2, this.game.width + rand1, this.game.height + rand2);
        this.shake--;
        if (this.shake == 0) {
            this.game.world.setBounds(0, 0, this.game.width, this.game.height); // normalize after shake?    
        }
    },

    render: function() {

        this.game.debug.cameraInfo(this.game.camera, 500, 32);
        this.game.debug.spriteCoords(this.spr, 32, 32);

    },

    quitGame: function(pointer) {

        this.state.start('MainMenu');
    },

    destroyMonster: function (monster) {
        console.log(monster.x,monster.y);
        var explosionAnimation = this.explosions.getFirstExists(false);
        explosionAnimation.reset(monster.x, monster.y);
        explosionAnimation.play('kaboom', 30, false, true);
    },

    getWallIntersection : function(ray) {
        var distanceToWall = Number.POSITIVE_INFINITY;
        var closestIntersection = null;

        // For each of the walls...
        this.walls.forEach(function(wall) {
            // Create an array of lines that represent the four edges of each wall
            var lines = [
                new Phaser.Line(wall.x, wall.y, wall.x + wall.width, wall.y),
                new Phaser.Line(wall.x, wall.y, wall.x, wall.y + wall.height),
                new Phaser.Line(wall.x + wall.width, wall.y,
                    wall.x + wall.width, wall.y + wall.height),
                new Phaser.Line(wall.x, wall.y + wall.height,
                    wall.x + wall.width, wall.y + wall.height)
            ];

            // Test each of the edges in this wall against the ray.
            // If the ray intersects any of the edges then the wall must be in the way.
            for(var i = 0; i < lines.length; i++) {
                var intersect = Phaser.Line.intersects(ray, lines[i]);
                if (intersect) {
                    // Find the closest intersection
                    distance =
                        this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);
                    if (distance < distanceToWall) {
                        distanceToWall = distance;
                        closestIntersection = intersect;
                    }
                }
            }
        }, this);

        return closestIntersection;
    }
};