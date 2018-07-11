var game = new Phaser.Game(480, 320, Phaser.AUTO, 'gameDiv');
//game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');


var scaleRatio = window.devicePixelRatio / 3;
var playing = false;
var speed = 4;
var alienSpeed = 10;
var lives = 3;
var bullets;
var score = 0;
var livesText;
var level = 1;
var levelText;
var nextLevelText;
var firingTimer = 0;
var livingEnemies = [];
var keyIsUp = true;

function startGame(){
  playing = true;
  createAliens();
}

function gameOver(){
  playing = false;
  gameOverText.visible = true;
  game.input.onDown.addOnce(function(){
    location.reload(); 
  }, this);
}
function collisionHandler(bullet, enemy) {
  bullet.kill();
  enemy.kill();
  score += 10;
  scoreText.setText(' Score: ' + score);
  nextLevelText.setText('Level: ' + level + '\n Click to continue');
  //checkEnemies();
}



game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('play', playState);

game.state.start('boot');
