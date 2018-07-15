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


var livingArrowTurrets = [];
var spawnTimer = 0;
var firingTimer = 0;
var enemiesLeft = 10;
var lives = 10;
var cash = 200;
arrowFollow = false;
var arrowCost = 100;


function preload(){
  game = this;
  game.load.image('tileset', 'assets/gridtiles.png');
  game.load.tilemapTiledJSON('map', 'assets/map.json');
  game.load.image('mainEnemy', 'assets/phaserguy.png');
  game.load.image('bullet', 'assets/bullet.png');
  game.load.image('shop', 'assets/tdShop.png');
  game.load.image('arrowTurret', 'assets/arrow.png');
  game.load.image('endPoint', 'assets/endPoint.png');
  game.load.image('dock', 'assets/dock.png');
  game.load.image('detectionCircle', 'assets/detectionCircle.png');
  game.load.image('mainDetectionCircle', 'assets/mainDetectionCircle.png');
  game.load.image('redDetectionCircle', 'assets/redDetectionCircle.png');
  game.load.image('greenDetectionCircle', 'assets/greenDetectionCircle.png');
  game.load.image('arrowHelp', 'assets/arrowHelp.png');
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

  cashText = game.add.text(25*32, 1.5*32, '$' + cash, {font: '18px Arial'});
  livesText = game.add.text(25.5*32, 3.75*32, lives, {font: '18px Arial'});
  arrowCost = game.add.text(22.3*32, 8.9*32, '$' + arrowCost, {font: '18px Arial'});

  arrowDock = this.add.image(23*32, 8*32, 'dock');
  arrowTurretButton = this.add.image(23*32, 8*32, 'arrowTurret')
  arrowTurretButton.inputEnabled = true;
  
  arrowTurrets = this.physics.add.group();
  arrowTurrets.enableBody = true;
  arrowTurrets.physicsBodyType = Phaser.Physics.ARCADE;
  
  mainEnemies = this.physics.add.group();
  mainEnemies.enableBody = true;
  mainEnemies.physicsBodyType = Phaser.Physics.ARCADE;
  mainEnemies.createMultiple(2500, 'mainEnemies');

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

  if(this.input.activePointer.x <= 762 && this.input.activePointer.x >= 713 && this.input.activePointer.y >= 233 && this.input.activePointer.y <= 283){
    arrowHelp.visible = true;
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
    //mainDetectionCircle.x = this.input.activePointer.x;
    //mainDetectionCircle.y = this.input.activePointer.y;
    //mainDetectionCircle.visible = true;

    arrowTileX = Math.floor(this.input.activePointer.x/32);
    arrowTileY = Math.floor(this.input.activePointer.y/32);

    if(getTileID(arrowTileX, arrowTileY) == 15 && cash >= 100){
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
    console.log(getTileID(1,1));
  }


  if(this.time.now > spawnTimer && enemiesLeft > 0){
    spawnEnemy(1);
    spawnTimer = this.time.now + 2000;
  }

  arrowFire();
  create = this;



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
  }
  else if(pointer.x >= 672){
    arrowFollow = false;
    arrowTurretButton.x = 23*32;
    arrowTurretButton.y = 8*32;
    //mainDetectionCircle.visible = false;
    redDetectionCircle.visible = false;
    greenDetectionCircle.visible = false;
  }
  else if(arrowFollow){
    placeArrow(pointer.x, pointer.y);
  }
};

function placeArrow(x, y){
  var canPlace = true;
  xTile = Math.floor(x/32);
  yTile = Math.floor(y/32);
  if(cash >= 100){ 	
    var canPlace = true;
    this.arrowTurrets.children.each(function(arrowTurret){
      if(Math.floor(arrowTurret.x/32) == xTile && Math.floor(arrowTurret.y/32) == yTile){
        canPlace = false;
      }

    }, this);
    //console.log(getTileID(xTile, yTile));
    if(getTileID(xTile, yTile) == 15 && canPlace == true){
    
      var arrowTurret = arrowTurrets.create(xTile*32 + 15, yTile*32 + 15, 'arrowTurret').setInteractive();
      arrowTurret.firingTimer = 0;
      var detectionCircle = detectionCircles.create(xTile*32 + 15, yTile*32 +15, 'detectionCircle').setInteractive();
      detectionCircle.visible = false;
      cash -= 100;
      cashText.setText('$' + cash);
    }

  }
  
  
};


function spawnEnemy(type){
  if(type == 1 && mainEnemies.countActive(true) <= 20){
    var mainEnemy = mainEnemies.create(0, 32, 'mainEnemy');
    //mainEnemy.anchor.setTo(0.5, 0.5);
    mainEnemy.checkWorldBounds = true;
    mainEnemy.setDepth(1);
    mainEnemy.setOrigin(0,0.5);

    movement(mainEnemy);
  }
};
function arrowFire(){

  this.arrowTurrets.children.each(function(arrowTurret){

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

  }, this); 

};


function bulletCollision(bullet, enemy){
  bullet.setActive(false);
  bullet.destroy();
  enemy.destroy();
  cash += 10;
  cashText.setText('$' + cash);

};
function endPointCollision(endPoint, enemy){
  lives--;
  enemy.destroy();
  livesText.setText(lives);  
  
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
