class Menu extends Phaser.State {

  create() {
    const text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'MENU', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
    });
    text.anchor.set(0.5);

    this.input.onDown.add(this.onInputDown, this);
  }

  update() {}

  onInputDown () {
    this.game.state.start('game');
  }

}

export default Menu;
