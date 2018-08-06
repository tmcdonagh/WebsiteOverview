// Things to add:
// X -Enemy Health Bar
// X -Turret Cooldown Meter
// X -Lazer Beam Turret
//   -Blockades
//   -Better right menu (With square for help text)
// / -New Sprite for enemies and turrets
// / -New enemies (Partially Done)
//   -Figure out how to center the game on screen
//   -Start Menu
//   -Pause Button
// X -Levels
// X -Level Text
// X -Enemies spawn is messed up where they can pile up when framerate is low or when tab is changed





var config = {
  type: Phaser.AUTO,
  width: 30*32,
  height: 21*32,
  physics: {
    default: 'arcade',
             arcade: {
             }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var game = new Phaser.Game(config);
//this.stage.disableVisibilityChange = true;
var outside = this;


var livingArrowTurrets = [];
var spawnTimer = 0;
var firingTimer = 0;
var enemiesLeft = 10;
var lives = 10;
var cash = 100;
var arrowFollow = false;
var sellFollow = false;
var wave = 1;
var addedEnemies = 0;
var lazerFollow = false;

function preload(){
  game = this;
  this.load.image('tileset', 'assets/gridtiles.png');
  this.load.tilemapTiledJSON('map', 'assets/map.json');
  this.load.image('mainEnemy', 'assets/phaserguy.png');
  this.load.image('blueEnemy', 'assets/blueAlien.png');
  this.load.image('redEnemy', 'assets/redAlien.png');
  this.load.image('greenEnemy', 'assets/greenAlien.png');
  this.load.image('bullet', 'assets/bullet.png');
  this.load.image('shop', 'assets/tdShop.png');
  this.load.image('arrowTurret', 'assets/arrow.png');
  this.load.image('endPoint', 'assets/endPoint.png');
  this.load.image('dock', 'assets/dock.png');
  this.load.image('sellDock', 'assets/sellDock.png');
  this.load.image('sellIcon', 'assets/sellIcon.png');
  this.load.image('detectionCircle', 'assets/detectionCircle.png');
  this.load.image('mainDetectionCircle', 'assets/mainDetectionCircle.png');
  this.load.image('redDetectionCircle', 'assets/redDetectionCircle.png');
  this.load.image('greenDetectionCircle', 'assets/greenDetectionCircle.png');
  this.load.image('arrowHelp', 'assets/arrowHelp.png');
  this.load.spritesheet('enemy', 'assets/alienSpritesheet.png', {frameWidth: 34, frameHeight: 28 });
  this.load.spritesheet('arrow', 'assets/arrowCharge.png', {frameWidth: 34, frameHeight: 34});
  this.load.spritesheet('lazerTurret', 'assets/lazerCharge.png', {frameWidth: 34, frameHeight: 34});
  this.load.image('lazer', 'assets/lazer.png');
  this.load.image('lazerTurretButton', 'assets/lazerTurretButton.png');
  this.load.image('startScreen', 'assets/startScreen.png');
}

var arrowCost = 50;
var lazerCost = 100;

function create(){

  create = this; 

  game.paused = true;


  //Animations
  this.anims.create({
    key: 'red',
    frames: this.anims.generateFrameNumbers('enemy', { start: 2, end: 2 })
  });
  this.anims.create({
    key: 'green',
    frames: this.anims.generateFrameNumbers('enemy', { start: 1, end: 1 })
  });
  this.anims.create({
    key: 'blue',
    frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 0 })
  });
  this.anims.create({
    key: 'yellow',
    frames: this.anims.generateFrameNumbers('enemy', { start: 3, end: 3 }),
  });

  this.anims.create({
    key: 'arrowCharge',
    frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 4 }),
    frameRate: 1,
  });

  this.anims.create({
    key: 'lazerCharge',
    frames: this.anims.generateFrameNumbers('lazerTurret', {start: 0, end: 11}),
    frameRate: 1,
  });
  this.anims.create({
    key: 'lazerInitial',
    frames: this.anims.generateFrameNumbers('lazerTurret', {start: 11, end: 11}),
    frameRate: 1,
  });

  // Makes map
  map = game.add.tilemap('map');
  //var tiles = map.addTilesetImage('tiles', 'tileset');
  tiles = map.addTilesetImage('tiles', 'tileset');
  map.createStaticLayer(0, tiles, 0,0);

  // Marker that will follow the mouse
  marker = this.add.graphics();
  marker.lineStyle(3, 0xffffff, 1);
  marker.strokeRect(0, 0, map.tileWidth, map.tileHeight);

  // ### Pathfinding stuff ###
  // Initializing the pathfinder
  finder = new EasyStar.js();

  // We create the 2D array representing all the tiles of our map
  var grid = [];
  for(var y = 0; y < map.height; y++){
    var col = [];
    for(var x = 0; x < map.width; x++){
      // In each cell we store the ID of the tile, which corresponds
      // to its index in the tileset of the map ("ID" field in Tiled)
      col.push(getTileID(x,y));
    }
    grid.push(col);
  }
  finder.setGrid(grid);

  var tileset = map.tilesets[0];
  var properties = tileset.tileProperties;
  var acceptableTiles = [];

  // We need to list all the tile IDs that can be walked on. Let's iterate over all of them
  // and see what properties have been entered in Tiled.
  for(var i = tileset.firstgid-1; i < tiles.total; i++){ // firstgid and total are fields from Tiled that indicate the range of IDs that the tiles can take in that tileset
    if(!properties.hasOwnProperty(i)) {
      // If there is no property indicated at all, it means it's a walkable tile
      acceptableTiles.push(i+1);
      continue;
    }
    if(!properties[i].collide) acceptableTiles.push(i+1);
    if(properties[i].cost) finder.setTileCost(i+1, properties[i].cost); // If there is a cost attached to the tile, let's register it
  }
  finder.setAcceptableTiles(acceptableTiles);
  marker.setVisible(false);
  // Handles the clicks on the map to make the character move
  // Runs Game.handleClick when mouse is clicked
  this.input.on('pointerup', handleClick);

  shopScreen = this.add.image(672, 335, 'shop');
  shopScreen.setOrigin(0, 0.5);

  waveText = game.add.text(26.5*32, 0.75*32, 'Wave ' + wave, {font: '18px Arial'});
  cashText = game.add.text(25*32, 1.5*32, '$' + cash, {font: '18px Arial'});
  livesText = game.add.text(25.25*32, 3.75*32, lives, {font: '18px Arial'});
  arrowCostText = game.add.text(22.5*32, 8.8*32, '$' + arrowCost, {font: '18px Arial'});
  lazerCostText = game.add.text(22.3*32, 11.3*32, '$' + lazerCost, {font: '18px Arial'});

  arrowDock = this.add.image(23*32, 8*32, 'dock');
  arrowTurretButton = this.add.image(23*32, 8*32, 'arrowTurret');
  arrowTurretButton.setDepth(1);
  arrowTurretButton.inputEnabled = true;

  sellDock = this.add.image(23*32, 6*32, 'sellDock');
  sellIcon = this.add.image(23*32, 6*32, 'sellIcon');
  sellIcon.setDepth(1);
  sellIcon.inputEnabled = true;

  lazerDock = this.add.image(23*32, 10.5*32, 'dock');
  lazerDock.setDepth(0);
  lazerTurretButton = this.add.image(23*32, 10.5*32, 'lazerTurretButton');
  lazerTurretButton.inputEnabled = true;

  arrowTurrets = this.physics.add.group();
  arrowTurrets.enableBody = true;
  arrowTurrets.physicsBodyType = Phaser.Physics.ARCADE;

  lazerTurrets = this.physics.add.group();
  lazerTurrets.enableBody = true;
  lazerTurrets.physicsBodyType = Phaser.Physics.ARCADE;

  mainEnemies = this.physics.add.group();
  mainEnemies.enableBody = true;
  mainEnemies.physicsBodyType = Phaser.Physics.ARCADE;
  mainEnemies.createMultiple(2500, 'mainEnemies');

  bullets = this.physics.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');

  lazers = this.physics.add.group();
  lazers.enableBody = true;
  lazers.physicsBodyType = Phaser.Physics.ARCADE;
  lazers.createMultiple(30, 'lazer');

  endPoints = this.physics.add.group();
  endPoints.enableBody = true;
  endPoints.physicsBodyType = Phaser.Physics.ARCADE;
  endPoints.createMultiple(2, 'endPoint');
  spawnEndPoints(660, 600);

  detectionCircles = this.physics.add.group();
  detectionCircles.enableBody = true;
  detectionCircles.physicsBodyType = Phaser.Physics.ARCADE;

  this.input.on('gameobjectdown', function (pointer, gameObject) {

    //gameObject.destroy();
    //detectionCircle.visible = false;

  });

  mainDetectionCircle = this.add.image(5000, 5000, 'mainDetectionCircle');
  mainDetectionCircle.visible = false;

  redDetectionCircle = this.add.image(5000, 5000, 'redDetectionCircle');
  redDetectionCircle.visible = false;

  greenDetectionCircle = this.add.image(5000, 5000, 'greenDetectionCircle');
  greenDetectionCircle.visible = false;

  arrowHelp = this.add.image(815, 575, 'arrowHelp');

  this.input.on('gameobjectover', function(pointer, gameObject){
    if(!arrowFollow && pointer.x <= 672){
      mainDetectionCircle.visible = true;
      mainDetectionCircle.x = gameObject.x;
      mainDetectionCircle.y = gameObject.y;
    }
  });
  this.input.on('gameobjectout', function(pointer, gameObject){
    mainDetectionCircle.visible = false;
  });

  this.physics.add.collider(bullets, mainEnemies, bulletCollision, null, this);
  this.physics.add.overlap(lazers, mainEnemies, lazerCollision, null, this);
  this.physics.add.collider(endPoints, mainEnemies, endPointCollision, null, this);

  startScreen = this.add.image(10.5*32, 12*32, 'startScreen');
  startScreen.visible = true;


}
/* ***** End of Create function ***** */

function update(){

  var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
  pointerX = this.input.activePointer.x;
  pointerY = this.input.activePointer.y;


  if(game.paused == false){
    if(pointerX <= 762 && pointerX >= 713 && pointerY >= 233 && pointerY <= 283){
      arrowHelp.visible = true;
    }
    else if(pointerX <= 762 && pointerX >= 713 && pointerY >= 168 && pointerY <= 220){
      //sellHelp.visible = true;
    }
    else {
      arrowHelp.visible = false;
    }

    //Rounds down to nearest tile
    var pointerTileX = map.worldToTileX(worldPoint.x);
    var pointerTileY = map.worldToTileY(worldPoint.y);
    marker.x = map.tileToWorldX(pointerTileX);
    marker.y = map.tileToWorldY(pointerTileY);
    if(pointerTileX < 21){
      marker.setVisible(true);
    }
    else {
      marker.setVisible(false);
    }

    if(arrowFollow || lazerFollow){
      if(arrowFollow){
        arrowTurretButton.x = this.input.activePointer.x;
        arrowTurretButton.y = this.input.activePointer.y;

        lazerTurretButton.x = 23*32;
        lazerTurretButton.y = 10.5*32;
      }
      else if(lazerFollow){
        lazerTurretButton.x = this.input.activePointer.x;
        lazerTurretButton.y = this.input.activePointer.y;

        arrowTurretButton.x = 23*32;
        arrowTurretButton.y = 8*32;
      }

      sellIcon.x = 23*32;
      sellIcon.y = 6*32;


      turretTileX = Math.floor(this.input.activePointer.x/32);
      turretTileY = Math.floor(this.input.activePointer.y/32);

      if(getTileID(turretTileX, turretTileY) == 15 && cash >= arrowCost && tileChecker(turretTileX, turretTileY) == true){
        greenDetectionCircle.x = this.input.activePointer.x;
        greenDetectionCircle.y = this.input.activePointer.y;
        greenDetectionCircle.visible = true;
        redDetectionCircle.visible = false;
      }
      else{
        redDetectionCircle.x = this.input.activePointer.x;
        redDetectionCircle.y = this.input.activePointer.y;
        redDetectionCircle.visible = true;
        greenDetectionCircle.visible = false;

      }
      //console.log(getTileID(1,1));
    }
    else if(sellFollow){
      sellIcon.x = this.input.activePointer.x + 20;
      sellIcon.y = this.input.activePointer.y + 20;
      arrowTurretButton.x = 23*32;
      arrowTurretButton.y = 8*32;
      arrowFollow = false;
      redDetectionCircle.visible = false;
    }


    if(this.time.now > spawnTimer && enemiesLeft > 0){
      var canSpawn = true;
      outside.mainEnemies.children.each(function(mainEnemy){
        if(Math.floor(mainEnemy.x/32) <= 1 && Math.floor(mainEnemy.y/32) <= 2){
          canSpawn = false;
        }
      }, this);
      if(canSpawn){
        spawnEnemy(1);
        enemiesLeft--;
        spawnTimer = this.time.now + 2000;
      }
    }
    if(this.time.now > spawnTimer && enemiesLeft <= 0){

      if(checkIfAllDead == true){
        changeLevel();
      }
    }

    arrowFire();
    lazerFire();
    //create = this;

  }

}

/* ***** End of Update Function ***** */

function checkCollision(x,y){
  if(!map.getTileAt(x, y) == null){
    var tile = map.getTileAt(x, y);
    return tile.properties.collide == true;
  }
  else{
    var tile = map.getTileAt(1,1);
    return tile.properties.collide == true;
  }
};

function getTileID(x,y){
  var tile = map.getTileAt(x, y);
  if(tile){
    return tile.index;
  }
};

function getEnemy(x, y, distance){
  var enemyUnits = mainEnemies.getChildren();
  for(var i = 0; i < enemyUnits.length; i++){
    if(enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance){
      return enemyUnits[i];
    }
  }
  return false;

}

function handleClick(pointer){

  if(game.paused == true){
    if(pointerX >= 231 && pointerX <= 441 && pointerY >= 345 && pointerY <= 381){
      game.paused = false;
      startScreen.visible = false;
    }
    else if(pointerX >= 231 && pointerX <= 441 && pointerY >= 389 && pointerY <= 425){
      console.log('Tutorial Not Implemented yet');
    }
  }

  var tile = map.getTileAt(Math.floor(pointer.x/32), Math.floor(pointer.y/32));
  //console.log(tile.index);
  //finder.setTileCost(44, 500);
  //console.log(pointer.x + " " + pointer.y);
  //finder.setTileCost(Math.floor(pointer.x/32), Math.floor(pointer.y/32), 15);

  //console.log(tile.x + " " + tile.y);
  /*
     var grid = [];
     for(var y = 0; y < map.height; y++){
     var col = [];
     for(var x = 0; x < map.width; x++){
     if(tile.x == x && tile.y == y){
     col.push(4);
     }
     else{
     col.push(getTileID(x,y));
     }

     }
     grid.push(col);
     }
     finder.setGrid(grid);
     */

  if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 233 && pointer.y <= 283 && arrowFollow == false){
    arrowFollow = true;
    sellFollow = false;
    lazerFollow = false;
  }
  else if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 168 && pointer.y <= 220 && sellFollow == false){
    sellFollow = true;
    arrowFollow = false;
    lazerFollow = false;

  }
  else if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 312 && pointer.y <= 362 && lazerFollow == false){
    sellFollow = false;
    arrowFollow = false;
    lazerFollow = true;
  }
  else if(pointer.x >= 672){
    arrowFollow = false;
    arrowTurretButton.x = 23*32;
    arrowTurretButton.y = 8*32;
    redDetectionCircle.visible = false;
    greenDetectionCircle.visible = false;

    sellFollow = false;
    sellIcon.x = 23*32;
    sellIcon.y = 6*32;

    lazerFollow = false;
    lazerTurretButton.x = 23*32;
    lazerTurretButton.y = 10.5*32;
  }
  else if(arrowFollow){
    placeArrow(pointer.x, pointer.y);
  }
  else if(sellFollow){
    sellTurret(Math.floor(pointer.x/32), Math.floor(pointer.y/32));
  }
  else if(lazerFollow){
    placeLazer(pointer.x, pointer.y);
  }
};

function checkIfAllDead(){
  if(enemiesLeft == 0){
    var count = 0;
    this.mainEnemies.children.each(function(mainEnemy){
      if(mainEnemy.isAlive){
        count++;
      }
    }, this);
    if(count != 0){
      return false;
    }
    else {
      return true;
    }
  }
}

function placeArrow(x, y){
  var canPlace = true;
  xTile = Math.floor(x/32);
  yTile = Math.floor(y/32);
  if(cash >= arrowCost){ 	
    var canPlace = true;
    this.arrowTurrets.children.each(function(arrowTurret){
      if(Math.floor(arrowTurret.x/32) == xTile && Math.floor(arrowTurret.y/32) == yTile && arrowTurret.isAlive == true){

        canPlace = false;
      }

    }, this);
    //console.log(getTileID(xTile, yTile));
    if(getTileID(xTile, yTile) == 15 && canPlace == true){

      var arrowTurret = arrowTurrets.create(xTile*32 + 15, yTile*32 + 15, 'arrowTurret').setInteractive();
      arrowTurret.isAlive = true;
      arrowTurret.firingTimer = 0;
      var detectionCircle = detectionCircles.create(xTile*32 + 15, yTile*32 +15, 'detectionCircle').setInteractive();
      detectionCircle.visible = false;
      cash -= arrowCost;
      cashText.setText('$' + cash);
    }
  }
};

function placeLazer(x, y){

  var canPlace = true;
  xTile = Math.floor(x/32);
  yTile = Math.floor(y/32);
  if(cash >= arrowCost){   
    var canPlace = true;
    this.arrowTurrets.children.each(function(arrowTurret){
      if(Math.floor(arrowTurret.x/32) == xTile && Math.floor(arrowTurret.y/32) == yTile && arrowTurret.isAlive == true){

        canPlace = false;
      }

    }, this);
    this.lazerTurrets.children.each(function(lazerTurret){
      if(Math.floor(lazerTurret.x/32) == xTile && Math.floor(lazerTurret.y/32) == yTile && lazerTurret.isAlive == true){
        canPlace = false;
      }

    }, this);
    //console.log(getTileID(xTile, yTile));
    if(getTileID(xTile, yTile) == 15 && canPlace == true){

      var lazerTurret = lazerTurrets.create(xTile*32 + 15, yTile*32 + 15, 'lazerTurret').setInteractive();
      lazerTurret.anims.play('lazerInitial', true);
      lazerTurret.isAlive = true;
      lazerTurret.firingTimer = 0;
      var detectionCircle = detectionCircles.create(xTile*32 + 15, yTile*32 +15, 'detectionCircle').setInteractive();
      detectionCircle.visible = false;
      cash -= lazerCost;
      cashText.setText('$' + cash);
    }
  }

};

function sellTurret(tileX, tileY){
  this.arrowTurrets.children.each(function(arrowTurret){
    if(Math.floor(arrowTurret.x/32) == tileX && Math.floor(arrowTurret.y/32) == tileY && arrowTurret.isAlive == true){
      arrowTurret.destroy();
      arrowTurret.isAlive = false;
      cash += Math.floor(arrowCost*0.8);
      cashText.setText('$' + cash);
      mainDetectionCircle.visible = false;
    }
  }, this);
};

function tileChecker(tileX, tileY){
  var able = true;
  this.arrowTurrets.children.each(function(arrowTurret){
    if(Math.floor(arrowTurret.x/32) == tileX && Math.floor(arrowTurret.y/32) == tileY && arrowTurret.isAlive == true){
      //return false;
      able = false;
    }
  });
  if(able){
    return true;
  }
  else{
    return false;
  }
}


function spawnEnemy(type){
  if(type == 1 && mainEnemies.countActive(true) <= 20){
    //var mainEnemy = mainEnemies.create(0, 32, 'redEnemy');
    var mainEnemy = mainEnemies.create(0, 32, 'enemy');
    mainEnemy.body.immovable = true;
    mainEnemy.collideWorldBounds = true;
    mainEnemy.onOutOfBoundsKill = true;
    mainEnemy.anims.play('red', true);
    mainEnemy.hp = 1;
    // Levels
    // 1: All Red
    // 2: Half Red Half green
    // 3: All Green
    // 4: Half Green Half Blue
    // 5: All Blue
    // 6: Half Blue Half Yellow
    // 7: All Yellow
    if(wave >= 2){
      if(enemiesLeft % 2 == 0){
        mainEnemy.anims.play('green');
        mainEnemy.hp = 2;
      }
      else{
        mainEnemy.anims.play('red');
        mainEnemy.hp = 1;
      }
      if(wave >= 3){
        mainEnemy.anims.play('green');
        mainEnemy.hp = 2;

        if(wave >= 4){
          if(enemiesLeft % 2 == 0){
            mainEnemy.anims.play('green');
            mainEnemy.hp = 2;
          }
          else{
            mainEnemy.anims.play('blue');
            mainEnemy.hp = 3;
          }
          if(wave >= 5){
            mainEnemy.anims.play('blue');
            mainEnemy.hp = 3;
            if(wave >= 6){
              if(enemiesLeft % 2 == 0){
                mainEnemy.anims.play('yellow');
                mainEnemy.hp = 4;
              }
              if(wave >= 7){
                mainEnemy.anims.play('yellow');
                mainEnemy.hp = 4;
              }
            }
          }
        }
      }
    }
    mainEnemy.isAlive = true;
    mainEnemy.checkWorldBounds = true;
    mainEnemy.setDepth(1);
    mainEnemy.setOrigin(0,0);

    movement(mainEnemy);
  }
};
function arrowFire(){


  this.arrowTurrets.children.each(function(arrowTurret){
    if(arrowTurret.isAlive){

      var enemy = getEnemy(arrowTurret.x, arrowTurret.y, 75);
      if(enemy) {
        var angle = 0.2 + Phaser.Math.Angle.Between(arrowTurret.x, arrowTurret.y, enemy.x, enemy.y);
        arrowTurret.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;

        // Fires Bullet
        if(create.time.now > arrowTurret.firingTimer){
          arrowTurret.anims.play('arrowCharge', true);
          var bullet = bullets.create(arrowTurret.x, arrowTurret.y, 'bullet');
          bullet.checkWorldBounds = true;
          bullet.outOfBoundsKill = true;
          bullet.setDepth(1);
          bullet.setOrigin(0, 0.5);
          var dx = 0.2 + Math.cos(angle);
          var dy = 0.2 + Math.sin(angle);
          bullet.body.velocity.x = dx*1000;
          bullet.body.velocity.y = dy*1000;
          arrowTurret.firingTimer = create.time.now + 5250;
        }


      }

    }
  }, this); 
  if(checkIfAllDead() == true){
    changeLevel();
  }

};

function lazerFire(){

  this.lazerTurrets.children.each(function(lazerTurret){
    if(lazerTurret.isAlive){

      var enemy = getEnemy(lazerTurret.x, lazerTurret.y, 75);

      if(enemy) {

        var angle = 0.2 + Phaser.Math.Angle.Between(lazerTurret.x, lazerTurret.y, enemy.x, enemy.y);
        lazerTurret.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;

        if(create.time.now > lazerTurret.firingTimer){
          lazerTurret.anims.play('lazerCharge', true);
          var lazer = lazers.create(lazerTurret.x, lazerTurret.y, 'lazer');
          lazer.checkWorldBounds = true;
          lazer.outOfBoundsKill = true;
          lazer.setDepth(1);
          lazer.setOrigin(0, 0);
          var dx = 0.2 + Math.cos(angle);
          var dy = 0.2 + Math.sin(angle);
          lazer.body.velocity.x = dx*1000;
          lazer.body.velocity.y = dy*1000;
          lazerTurret.firingTimer = create.time.now + 12250;
        }
      }
    }
  }, this);
};
function changeLevel(){
  wave++;
  waveText.setText('Wave ' + wave);
  addedEnemies += 2;
  enemiesLeft = 10 + addedEnemies;
}


function bulletCollision(bullet, enemy){
  bullet.setActive(false);
  bullet.destroy();
  cash += 5;
  cashText.setText('$' + cash);
  enemy.hp--;
  if(enemy.hp <= 0){
    enemy.destroy();
    enemy.isAlive = false;
    //cash += 10;
    //cashText.setText('$' + cash);
  }
  else if(enemy.hp == 1){
    enemy.anims.play('red', true);
  }
  else if(enemy.hp == 2){
    enemy.anims.play('green', true);
  }
  else if(enemy.hp == 3){
    enemy.anims.play('blue', true);
  }
  else if(enemy.hp == 4){
    enemy.anims.play('yellow', true);
  }
};
function lazerCollision(lazer, enemy){
  cash += 5;
  cashText.setText('$' + cash);
  enemy.hp--;
  enemy.destroy();
  enemy.isAlive = false;
};
function endPointCollision(endPoint, enemy){
  lives--;
  enemy.destroy();
  enemy.isAlive = false;
  livesText.setText(lives);  
  if(checkIfAllDead == true){
    changeLevel();
  }

};
function spawnEndPoints(x, y){
  var endPoint = endPoints.create(x, y, 'endPoint');
  endPoint.checkWorldBounds = true;
  endPoint.setDepth(1);
  endPoint.setOrigin(0, 0);
  endPoint.setVisible(false);
  //endPoint.setVisible(true);
  endPoint.body.immovable = true;

};
function movement(player){
  var x = 640;
  var y = 608;
  var toX = Math.floor(x/32);
  var toY = Math.floor(y/32);
  var fromX = Math.floor(player.x/32);
  var fromY = Math.floor(player.y/32);

  //console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');

  finder.findPath(fromX, fromY, toX, toY, function( path ) {
    if(path === null) {
      console.warn("Path was not found.");
    }
    else {
      //console.log(path);
      moveCharacter(path, player);
    }
  });
  finder.calculate();
};

function moveCharacter(path, enemy){
  // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
  var tweens = [];
  for(var i = 0; i < path.length-1; i++){
    var ex = path[i+1].x;
    var ey = path[i+1].y;
    tweens.push({
      //targets: Game.player,
      targets: enemy,
      x: {value: ex*map.tileWidth, duration: 800},
      y: {value: ey*map.tileHeight, duration: 800}
    });
  }
  game.tweens.timeline({
    tweens: tweens
  });
};
