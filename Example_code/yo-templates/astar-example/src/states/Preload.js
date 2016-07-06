/*
 * Preload state
 * =============
 *
 * Takes care of loading the main game assets, including graphics and sound
 * effects, while displaying a splash screen with a progress bar, showing how
 * much progress were made during the asset load.
 */

import assets from '../assets';

export default class Preload extends Phaser.State {

  preload() {
    this.showSplashScreen();
    this.load.pack('game', null, assets);
    this.load.tilemap('desert', 'desert.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'tmw_desert_spacing.png');
    this.load.image('car', 'car90.png');
  }

  create() {
    // Here is a good place to initialize plugins that depend on any game
    // asset. Don't forget to `import` them first. Example:
    //this.add.plugin(MyPlugin/*, ... initialization parameters ... */);

    this.state.start('Game');
  }

  // --------------------------------------------------------------------------

  showSplashScreen() {
    this.add.image(0, 0, 'splash-screen');
    this.load.setPreloadSprite(this.add.image(82, 282, 'progress-bar'));
  }

}
