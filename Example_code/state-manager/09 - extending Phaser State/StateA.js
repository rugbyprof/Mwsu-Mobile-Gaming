var MyGame = {};

MyGame.StateA = function () {

};

MyGame.StateA.prototype = Object.create(Phaser.State.prototype);
MyGame.StateA.prototype.constructor = MyGame.StateA;

MyGame.StateA.prototype.preload = function () {

    this.load.image('background', '../assets/wave.jpg');
    this.load.image('phaser', '../assets/phaser.png');
    this.load.image('yuzuki', '../assets/yuzuki_yukari_by_vali233.png');

};

MyGame.StateA.prototype.create = function () {

    this.add.sprite(0, 0, 'background');

    this.add.text(16, 16, "State Example: extending Phaser.State", { font: "16px Arial", fill: "#ffffff" });
    this.add.sprite(640, 553, 'phaser');

    this.sprite = this.add.sprite(this.world.centerX, this.world.centerY, 'yuzuki');
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);

};
