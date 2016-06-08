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
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('mushroom', '../assets/sprites/mushroom2.png');

}

function create() {

    //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
    var test = game.add.sprite(200, 200, 'mushroom');

}
</script>