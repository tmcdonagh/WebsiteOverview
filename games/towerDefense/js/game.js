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



var firingTimer = 0;
var enemiesLeft = 10;
var lives = 10;
var cash = 1000
arrowFollow = false;


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
}
  // Supposed to fix switching tabs issue but doesn't work
  //stage.disableVisibilityChange = true;


function create(){

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
  arrowCost = game.add.text(22.3*32, 8.9*32, '$100', {font: '18px Arial'});

  arrowDock = this.add.image(23*32, 8*32, 'dock');
  arrowTurretButton = this.add.image(23*32, 8*32, 'arrowTurret')
  arrowTurretButton.inputEnabled = true;
  

  arrowTurrets = this.physics.add.group();
  arrowTurrets.enableBody = true;
  arrowTurrets.physicsBodyType = Phaser.Physics.ARCADE;
  

  mainEnemies = this.physics.add.group();
  mainEnemies.enableBody = true;
  mainEnemies.physicsBodyType = Phaser.Physics.ARCADE;
  mainEnemies.createMultiple(25, 'mainEnemies');

  bullets = this.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');

  endPoints = this.physics.add.group();
  endPoints.enableBody = true;
  endPoints.physicsBodyType = Phaser.Physics.ARCADE;
  endPoints.createMultiple(2, 'endPoint');

  spawnEndPoints(660, 630);

}
/* ***** End of Create function ***** */

function update(){

  this.physics.add.collider(endPoints, mainEnemies, endPointCollision, null, this);




  var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

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
  }


  if(this.time.now > firingTimer && enemiesLeft > 0){
    spawnEnemy(1);
    firingTimer = this.time.now + 2000;
  }
  //have to find a fix for this
  //this.physics.arcade.overlap(bullets, aliens, collisionHandler, null, this);


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
  return tile.index;
};

function handleClick(pointer){
  console.log('(' + pointer.x + ', ' + pointer.y + ')');
  if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 233 && pointer.y <= 283 && arrowFollow == false){
    arrowFollow = true;
  }
  else if(pointer.x >= 672){
    arrowFollow = false;
    arrowTurretButton.x = 23*32;
    arrowTurretButton.y = 8*32;
  }
  else if(arrowFollow){
    placeArrow(pointer.x, pointer.y);
  }
};

function placeArrow(x, y){
  xTile = Math.floor(x/32);
  yTile = Math.floor(y/32);
  //console.log(xTile + ' ' + yTile);
  if(cash >= 100){ 	
    // need to add something that prevents turrets on turrets
    console.log(getTileID(xTile, yTile));
    if(getTileID(xTile, yTile) == 15){
    
      var arrowTurret = arrowTurrets.create(xTile*32 + 15, yTile*32 + 15, 'arrowTurret');
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
function bulletCollision(bullet, enemy){
  bullet.destroy();
  enemy.destroy();
  //cash += 10;

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
