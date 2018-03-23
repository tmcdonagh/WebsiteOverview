var game = new Phaser.Game(480, 320, Phaser.AUTO, 'gameDiv');
//game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameDiv');

var blocksPerTetromino = 4;
var nbBlockTypes = 7;
var blockSize = 32;
var numBlocksY = 19;
var numBlocksX = 19;

var gameWidth = numBlocks*blockSize;
var menuWidth = 300;

var movementLag = 100;

var nbNext = 1;
var blockValue = 1;
var occupiedValue = 2;

var score = 0;
var scoreIncrement = 50;
var completedLines = 0;
var linesThreshold = 3;
var speedUp = 100;
var sscorePlus = 25;
var timeOut = Phaser.Timer.SECOND;

var queue = [];
var pauseState = false;
var gameOverState = false;

var offsets = {
  0 : [[0,-1],[0,0],[0,1],[1,1]], // L
  1 : [[0,-1],[0,0],[0,1],[-1,1]], // J
  2 : [[-1,0],[0,0],[1,0],[2,0]], // I
  3 : [[-1,-1],[0,-1],[0,0],[-1,0]], // O
  4 : [[-1,0],[0,0],[0,-1],[1,-1]], // S
  5 : [[-1,0],[0,0],[1,0],[0,1]], // T
  6 : [[-1,-1],[0,-1],[0,0],[1,0]] // Z
};

var y_start = {
  0 : 1,
  1 : 1,
  2 : 0,
  3 : 1,
  4 : 1,
  5 : 0,
  6 : 1
};

var move_offsets = {
  "left" : [-1,0],
  "down" : [0,1],
  "right" : [1,0]
};

var tetromino, cursors, rotates, pause, pauseText, scoreTitle, scoreText, linesText, scene, sceneSprites, timer, loop, shade;
var currentMovementTimer = 0;

function Tetromino(){
  this.shape = Math.floor(Math.random() * nbBlockTypes);
  this.color = Math.floor(Math.random() * nbBlockTypes);
  this.sprites = [];
  this.cells = [];
  this.center = [0,0];

  this.materialize = function(c_x,c_y,inGame) {
    this.center = [c_x,c_y];
    this.cells = [];

    for(var j = 0; j < this.sprites.length; j++){
      this.sprites[j].destroy();
    }
    this.sprites = [];
    var conflict = false;
    for(var i =0; i < blocksPerTetromino; i++) {
      var x = c_x + offsets[this.shape][i][0];
      var y = c_y + offsets[this.shape][i][1];
      var sprite = game.add.sprite(x * blockSize, y * blockSize, 'blocks', this.color);
      this.sprites.push(sprite);
      this.cells.push([x, y]);
      if(inGame) {
        if(!validateCoordinates(x,y)){
          conflict = true;
        }
        scene[x][y] = blockValue;
      }
    }
    return conflict;
  };
}


var scaleRatio = window.devicePixelRatio / 3;

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
//game.state.add('win', winState);

game.state.start('boot');
