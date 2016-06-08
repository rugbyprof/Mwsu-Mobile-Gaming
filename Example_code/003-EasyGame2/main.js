var mainState = {
    preload: function() {
        game.load.image('player', 'assets/player.png');
    },

    create: function() { 
        
        //1. Change the background color of the game
        game.stage.backgroundColor = '#3498db';
        
        //2. Tell phaser we are going to use arcade physics for this game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //3. Crisper images when using pixel art
        game.renderer.renderSession.roundPixels = true;
        
        // Create a local variable with 'var player'
        //this.player = game.add.sprite(250, 170, 'player');
        
        this.player = game.add.sprite(game.width/2, game.height/2, 'player');
        
        // Set the anchor point to the top left of the sprite (default value)
        this.player.anchor.setTo(0, 0);
        // Set the anchor point to the top right
        this.player.anchor.setTo(1, 0);
        // Set the anchor point to the bottom left
        this.player.anchor.setTo(0, 1);
        // Set the anchor point to the bottom right
        this.player.anchor.setTo(1, 1);
        
        this.player.anchor.setTo(0.5, 0.5);
        
        // Tell Phaser that the player will use the Arcade physics engine
        game.physics.arcade.enable(this.player);
        // Add vertical gravity to the player
        this.player.body.gravity.y = 500;
        
        this.cursor = game.input.keyboard.createCursorKeys();
    },

    update: function() {
        // We have to use 'this.' to call a function from our state
        this.movePlayer();
    },
    
    movePlayer: function() {
        // If the left arrow key is pressed
        if (this.cursor.left.isDown) {
            // Move the player to the left
            // The velocity is in pixels per second
            this.player.body.velocity.x = -200;
        }
        // If the right arrow key is pressed
        else if (this.cursor.right.isDown) {
            // Move the player to the right
            this.player.body.velocity.x = 200;
        }
        // If neither the right or left arrow key is pressed
        else {
            // Stop the player
            this.player.body.velocity.x = 0;
        }
        // If the up arrow key is pressed and the player is on the ground
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            // Move the player upward (jump)
            this.player.body.velocity.y = -320;
        }
    }
};

var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');