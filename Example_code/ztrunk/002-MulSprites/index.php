
<?php
if(!isset($_GET['s'])){
    $s = 5;
}else{
    $s = $_GET['s'];
}
?>
<!doctype html> 
<html lang="en"> 
<head> 
	<meta charset="UTF-8" />
	<title>Phaser - 002-Multiple Sprites</title>
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
    <?php
        $dir = scandir('../assets/sprites/');
        array_shift($dir);
        array_shift($dir);
        shuffle($dir);
        $sprites = [];
        foreach($dir as $image){
            $parts = pathinfo('../assets/sprites/'.$image);
            list($width, $height, $type, $attr) = getimagesize('../assets/sprites/'.$image);
            if($parts['extension'] != 'png' || $width > 72 || $height > 72){
                continue;
            }
            $name = $parts['filename'];
            echo"\tgame.load.image('{$name}', '../assets/sprites/{$image}');\n";
            $sprites[] = $name;
            if(sizeof($sprites) > $s){
                break;
            }
        }
    ?>
   
}

function create() {

    //  This simply creates a sprite using the mushroom image we loaded above and positions it at 200 x 200
    var x = 0;
    var y = 0;
    <?php
        foreach($sprites as $sprite){
            echo"\tx = Math.floor((Math.random() * game.world.width) + 1);\n";
            echo"\ty = Math.floor((Math.random() * game.world.height) + 1);\n";
            echo"\tvar test = game.add.sprite(x, y, '{$sprite}');\n";
        }
    ?>

}
</script>