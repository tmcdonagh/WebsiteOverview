// Things to add:
//   -Enemy Health Bar
//   -Turret Cooldown Meter
//   -Lazer Beam Turret
//   -Blockades
//   -Better right menu (With square for help text)
//   -New Sprite for enemies and turrets
//   -New enemies
//   -Figure out how to center the game on screen
//   -Start Menu
//   -Pause Button
//   -Levels
//   -Level Text
//   -Enemies spawn is messed up where they can pile up when framerate is low or when tab is changed





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
var cash = 200;
var arrowFollow = false;
var sellFollow = false;
var arrowCost = 100;
var level = 1;
var addedEnemies = 0;


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
  //this.load.spritesheet('enemy', 'assets/alienSpritesheet.png', {frameWidth: 32, frameHeight: 32 });
  this.load.multiatlas('enemy', 'assets/alienSpritesheet.json', 'assets');
}


function create(){

  create = this; 

  // Makes map
  map = game.add.tilemap('map');
  var tiles = map.addTilesetImage('tiles', 'tileset');
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

  levelText = game.add.text(26.5*32, 0.75*32, 'Level ' + level, {font: '18px Arial'});
  cashText = game.add.text(25*32, 1.5*32, '$' + cash, {font: '18px Arial'});
  livesText = game.add.text(25.5*32, 3.75*32, lives, {font: '18px Arial'});
  arrowCost = game.add.text(22.3*32, 8.9*32, '$' + arrowCost, {font: '18px Arial'});

  arrowDock = this.add.image(23*32, 8*32, 'dock');
  arrowTurretButton = this.add.image(23*32, 8*32, 'arrowTurret');
  arrowTurretButton.inputEnabled = true;

  sellDock = this.add.image(23*32, 6*32, 'sellDock');
  sellIcon = this.add.image(23*32, 6*32, 'sellIcon');
  sellIcon.inputEnabled = true;

  arrowTurrets = this.physics.add.group();
  arrowTurrets.enableBody = true;
  arrowTurrets.physicsBodyType = Phaser.Physics.ARCADE;

  mainEnemies = this.physics.add.group();
  mainEnemies.enableBody = true;
  mainEnemies.physicsBodyType = Phaser.Physics.ARCADE;
  mainEnemies.createMultiple(2500, 'mainEnemies');

  
  testEnemies = this.physics.add.group();
  testEnemies.enableBody = true;
  testEnemies.physicsBodyType = Phaser.Physics.ARCADE;
  testEnemies.createMultiple(2500, 'enemy');

  bullets = this.physics.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');

  endPoints = this.physics.add.group();
  endPoints.enableBody = true;
  endPoints.physicsBodyType = Phaser.Physics.ARCADE;
  endPoints.createMultiple(2, 'endPoint');
  spawnEndPoints(660, 630);

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
  this.physics.add.collider(endPoints, mainEnemies, endPointCollision, null, this);


}
/* ***** End of Create function ***** */

function update(){

  //this.physics.add.collider(endPoints, mainEnemies, endPointCollision, null, this);
  //this.physics.add.collider(bullets, mainEnemies, bulletCollision, null, this);

  var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

  pointerX = this.input.activePointer.x;
  pointerY = this.input.activePointer.y;

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

  if(arrowFollow){
    arrowTurretButton.x = this.input.activePointer.x;
    arrowTurretButton.y = this.input.activePointer.y;

    arrowTileX = Math.floor(this.input.activePointer.x/32);
    arrowTileY = Math.floor(this.input.activePointer.y/32);

    if(getTileID(arrowTileX, arrowTileY) == 15 && cash >= 100 && tileChecker(arrowTileX, arrowTileY) == true){
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
  //create = this;



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
  //console.log('(' + pointer.x + ', ' + pointer.y + ')');
  



  if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 233 && pointer.y <= 283 && arrowFollow == false){
    arrowFollow = true;
    sellFollow = false;
  }
  else if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 168 && pointer.y <= 220 && sellFollow == false){
    sellFollow = true;
    arrowFollow = false;

  }
  else if(pointer.x >= 672){
    arrowFollow = false;
    arrowTurretButton.x = 23*32;
    arrowTurretButton.y = 8*32;
    //mainDetectionCircle.visible = false;
    redDetectionCircle.visible = false;
    greenDetectionCircle.visible = false;

    sellFollow = false;
    sellIcon.x = 23*32;
    sellIcon.y = 6*32;
  }
  else if(arrowFollow){
    placeArrow(pointer.x, pointer.y);
  }
  else if(sellFollow){
    sellTurret(Math.floor(pointer.x/32), Math.floor(pointer.y/32));
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
  if(cash >= 100){ 	
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
      cash -= 100;
      cashText.setText('$' + cash);
    }
  }
};

function sellTurret(tileX, tileY){
  this.arrowTurrets.children.each(function(arrowTurret){
    if(Math.floor(arrowTurret.x/32) == tileX && Math.floor(arrowTurret.y/32) == tileY){
      arrowTurret.destroy();
      arrowTurret.isAlive = false;
      cash += 80;
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
    //var mainEnemy = mainEnemies.create(0, 32, 'mainEnemy');
    var mainEnemy = mainEnemies.create(0, 32, 'redEnemy');
    mainEnemy.isAlive = true;
    //mainEnemy.anchor.setTo(0.5, 0.5);
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
        var angle = Phaser.Math.Angle.Between(arrowTurret.x, arrowTurret.y, enemy.x, enemy.y);
        arrowTurret.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;

        // Fires Bullet
        if(create.time.now > arrowTurret.firingTimer){
          var bullet = bullets.create(arrowTurret.x, arrowTurret.y, 'bullet');
          bullet.checkWorldBounds = true;
          bullet.outOfBoundsKill = true;
          bullet.setDepth(1);
          bullet.setOrigin(0, 0.5);
          var dx = Math.cos(angle);
          var dy = Math.sin(angle);
          bullet.body.velocity.x = dx*1000;
          bullet.body.velocity.y = dy*1000;
          arrowTurret.firingTimer = create.time.now + 5000;
          //console.log(arrowTurrets.active());
        }


      }

    }
  }, this); 
  if(checkIfAllDead() == true){
    changeLevel();
  }

};
function changeLevel(){
  level++;
  levelText.setText('Level ' + level);
  addedEnemies += 2;
  enemiesLeft = 10 + addedEnemies;
}


function bulletCollision(bullet, enemy){
  bullet.setActive(false);
  bullet.destroy();
  enemy.destroy();
  enemy.isAlive = false;
  cash += 10;
  cashText.setText('$' + cash);
  /*
     if(checkIfAllDead == true){
     changeLevel();
     }
     */
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
  endPoint.setOrigin(0, 0.5);
  endPoint.setVisible(false);
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
