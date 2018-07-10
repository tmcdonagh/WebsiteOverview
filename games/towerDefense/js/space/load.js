var loadState = {
  preload: function(){
    var loadingLabel = game.add.text(80, 150, 'Loading...', {font: '30px Arial'});
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#ffffff';
  
    game.load.image('player', 'img/player.png');
    game.load.image('bullet', 'img/bullet.png');
    game.load.image('alienBullet', 'img/alienBullet.png');
    game.load.image('spaceInvaderGreen', 'img/spaceInvaderBlandGreen.png');  
    game.load.image('missile', 'img/missile.png');
    game.load.image('lazerBeam', 'img/lazerBeam.png');
    game.load.image('lazerIcon', 'img/lazerIcon.png');
    game.load.image('shop', 'img/ShopScreen.png');
    game.load.image('spaceInvaderRed', 'img/spaceInvaderRed.png');
    game.load.image('newEnemy', 'img/newEnemy.png');
    game.load.image('cautionEnemies', 'img/cautionEnemies.png');
    game.load.image('fourthScreen', 'img/fourthLevel.png');
    game.load.spritesheet('explode', 'img/explode.png', 128, 128);
    game.load.image('explosionCircle', 'img/explosionCircle.png');

    

  },

  create: function() {
    //game.state.start('menu');
    game.state.start('play');
  }
}
