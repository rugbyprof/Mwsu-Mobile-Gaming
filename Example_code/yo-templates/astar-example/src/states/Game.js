/*
 * Game state
 * ==========
 *
 * A sample Game state, displaying the Phaser logo.
 */

import Logo from '../objects/Logo';

export default class Game extends Phaser.State {

  create() {
    // TODO: Replace this with really cool game code here :)

    this.input.onDown.add(this.onInputDown, this);
      
    const {centerX: x, centerY: y} = this.world;
    this.add.existing(new Logo(this.game, x, y));
  }
    
    onInputDown() {
        this.state.start('Astar');
    }

}
