var loadState = {
  preload: function(){
    var scene = game;
    var loadingLabel = game.add.text(80, 150, 'Loading...', {font: '30px Arial'});
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#ffffff';
  
    game.load.image('mainEnemy', 'img/mainEnemy.png');

    game.load.image('tileset', 'assets/gridtiles.png');
    //game.load.tilemapTiledJSON('map', 'assets/map.json');
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    

  },

  create: function() {
    //game.state.start('menu');
    game.state.start('play');
  }
}
