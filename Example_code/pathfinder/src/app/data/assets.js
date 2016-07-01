/*
 * The `assets` module
 * ============================================================================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package, under
 * `node_modules/phaser/resources/` directory, for a more complete
 * reference.
 *
 */


export default {

  // - Boot Assets ------------------------------------------------------------
  boot: [
    {
      key: 'splash-screen',
      url: 'img/splash-screen.png',
      type: 'image'
    },

    {
      key: 'progress-bar',
      url: 'img/progress-bar.png',
      type: 'image'
    }
  ],

  // - Game assets ------------------------------------------------------------
  game: [
    {
      key: 'phaser',
      url: 'img/phaser.png',
      type: 'image'
    },
    {
      key: 'desert',
      url: 'map/desert.json',
      type: 'tilemap'
    },
    {
      key: 'tiles',
      url: 'img/tmw_desert_spacing.png',
      type: 'image'
    },
    {
      key: 'car',
      url: 'img/car90.png',
      type: 'image'
    }
      
    // Example: adding a background music.
    // {
    //   key: 'tune',
    //   type: 'audio',
    //   urls: [ 'tune.oga', 'tune.m4a' ]
    // }

    // Example: adding a audio sprite containing sound effects.
    // {
    //   key: 'sfx',
    //   type: 'audiosprite',
    //   urls: [ 'sfx.m4a' ],
    //   jsonURL: 'sfx.json'
    // }
  ]

};
