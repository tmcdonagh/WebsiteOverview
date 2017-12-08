var loadState = {
  preload: function(){
    var loadingLabel = game.add.text(80, 150, 'Loading...', {font: '30px Arial'});
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
  
    game.load.image('player', '/games/spaceInvaders/img/brick.png');
    game.load.image('bullet', '/games/spaceInvaders/img/bullet.png');
    game.load.image('spaceInvaderGreen', '/games/spaceInvaders/img/spaceInvaderBlandGreen.png');  
    game.load.image('lazerBeam', '/games/spaceInvaders/img/lazerBeam.png');
    game.load.image('lazerIcon', '/games/spaceInvaders/img/lazerIcon.png');
    game.load.image('shop', '/games/spaceInvaders/img/ShopScreen.png');
    game.load.image('spaceInvaderRed', '/games/spaceInvaders/img/spaceInvaderRed.png');
    game.load.image('newEnemy', '/games/spaceInvaders/img/newEnemy.png');
    game.load.image('cautionEnemies', '/games/spaceInvaders/img/cautionEnemies.png');
    game.load.image('boss', '/games/spaceInvaders/img/boss.png');
  },

  create: function() {
    //game.state.start('menu');
    game.state.start('play');
  }
}
