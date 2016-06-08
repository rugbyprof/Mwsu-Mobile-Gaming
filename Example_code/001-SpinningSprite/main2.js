var mainState = {
    
    preload: function() {
        game.load.image('logo', 'logo.png');
    },

    create: function() { 
        this.width = this.game.cache.getImage("logo").width;
        this.height = this.game.cache.getImage("logo").height;
        this.sprite = this.game.add.sprite(game.world.centerX - this.width / 2, game.world.centerY - this.height / 2, 'logo');
        this.sprite.anchor.setTo(0.5, 0.5);
    },

    update: function() {
        this.sprite.angle += 1;
        //console.log(this.width);
    },
    
    render: function(){
        //this.game.debug.spriteInfo(this.sprite, 32, 32);
    }
};

var game = new Phaser.Game(400, 300, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');
