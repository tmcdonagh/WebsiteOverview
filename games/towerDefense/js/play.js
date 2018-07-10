var playState = {
  create:function(){
    // game.physics.startSystem(Phaser.Physics.ARCADE);

    //this.input.on('pointerup', handleClick);

    var map = scene.make.tilemap({ key: 'map'});
    var tiles = map.addTilesetImage('tiles', 'tileset');
    map.createStaticLayer(0, tiles, 0, 0);

    var marker = this.add.graphics();
    marker.lineStyle(3, 0xffffff, 1);
    marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

    var finder = new EasyStar.js();

    var grid = [];
    for(var y = 0; y < map.height; y++){
      var col = [];
      for(var x = 0; x < map.width; x++){
        col.push(getTileID(x,y));
      }
      grid.push(col);
    }


    finder.setGrid(grid);

    var tileset = map.tilesets[0];
    var properties = tileset.tileProperties;
    var acceptableTiles = [];

    for(var i = tileset.firstgid-1; i < tiles.total; i++){
      if(!properties.hasOwnProperty(i)) {
        acceptableTiles.push(i+1);
        continue;
      }
      if(!properties[i].collide) acceptableTiles.push(i+1);
      if(properties[i].cost) Game.finder.setTileCost(i+1, properties[i].cost);
    }

    finder.setAcceptableTiles(acceptableTiles);

    movement();
    marker.setVisible(false);



    /* Pause Button */
    pauseButton = game.add.text(game.world.width*0.65, 0, 'Pause', {font: '18px Arial', fill: '#0000CD'});
    pauseButton.inputEnabled = true;
    pauseButton.events.onInputUp.add(function(){
      game.paused = true;
      pauseText.visible = true;
    });

    game.input.onDown.add(unpause, self);

    function unpause(event){
      if(game.paused){
        game.paused = false;
        pauseText.visible = false;
      }
    }

    /* Controls */
    this.cursors = game.input.keyboard.createCursorKeys();
    mKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    escKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    /* Setup Main Enemy Group */
    mainEnemies = game.add.group();
    mainEnemies.enableBody = true;
    //aliens.physicsBodyType = Phaser.Physics.ARCADE;


    /* Pause Text */
    pauseText = game.add.text(game.world.width*0.25, game.world.height*0.5, '                 Paused \n Click anywhere to continue', {font: '18px Arial'});
    pauseText.visible = false;

    /* Game physics */
    // game.physics.enable(blockers, Phaser.Physics.ARCADE);

    /* Lives Text */
    livesText = game.add.text(game.world.width-5, 5, 'Lives: ' + lives, { font: '18px Arial' });
    livesText.anchor.set(1, 0);

    /* Score Text */
    scoreText = game.add.text(game.world.width-5, 25, 'Score: ' + score, { font: '18px Arial' });
    scoreText.anchor.set(1, 0);  

    /* Life Lost Text */
    lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, click to continue', { font: '18px Arial' });
    lifeLostText.anchor.set(0.5);
    lifeLostText.visible = false;

    /* Game Over Text */
    gameOverText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Game over, click to continue', { font: '18px Arial', fill: '#0095DD' });
    gameOverText.anchor.set(0.5);
    gameOverText.visible = false;

    /* Start Text */ 
    startText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Click to start', { font: '18px Arial', fill: '#0095DD' });
    startText.anchor.set(0.5);
    startText.visible = true;
    game.input.onDown.addOnce(function(){
      startText.visible = false;
      startGame();
    }, this);

    levelText = game.add.text(75, 5, 'Level: ' + level, {font: '18px Arial'});
    levelText.anchor.set(1, 0);
    levelText.visible = true;

    nextLevelText = game.add.text(game.world.width*0.5, game.world.height*0.5, '       Next Level \n Click to Continue \n Press P to buy lazer (100 score)', {font: '19px Arial', fill: '#0095DD'});
    nextLevelText.anchor.set(0.5);
    nextLevelText.visible = false;

    /* Bullets */
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

  },

  update: function(){

    if(playing == false){
      if(lKey.justPressed() && score >= 1000){
        score -=1000;
        lives++;
        scoreText.setText('Score: ' + score);
        livesText.setText('Lives: ' + lives);
      }
    }

    if(playing){
      if(pKey.justPressed() || escKey.justPressed()){
        game.paused = true;
        pauseText.visible = true;
      }


      if(game.time.now > firingTimer - (level*100) && enemyBullets.countLiving() <= 5){
        enemyFires();
        redFires();
      }
      game.physics.arcade.overlap(bullets, mainEnemies, collisionHandler, null, this);

    }

    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

    var pointerTileX = Game.map.worldToTileX(worldPoint.x);
    var pointerTileY = Game.map.worldToTileY(worldPoint.y);
    Game.marker.x = Game.map.tileToWorldX(pointerTileX);
    Game.marker.y = Game.map.tileToWorldY(pointerTileY);
    Game.marker.setVisible(Game.checkCollision(pointerTileX,pointerTileY));

  }
};
