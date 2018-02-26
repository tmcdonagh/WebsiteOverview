var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');


var scaleRatio = window.devicePixelRatio / 3;
var player;
var playing = true;
var speed = 300;
var lives = 3;
var bullets;
var zombies;
var spawnCount = 15;
var cash = 0;
var livesText;
var firingTimer = 0;
var livingZombies = [];
var zombieSpeed = 1;
var spawnTimer = -10;
var firingTimer = -10;

function createZombies(){
    var zombie = zombies.create(-950, -950, 'zombie');
    zombie.anchor.setTo(0.5, 0.5);
    zombie.checkWorldBounds = true;
    console.log(zombie.x + "" + zombie.y);
    game.physics.arcade.moveToObject(zombie, player, 120);
}

function startGame(){
  playing = true;
}

/* Fire Bullet */
function fireBullet() {
  if(firingTimer < game.time.now){
    firingTimer = game.time.now + 500;
    bullet = bullets.getFirstExists(false);
    if(bullet){
      bullet.reset(player.x, player.y);
      //bullet.rotation = game.physics.arcade.angleToPointer(bullet) + 1.5;
      bullet.rotation = game.physics.arcade.moveToPointer(bullet, 1000, game.input.activePointer, 50);
      //bullet.body.velocity.x = 1000;
    }
  }
}

//gameOver

function checkZombies(){
  if(zombies.countLiving() < spawnCount){
    createZombies();
  }
}

function collisionHandler(bullet, zombie){
  bullet.kill();
  zombie.kill();
  cash += 10;
  checkZombies();

  //possibly add death animation
}
//zombie hits player collsion
//life lost

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');


