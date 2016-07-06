/*
 * Astar state
 *
 * level two
 */
export default class Astar extends Phaser.State {

    init() {
        this.map = null;
        this.tileset = null;
        this.layer = null;
        this.pathfinder = null;
        this.cursors = null;
        this.car = null;
        this.marker = null;
        this.blocked = null;
    }

    create() {
        //this.input.onDown.add(this.onInputDown, this);
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.add.tilemap('desert');
        this.map.addTilesetImage('Desert', 'tiles');
        this.currentTile = this.map.getTile(2, 3);
        this.layer = this.map.createLayer('Ground');
        this.layer.resizeWorld();

        var walkables = [30];

        this.pathfinder = this.plugins.add(Phaser.Plugin.PathFinderPlugin);
        this.pathfinder.setGrid(map.layers[0].data, walkables);

        this.car = this.add.sprite(450, 80, 'car');
        this.car.anchor.setTo(0.5, 0.5);

        this.physics.enable(this.car);

        this.camera.follow(this.car);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);
    }

    update() {
        game.physics.arcade.collide(sprite, layer);

        this.car.body.velocity.x = 0;
        this.car.body.velocity.y = 0;
        this.car.body.angularVelocity = 0;

        if (this.cursors.left.isDown) {
            this.car.body.angularVelocity = -200;
        } else if (this.cursors.right.isDown) {
            this.car.body.angularVelocity = 200;
        }

        if (this.cursors.up.isDown) {
            this.car.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(sprite.angle, 300));
        }

        this.marker.x = this.layer.getTileX(game.input.activePointer.worldX) * 32;
        this.marker.y = this.layer.getTileY(game.input.activePointer.worldY) * 32;

        if (game.input.mousePointer.isDown) {
            this.blocked = true;
            this.findPathTo(layer.getTileX(this.marker.x), layer.getTileY(marker.y));
        }
    }

    findPathTo(tilex, tiley) {

        this.pathfinder.setCallbackFunction(function(path) {
            path = path || [];
            for (var i = 0, ilen = path.length; i < ilen; i++) {
                this.map.putTile(46, path[i].x, path[i].y);
            }
            this.blocked = false;
        });

        this.pathfinder.preparePathCalculation([0, 0], [tilex, tiley]);
        this.pathfinder.calculatePath();
    }

}