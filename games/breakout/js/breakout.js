var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
  
});

var ball;
var paddle;
var ball2;

var level = 1;
speedMult = 1.0;
var bricks;
var newBrick;
var brickInfo;

var redBricks;

var blocker;

var scoreText;
var score = 0;

var lives = 3;
var livesText;
var lifeLostText;
var gameOverText;
var startText;
var winText;
var levelEnd = false;
var playing = false;
var startButton;



function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';
  game.load.image('ball', 'img/ball.png');
  game.load.image('paddle', 'img/paddle.png');
  game.load.image('brick', 'img/brick.png');
  game.load.spritesheet('button', 'img/button.png', 120, 40);
  game.load.image('redBrick', 'img/redBrick.png');
}


function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
 
 
  /* Gets ball ready */
  ball = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
  ball2 = game.add.sprite(game.world.width*0.5, game.world.height-25, 'ball');
  ball.anchor.set(0.5);

  /* Gets the second ball ready */
  ball2.anchor.set(0.5);
  ball2.visible = false;

  /* Game physics */
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  game.physics.enable(ball2, Phaser.Physics.ARCADE);
  if(playing) {
    ball.body.velocity.set(150, -150);

  }
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball2.body.collideWorldBounds = true;
  ball2.body.bounce.set(1);

  /* Gets paddle ready */
  paddle = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
  paddle.anchor.set(0.5,1);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.body.immovable = true;
  
  /* Gets the blocker ready */
  blocker = game.add.sprite(game.world.width*0.5, game.world.height-5, 'paddle');
  blocker.anchor.set(0, 15);
  game.physics.enable(blocker, Phaser.Physics.ARCADE);
  blocker.body.immovable = true;
  blocker.body.velocity.x=100;

  /* Gets physics ready */  
  game.physics.arcade.checkCollision.down = false;
  ball.checkWorldBounds = true;
  ball2.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(ballLeaveScreen, this);
  ball2.events.onOutOfBounds.add(ballLeaveScreen, this);
  
  /* Spawns bricks */
  initBricks();
  
  game.physics.enable(blocker, Phaser.Physics.ARCADE);
  blocker.body.collideWorldBounds = true;
  blocker.body.bounce.set(1);
  scoreText = game.add.text(5, 5, 'Points: 0', { font:'18px Arial', fill: '#0095DD' });

  /* Lives Text */
  livesText = game.add.text(game.world.width-5, 5, 'Lives: ' + lives, { font: '18px Arial', fill: '#0095DD' });
  livesText.anchor.set(1, 0);

  /* Life Lost Text */
  lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, click to continue', { font: '18px Arial', fill: '#0095DD' });
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
 
  /* Win Text */
  winText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'You Win! \n click to play again', {font: '18px Arial', fill: '#0095DD' });
  winText.anchor.set(0.5);
  winText.visible = false;
 
}

function update() {
  game.physics.arcade.collide(ball, paddle);
  game.physics.arcade.collide(ball, blocker);
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  game.physics.arcade.collide(ball2, paddle);
  game.physics.arcade.collide(ball2, blocker);
  game.physics.arcade.collide(ball2, bricks, ballHitBrick);
  if(levelEnd == false){
    paddle.x = game.input.x || game.world.width*0.5;
  }
  if(playing == false){
    ball.x = game.input.x || game.world.width*0.5;
  }
}

function initBricks() {
  brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 7,
      col: 3,
    },
    offset: {
      top: 50,
      left: 60
    },
    padding: 10
  };
  bricks = game.add.group();
  for(c=0; c<brickInfo.count.col; c++) {
        for(r=0; r<brickInfo.count.row; r++) {
            var brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
            var brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
            if(c >= 1){
              newBrick = game.add.sprite(brickX, brickY, 'brick');
            }
            else{
              newBrick = game.add.sprite(brickX, brickY, 'redBrick');
              
            }
            game.physics.enable(newBrick, Phaser.Physics.ARCADE);
            newBrick.body.immovable = true;
            newBrick.anchor.set(0.5);
            bricks.add(newBrick);
        }
    }
}



function ballHitBrick(ball, brick) {
  if(brick.y < 60){
    score += 100;
    ball2.body.velocity.x = 150;
    ball2.body.velocity.y = -150;
    ball2.visible = true;
  }
  else{
    game.state.start('level2');
    score += 10;
  }
  brick.kill()
  scoreText.setText('Points: ' + score);

  var count_alive = 0;
  for(i = 0; i < bricks.children.length; i++) {
    if(bricks.children[i].alive == true) { 
      count_alive++;
    }
  }
  if(count_alive == 0){
    winText.visible = true;
    ball.reset(game.world.width*0.5, game.world.height-25);
    ball2.reset(game.world.width*0.5, game.world.height-25);
    ball2.visible = false;
    paddle.reset(game.world.width*0.5, game.world.height-5);
    playing = false;
    
    game.input.onDown.addOnce(function(){
      winText.visible = false;
      location.reload();
    }, this);

  }

}
function ballLeaveScreen() {
  lives--;

  if(lives) {
    playing = false;
    livesText.setText('Lives: ' + lives);
    lifeLostText.visible = true;
    ball.reset(game.world.width*0.5, game.world.height-25);
    ball2.reset(game.world.width*0.5, game.world.height-25);
    ball2.visible = false;
    paddle.reset(game.world.width*0.5, game.world.height-5);
    game.input.onDown.addOnce(function(){
      lifeLostText.visible = false;
      ball.body.velocity.set(150, -150);
      playing = true;
    }, this);
  }
  else {
    gameOverText.visible = true;
    livesText.setText('Lives: ' + lives);
    ball.reset(game.world.width*0.5, game.world.height-25);
    ball2.reset(game.world.width*0.5, game.world.height-25);
    paddle.reset(game.world.width*0.5, game.world.height-5);
    levelEnd = true;
    playing = false; 
    game.input.onDown.addOnce(function(){
      location.reload(); 
      
    }, this);

  }
}

function startGame(){
  ball.body.velocity.set(150, -150);
  playing = true;
}

function speedUp(){
  speedMult += 1.0;
  ball.body.velocity.x *= speedMult;
  ball.body.velocity.y *= speedMult;
}
