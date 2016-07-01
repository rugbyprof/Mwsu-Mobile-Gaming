class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
    //this.ready = true;
  }

  loadResources() {
    this.load.tilemap('desert', 'assets/desert.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/tmw_desert_spacing.png');
    this.load.image('car', 'assets/car90.png');

  }

  create() {}

  update() {
    if (this.ready) {
      this.game.state.start('menu');
    }
  }

  onLoadComplete() {
    this.ready = true;
  }
}

export default Preloader;
