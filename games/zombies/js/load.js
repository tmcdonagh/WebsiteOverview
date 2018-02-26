var loadState = {
  preload: function(){
    var loadingLabel = game.add.text(80, 150, 'Loading...', {font: '30px Arial'});
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#ffffff';

    game.load.image('player', 'img/player.png');
    game.load.image('bullet', 'img/bullet.png');
    game.load.image('zombie', 'img/bullet.png');
    game.load.image('earth', 'img/earth.png');
    game.load.image('detectionCircle', 'img/detectionCircle.png');

  },

  create: function(){
    game.state.start('play');
  }
}
