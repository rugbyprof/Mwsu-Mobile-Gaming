var loadState = {

    preload: function () {

        // Game loader assets
        // ======================================================================================================= 
        var loadingLabel = game.add.text(game.width/2, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });
        loadingLabel.anchor.setTo(0.5, 0.5);

        var progressBar = game.add.sprite(game.width/2, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);
    

        // Player Assets
        // ======================================================================================================= 
        //game.load.spritesheet('player', 'assets/dude.png', 32, 48);
        game.load.spritesheet('player', 'assets/elf_30x32.png',30,32);

        game.load.spritesheet('hulk', 'assets/hulk.png',72,72);

        game.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        game.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        game.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
        


        // Map assets
        // ======================================================================================================= 
        game.load.tilemap('roads-map', 'assets/roads-improved.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('roads-grass', 'assets/roads-grass.bmp');


    },

    create: function() { 
        game.state.start('play');
    }
};