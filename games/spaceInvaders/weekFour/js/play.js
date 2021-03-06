var playState = {
  create:function(){
  game.physics.startSystem(Phaser.Physics.ARCADE);


  /* Controls */
  this.cursors = game.input.keyboard.createCursorKeys();
  pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);  
  wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
  aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
  sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
  dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

  /* Setup Aliens Group */
  aliens = game.add.group();
  aliens.enableBody = true;
  aliens.physicsBodyType = Phaser.Physics.ARCADE;
 
  /* Setup Red Aliens Group */
  redAliens = game.add.group();
  redAliens.enableBody = true;
  redAliens.physicsBodyType = Phaser.Physics.ARCADE; 

  /* Setup Boss Group */
  bosses = game.add.group();
  bosses.enableBody = true;
  bosses.physicsBodyType = Phaser.Physics.ARCADE;

  /* Gets player ready */
  player = game.add.sprite(game.world.width*0.5, game.world.height-25, 'player');
  player.anchor.set(0.5);


  /* Caution Enemies Move Down Screen */
  cautionScreen = game.add.sprite(0, 0, 'cautionEnemies');
  cautionScreen.visible = false;

  /* New Enemies Screen */
  newEnemyScreen = game.add.sprite(0, 0, 'newEnemy');
  newEnemyScreen.visible = false;
  
  /* Shop Screen */
  shopScreen = game.add.sprite(0, 0, 'shop');
  shopScreen.visible = false;

  /* Icons */
  lazerIcon = game.add.sprite(20, 35, 'lazerIcon');
  lazerIcon.anchor.set(0.5);
  lazerIconText = game.add.text(60, 25, ' = ' + lazersLeft, { font: '18px Arial' });
  lazerIconText.anchor.set(1, 0);

  /* Next Level Text */
  nextLevelText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Level: ' + level, {font: '18px Arial' });
  nextLevelText.visible = false;
  
  /* Game physics */
  game.physics.enable(player, Phaser.Physics.ARCADE);
  game.physics.enable(aliens, Phaser.Physics.ARCADE);
  game.physics.enable(redAliens, Phaser.Physics.ARCADE);
  game.physics.enable(bosses, Phaser.Physics.ARCADE);
  
  
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

  lazers = game.add.group();
  lazers.enableBody = true;
  lazers.physicsBodyType = Phaser.Physics.ARCADE;
  lazers.createMultiple(30, 'lazerBeam');
  lazers.setAll('anchor.x', 0.5);
  lazers.setAll('outOfBoundsKill', true);
  lazers.setAll('checkWorldBounds', true);

  enemyBullets = game.add.group();
  enemyBullets.enableBody = true;
  enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
  enemyBullets.createMultiple(30, 'bullet');
  enemyBullets.setAll('anchor.x', 0.5);
  enemyBullets.setAll('anchor.y', 1);
  enemyBullets.setAll('outOfBoundsKill', true);
  enemyBullets.setAll('checkWorldBounds', true);

  bossBullets = game.add.group();
  bossBullets.enableBody = true;
  bossBullets.physicsBodyType = Phaser.Physics.ARCADE;
  bossBullets.createMultiple(30, 'spaceInvaderRed');
  bossBullets.setAll('anchor.x', 0.5);
  bossBullets.setAll('anchor.y', 1);
  bossBullets.setAll('checkWorldBounds', true);
  bossBullets.setAll('outOfBoundsKill', true);
  
  },

  update: function(){
  if(playing == false){
    if(pKey.justPressed() && score >= 100){
      lazersLeft++;
      lazerIconText.setText(' = ' + lazersLeft);
      score -= 100;
      scoreText.setText('Score: ' + score);
    }
    
  }
  if(playing){
    if((this.cursors.left.isDown || aKey.isDown) && player.x > 0){
      player.x -= speed;
    }
    if((this.cursors.right.isDown || dKey.isDown) && player.x < game.width){
      player.x += speed;
    }
    if(this.cursors.up.isDown || wKey.isDown){
      fireBullet();
    }
    if((this.cursors.down.justPressed() || sKey.justPressed()) && lazersLeft > 0){
      fireLazer();
    }
    if(pKey.justPressed()){
      aliens.forEachAlive(function(alien){
        alien.kill();
      });
      redAliens.forEachAlive(function(redAlien){
        redAlien.kill();
      });
      enemyBullets.forEachAlive(function(enemyBullet){
        enemyBullet.kill();
      });
      checkAliens();
    }
    
    if(game.time.now > firingTimer - (level*100)){
      enemyFires();
      redFires();
      bossFire();
    }
    if((aliens.x >= 200 || aliens.x <= 10) && level > 1){
      descend();
    }
    if(level > 2){
      moveFrom = 1;
    }
    //console.log(firingTimer); 
    game.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);
    game.physics.arcade.overlap(bullets, redAliens, collisionHandler, null, this);
    game.physics.arcade.overlap(lazers, aliens, lazerHitsAlien, null, this);
    game.physics.arcade.overlap(lazers, redAliens, lazerHitsAlien, null, this);
    game.physics.arcade.overlap(aliens, player, gameOver, null, this);
    game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
    game.physics.arcade.overlap(redAliens, player, enemyHitsPlayer, null, this);
  
  }

}
};
