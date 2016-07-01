/*
 * Menu state
 * @extends Phaser.State
 * ===========================================================================
 *
 * 
 */


export default class Menu extends Phaser.State {

  preload () {
      const { centerX: x, centerY: y } = this.world;
      
  }
    
  create () {
      
    this.image = this.add.sprite(this.world.centerX, this.world.centerY, 'phaser');
    console.log(this.image)
    this.image.anchor.set(0.5);
    this.image.onInputOver.add(this.clickListener, this);
    //this.clickListener();
  }

  update () {
    //this.image.angle += 0.1;
      //console.log(this.input.mousePointer)
  }
    
  clickListener () {
      console.log("yup")
      this.state.start('Game');
  }

}
