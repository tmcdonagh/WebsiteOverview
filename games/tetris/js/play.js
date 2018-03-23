var playState = {
  create:function(){

    scene = [];
    sceneSprites = [];

    for(var i = 0; i < numBlocksX; i++) {
      var col = [];
      var spriteCol = [];
      for(var j = 0; j < numBlocksY; j++) {
        col.push(0);
        spriteCol.push(null);
      }
      scene.push(col);
      sceneSprites.push(spriteCol);
    }
    pauseState = false;
    gameOverState = false;

    var middleSeparator = game.add.graphics(gameWidth, 0);
    middleSeparator.lineStyle(3, 0xffffff, 1);
    placeSerparators();

    game.add.tileSprite(0, game.world.height-blockSize, gameWidth, blockSize, 'blocks', 0);

    scoreTitle = game.add.bitmapText(gameWidth+50, 0, 'desyrel', 'Score', 64);
    scoreText = game.add.bitmapText(scoreX, 60, 'desyrel', '0', 64);
    var linesTitle = //here




  }
};
