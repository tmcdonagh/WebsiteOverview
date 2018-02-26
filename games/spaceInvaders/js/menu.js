var menuState = {
  create: function(){
    var nameLabel = game.add.text(80, 80, 'Test', {font: '50px', fill: '#ffffff'});

    var startLabel = game.add.text(80, game.world.height-80, 'press the "W" key to start', {font: '25px Arial', fill: '#ffffff'});

    var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    wkey.onDown.addOnce(this.start, this);
  },

  start: function(){
    game.state.start('play');
  },
}
