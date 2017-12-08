var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload, create: create, update: update
  
});
var leftLine;
var rightLine;
var topLine;
var bottomLine;
var player;
var cursors;
var debug;
var upButton;
var downButton;
var leftButton;
var rightButton;

function preload(){
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';
  game.load.image('verticalLine', 'img/verticalLine.png');
  game.load.image('horizontalLine', 'img/horizontalLine.png');
  game.load.image('player', 'img/player.png');

}

function create(){
  upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
  downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
  leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
  rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

  game.physics.startSystem(Phaser.Physics.ARCADE);
 
  leftLine = game.add.sprite(game.world.width*0.2, game.world.height*0.125, 'verticalLine');
  rightLine = game.add.sprite(game.world.width*0.8, game.world.height*0.125, 'verticalLine');
  bottomLine = game.add.sprite(game.world.width*0.245, game.world.height*0.95, 'horizontalLine');
  topLine = game.add.sprite(game.world.width*0.245, game.world.width*0.05, 'horizontalLine');

  player = game.add.sprite(game.world.width*0.5, game.world.height*0.925, 'player');
  cursors = game.input.keyboard.createCursorKeys(); 
  game.physics.enable(player, Phaser.Physics.ARCADE); 

  debug = game.add.text(5, 5, '', { font:'18px Arial', fill: '#0095DD' });

}

function update(){
  if(upButton.isDown){
    player.x = 230;
    player.y = 17;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
  }
  if(downButton.isDown){
    player.x = 230;
    player.y = 296; 
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
  }
  if(leftButton.isDown){
    player.x = 90;
    player.y = 156;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
  }
  if(rightButton.isDown){
    player.x = 376;
    player.y = 156;
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
  }



  if(player.y > 290 || player.y < 25){ 
    if (cursors.left.isDown){
      player.body.velocity.x = -200;
    }
    else if (cursors.right.isDown){
      player.body.velocity.x = 200;
    }
    
    
  }
  if(player.x > 376){
    player.x = 376;
  }
  if(player.x == 376){
    if(cursors.up.isDown){
      player.body.velocity.y = -200;
    }
    else if(cursors.down.isDown){
      player.body.velocity.y = 200;
    }
    
  }
  if(player.x < 90){
    player.x = 90;
  }

  if(player.x == 90){
    if(cursors.up.isDown){
      player.body.velocity.y = -200;
    }
    else if(cursors.down.isDown){
      player.body.velocity.y = 200;
    }

  }
  if(player.y < 17){
    player.y = 17;
  }

  if(player.y == 17){
    if(cursors.left.isDown){
      player.body.velocity.x = -200;
    }
    else if(cursors.right.isDown){
      player.body.velocity.x = 200;
    }

  }
  if(player.y > 296){
    player.y = 296;
  }

  if(player.y == 296){
    if(cursors.left.isDown){
      player.body.velocity.x = -200;
    }
    else if(cursors.right.isDown){
      player.body.velocity.x = 200;
    }
    

    

  }
  if(cursors.left.isDown == false && cursors.right.isDown == false){
    player.body.velocity.x = 0;
  }
  if(cursors.up.isDown == false && cursors.down.isDown == false){
    player.body.velocity.y = 0;
  }

  
  debug.setText('(' + game.input.x + ', ' + game.input.y + ')');   

}
