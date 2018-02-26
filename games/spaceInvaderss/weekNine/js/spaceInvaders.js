var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
  
});

var player;
var playing = false;
var speed = 4;
var alienSpeed = 10;
var lives = 3;
var bullets;
var lazers;
var aliens;
var redAliens;
var bosses;
var created = false;
var move = true;
var moveCounter = 0;
var score = 0;
var livesText;
var level = 1;
var levelText;
var nextLevelText;
var enemyBullet;
var firingTimer = 0;
var livingEnemies = [];
var livingReds = [];
var alienMoveSpeed = 1;
var score = 0;
var keyIsUp = true;
var lazersLeft = 0;
var moveFrom = 0;


function preload() {
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
}


function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  this.cursors = game.input.keyboard.createCursorKeys();
  pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);  

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
  //bossBullets.setAll('outOfBoundsKill', true);

}

function update() {
  //game.physics.arcade.collide(ball2, paddle);
  if(playing == false){
    if(pKey.justPressed() && score >= 100){
      lazersLeft++;
      lazerIconText.setText(' = ' + lazersLeft);
      score -= 100;
      scoreText.setText('Score: ' + score);
    }
    
  }
  if(playing){
    if(this.cursors.left.isDown && player.x > 0){
      player.x -= speed;
    }
    if(this.cursors.right.isDown && player.x < game.width){
      player.x += speed;
    }
    if(this.cursors.up.isDown){
      fireBullet();
    }
    if(this.cursors.down.isDown  && keyIsUp == true && lazersLeft > 0){
      fireLazer();
      keyIsUp = false;
    }
    if(!(this.cursors.down.isDown) && keyIsUp == false){
      keyIsUp = true;
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
function createAliens(){
  if(level % 4 != 0){
    for(var y = moveFrom; y < 4; y++){
      for(var x = 0; x < 10; x++){
        var alien = aliens.create(x * 30, y * 20, 'spaceInvaderGreen');
        alien.anchor.setTo(0.5, 0.5);
        alien.checkWorldBounds = true;
      }
    }
    aliens.x = 10;
    aliens.y = 50;
    var tween = game.add.tween(aliens).to( {x: 200}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  }
}
function createRedAliens(){
  if(moveFrom > 0 && level % 4 != 0){
    for(var y = 0; y < moveFrom; y++){
      for(var x = 0; x < 10; x++){
        var redAlien = redAliens.create(x*30, y*20, 'spaceInvaderRed');
        redAlien.anchor.set(0.5, 0.5);
        redAlien.checkWorldBounds = true;
        redAlien.outOfBoundsKill = true;
      }
    }
  } 
  redAliens.x = 10;
  redAliens.y = 50;
  var redTween = game.add.tween(redAliens).to({x: 200}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
}
function createBoss(){
  if(level % 4 == 0){
    var boss = bosses.create(game.world.width*0.5, 50, 'boss');
    boss.anchor.set(0.5, 0.5);
    boss.checkWorldBounds = true;
    boss.body.velocity.set(100, 0);   
    boss.body.bounce.set(1);
    boss.body.collideWorldBounds = true;
  }
}
function descend(){
  aliens.y += 10;
}
function startGame(){
  playing = true;
  createAliens();
  createRedAliens();
}
function fireBullet() {
  if(bullets.countLiving() == 0){
    bullet = bullets.getFirstExists(false);
    if(bullet){
      bullet.reset(player.x, player.y - 20);
      bullet.body.velocity.y = -400;
      //bulletTime = game.time.now + 200;
    }
  }
}
function fireLazer(){
  if(lazers.countLiving() == 0){
    lazer = lazers.getFirstExists(false);
    if(lazer){
      lazer.reset(player.x, player.y -400);
      lazer.body.velocity.y = -4000;
    }
    lazersLeft--;
    lazerIconText.setText('  = ' + lazersLeft);
  }
}
function gameOver(){
  playing = false;
  gameOverText.visible = true;
  game.input.onDown.addOnce(function(){
    location.reload(); 
  }, this);
}
function checkAliens(){
  if(aliens.countLiving() == 0 && redAliens.countLiving() == 0 && bosses.countLiving() == 0){
    playing = false;
    level++;
    if(level > 2){
      moveFrom = 1;
    }
    if(level == 2){
      cautionScreen.visible = true;
    }
    else if(level == 3){
      newEnemyScreen.visible = true;
    }
    else{
      nextLevelText.visible = true;
    }
    game.input.onDown.addOnce(function(){
      cautionScreen.visible = false;
      newEnemyScreen.visible = false;
      nextLevelText.visible = false;
      shopScreen.visible = true;
      game.input.onDown.addOnce(function(){
        shopScreen.visible = false;
        createAliens();
        createRedAliens();
        createBoss();
        levelText.setText('Level: ' + level);
        playing = true;
      }, this);
    });
  }

}
function collisionHandler(bullet, alien) {
  bullet.kill();
  alien.kill();
  score += 10;
  scoreText.setText(' Score: ' + score);
  nextLevelText.setText('Level: ' + level + '\n Click to continue');
  checkAliens();
}
function lazerHitsAlien(lazer, alien){
  alien.kill();
  score += 10;
  scoreText.setText(' Score: ' + score);
  checkAliens();
}
function enemyFires() {
  enemyBullet = enemyBullets.getFirstExists(false);
  livingEnemies.length = 0;
  aliens.forEachAlive(function(alien){
    livingEnemies.push(alien);
  });
  if(enemyBullet && livingEnemies.length > 0){
    var random = game.rnd.integerInRange(0, livingEnemies.length-1);
    var shooter = livingEnemies[random];
    enemyBullet.reset(shooter.body.x, shooter.body.y);
    game.physics.arcade.moveToObject(enemyBullet, player, 120);
    firingTimer = game.time.now + 2000;
  }
}
function redFires(){
  enemyBullet = enemyBullets.getFirstExists(false);
  livingReds.length = 0;
  redAliens.forEachAlive(function(redAlien){
    livingReds.push(redAlien);
  });
  if(enemyBullet && livingReds.length > 0){
    var random = game.rnd.integerInRange(0, livingReds.length-1);
    var shooter = livingReds[random];
    //enemyBullet.reset(shooter.body.x, shooter.body.y);
    //game.physics.arcade.moveToObject(enemyBullet, player, 120);
    game.physics.arcade.moveToObject(shooter, player, 120);
    firingTimer = game.time.now + 2000;
  }
}
function bossFire(){
  bossBullet = bossBullets.getFirstExists(false);
  living
}
function enemyHitsPlayer (player, enemyBullet) {
  enemyBullet.kill();
  lives--;
  livesText.setText('Lives: ' + lives);
  if(lives < 1){
    gameOver();
  }
  else{
    lifeLost();
  }
}
function lifeLost(){
  playing = false;
  player.visible = false;
  lifeLostText.visible = true;
  enemyBullets.forEachAlive(function(enemyBullet){
    enemyBullet.kill();
  });
  game.input.onDown.addOnce(function(){
    playing = true;
    firingTimer = game.time.now + 2000;
    lifeLostText.visible = false;
    player.visible = true
  }, this); 
}
