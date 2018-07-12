var Game = {};



var firingTimer = 0;
var enemiesLeft = 10;


Game.preload = function(){
  Game.scene = this; // Handy reference to the scene (alternative to `this` binding)
  this.load.image('tileset', 'assets/gridtiles.png');
  this.load.tilemapTiledJSON('map', 'assets/map.json');
  this.load.image('mainEnemy', 'assets/phaserguy.png');
  this.load.image('bullet', 'assets/bullet.png');
};

Game.create = function(){
  // Handles the clicks on the map to make the character move

  Game.scene = this;

  // Runs Game.handleClick when mouse is clicked
  this.input.on('pointerup',Game.handleClick);

  Game.camera = this.cameras.main;
  Game.camera.setBounds(0, 0, 21*32, 21*32);
  
  //this.physics.startSystem(Phaser.Physics.ARCADE);


  mainEnemies = this.add.group();
  mainEnemies.enableBody = true;
  mainEnemies.physicsBodyType = Phaser.Physics.ARCADE;
  
  //Game.physics.enable(mainEnemies, Phaser.Physics.ARCADE);




  bullets = this.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');
  
  /*
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
  */



/*
  var phaserGuy = this.add.image(32,32,'phaserguy');
  phaserGuy.setDepth(1);
  phaserGuy.setOrigin(0,0.5);
  //Game.camera.startFollow(phaserGuy);
  Game.player = phaserGuy;
*/


  // Display map
  Game.map = Game.scene.make.tilemap({ key: 'map'});
  // The first parameter is the name of the tileset in Tiled and the second parameter is the key
  // of the tileset image used when loading the file in preload.
  var tiles = Game.map.addTilesetImage('tiles', 'tileset');
  Game.map.createStaticLayer(0, tiles, 0,0);

  // Marker that will follow the mouse
  Game.marker = this.add.graphics();
  Game.marker.lineStyle(3, 0xffffff, 1);
  Game.marker.strokeRect(0, 0, Game.map.tileWidth, Game.map.tileHeight);

  // ### Pathfinding stuff ###
  // Initializing the pathfinder
  Game.finder = new EasyStar.js();

  // We create the 2D array representing all the tiles of our map
  var grid = [];
  for(var y = 0; y < Game.map.height; y++){
    var col = [];
    for(var x = 0; x < Game.map.width; x++){
      // In each cell we store the ID of the tile, which corresponds
      // to its index in the tileset of the map ("ID" field in Tiled)
      col.push(Game.getTileID(x,y));
    }
    grid.push(col);
  }
  Game.finder.setGrid(grid);

  var tileset = Game.map.tilesets[0];
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
    if(properties[i].cost) Game.finder.setTileCost(i+1, properties[i].cost); // If there is a cost attached to the tile, let's register it
  }
  Game.finder.setAcceptableTiles(acceptableTiles);

  //Game.movement();
  Game.marker.setVisible(false);

};

Game.update = function(){

  var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

  //Rounds down to nearest tile
  var pointerTileX = Game.map.worldToTileX(worldPoint.x);
  var pointerTileY = Game.map.worldToTileY(worldPoint.y);
  Game.marker.x = Game.map.tileToWorldX(pointerTileX);
  Game.marker.y = Game.map.tileToWorldY(pointerTileY);
  //Game.marker.setVisible(Game.checkCollision(pointerTileX,pointerTileY));
  if(pointerTileX < 21){
    Game.marker.setVisible(true);
  }
  else {
    Game.marker.setVisible(false);
  }
  
  if(this.time.now > firingTimer && enemiesLeft > 0){
    Game.spawnEnemy(1);
    firingTimer = this.time.now + 2000;
  }

};

Game.checkCollision = function(x,y){
  if(!Game.map.getTileAt(x, y) == null){
    var tile = Game.map.getTileAt(x, y);
    return tile.properties.collide == true;
  }
  else{
    var tile = Game.map.getTileAt(1,1);
    return tile.properties.collide == true;
  }
};

Game.getTileID = function(x,y){
  var tile = Game.map.getTileAt(x, y);
  return tile.index;
};

Game.handleClick = function(pointer){
  
};

Game.spawnEnemy = function(type){
  if(type == 1){
    var mainEnemy = mainEnemies.create(32, 32, 'mainEnemy');
    //mainEnemy.anchor.setTo(0.5, 0.5);
    mainEnemy.checkWorldBounds = true;
    mainEnemy.setDepth(1);
    mainEnemy.setOrigin(0,0.5);
    Game.movement(mainEnemy);
  }
};









Game.movement = function(player){
  var x = 640;
  var y = 608;
  var toX = Math.floor(x/32);
  var toY = Math.floor(y/32);
  var fromX = Math.floor(player.x/32);
  var fromY = Math.floor(player.y/32);
  
  console.log('going from ('+fromX+','+fromY+') to ('+toX+','+toY+')');

  Game.finder.findPath(fromX, fromY, toX, toY, function( path ) {
    if(path === null) {
      console.warn("Path was not found.");
    }
    else {
      console.log(path);
      Game.moveCharacter(path, player);
    }
  });
  Game.finder.calculate();
};


Game.moveCharacter = function(path, enemy){
  // Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
  var tweens = [];
  for(var i = 0; i < path.length-1; i++){
    var ex = path[i+1].x;
    var ey = path[i+1].y;
    tweens.push({
      //targets: Game.player,
      targets: enemy,
      x: {value: ex*Game.map.tileWidth, duration: 800},
      y: {value: ey*Game.map.tileHeight, duration: 800}
    });
  }

  Game.scene.tweens.timeline({
    tweens: tweens
  });
};
