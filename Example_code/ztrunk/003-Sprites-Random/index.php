<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
	<title>Phaser - Making your first game, part 1</title>
	<script type="text/javascript" src="../js/phaser.min.js"></script>
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body>

<script type="text/javascript">
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var timer = 0;
var total = 0;

function preload() {

    //  37x45 is the size of each frame
    //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
    //  blank frames at the end, so we tell the loader how many to load
    game.load.spritesheet('pacman', '../assets/sprites/pacman_by_oz_28x28.png', 28, 28);

}

function create() {

    releasePacman();

}

function releasePacman() {

    var pacman = game.add.sprite(-(Math.random() * 800), game.world.randomY, 'pacman');

    pacman.scale.setTo(1.5, 1.5);

    //  If you prefer to work in degrees rather than radians then you can use Phaser.Sprite.angle
    //  otherwise use Phaser.Sprite.rotation
    pacman.angle = game.rnd.angle();

    pacman.animations.add('walk',[0,1,2,3]);
    pacman.animations.play('walk' ,20, true);

    game.add.tween(pacman).to({ x: game.width + (1600 + pacman.x) }, 20000, Phaser.Easing.Linear.None, true);

    total++;
    timer = game.time.now + 100;

}

function update() {

    if (total < 200 && game.time.now > timer)
    {
        releasePacman();
    }

}
</script>