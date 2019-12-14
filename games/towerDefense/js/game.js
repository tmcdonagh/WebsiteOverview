// Things to add:
// X -Enemy Health Bar
// X -Turret Cooldown Meter
// X -Lazer Beam Turret
// / -Ice Turret
//   -Blockades
//   -Better right menu (With square for help text)
// / -New Sprite for enemies and turrets
// / -New enemies (Partially Done)
//   -Figure out how to center the game on screen
// / -Start Menu
//   -Pause Button
// X -Levels
// X -Level Text
// X -Enemies spawn is messed up where they can pile up when framerate is low or when tab is changed
// / -Fix animation for fireturret by adding timer like the firing timer
// X -Turret Count
//   -Make it so you can buy new turret slots
//   -Game over screen
//   -High Scores (possibly mysql)





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

var selectedTurret;

var livingArrowTurrets = [];
var spawnTimer = 0;
var firingTimer = 0;
var enemiesLeft = 10;
var lives = 10;
var cash = 100; // change to 95 for gameplay 100 for testing
var arrowFollow = false;
var sellFollow = false;
var iceTurretFollow = false;
var wave = 1;
var addedEnemies = 0;
var lazerFollow = false;
var fireTurretFollow = false;
var spawnRight = false;
var turretCount = 0;
var maxTurretCount = 10;

var arrowCost = 50;
var lazerCost = 100;
var fireCost = 100;
var iceCost = 100;

var speedUpgradeCost = 25;
var damageUpgradeCost = 100;

var arrowTurretDelays = [ 5000, 4100, 3400, 2900 ]; // values based on 5 second interval divided by frame rate of animation


function preload(){
	game = this;
	this.load.image('tileset', 'assets/gridtiles.png');
	this.load.tilemapTiledJSON('map', 'assets/map.json');
	this.load.image('bullet', 'assets/bullet.png');
	this.load.image('shop', 'assets/tdShop.png');
	this.load.image('arrowTurret', 'assets/arrow.png');
	this.load.image('endPoint', 'assets/endPoint.png');
	this.load.image('dock', 'assets/dock.png');
	this.load.image('sellDock', 'assets/sellDock.png');
	this.load.image('sellIcon', 'assets/sellIcon.png');
	this.load.image('detectionCircle', 'assets/detectionCircle.png');
	this.load.image('sight', 'assets/sight.png');
	this.load.image('mainDetectionCircle', 'assets/mainDetectionCircle.png');
	this.load.image('redDetectionCircle', 'assets/redDetectionCircle.png');
	this.load.image('greenDetectionCircle', 'assets/greenDetectionCircle.png');
	this.load.image('fireDetectionCircle', 'assets/fireDetectionCircle.png');
	this.load.image('arrowHelp', 'assets/arrowHelp.png');
	this.load.spritesheet('enemy', 'assets/alienSpritesheet.png', {frameWidth: 34, frameHeight: 28 });
	this.load.spritesheet('arrow', 'assets/arrowCharge.png', {frameWidth: 34, frameHeight: 34});
	this.load.spritesheet('lazerTurret', 'assets/lazerCharge.png', {frameWidth: 34, frameHeight: 34});
	this.load.spritesheet('fireTurret', 'assets/fireTurretSpritesheet.png', {frameWidth: 32, frameHeight: 32});
	this.load.image('fireTurretButton', 'assets/fireTurretButton.png');
	this.load.image('lazer', 'assets/lazer.png');
	this.load.image('lazerTurretButton', 'assets/lazerTurretButton.png');
	this.load.image('startScreen', 'assets/startScreen.png');
	this.load.image('infoTray', 'assets/infoTray.png');
	this.load.image('infoTrayMain', 'assets/infoTrayMain.png');
	this.load.image('damageUpgradeIcon', 'assets/damageUpgradeIcon.png');
	this.load.image('speedUpgradeIcon', 'assets/speedUpgradeIcon.png');
	this.load.image('iceTurret', 'assets/snowflake.png');

}



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
		key: 'arrowChargeSpeed1',
		frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 4 }),
		frameRate: 1.25,
	});

	this.anims.create({
		key: 'arrowChargeSpeed2',
		frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 4 }),
		frameRate: 1.5,
	});

	this.anims.create({
		key: 'arrowChargeSpeed3',
		frames: this.anims.generateFrameNumbers('arrow', { start: 0, end: 4 }),
		frameRate: 1.75,
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

	this.anims.create({
		key: 'fireTurretCharge',
		frames: this.anims.generateFrameNumbers('fireTurret', {start: 0, end: 15}),
		frameRate: 1,
	});
	this.anims.create({
		key: 'fireTurretFire',
		frames: this.anims.generateFrameNumbers('fireTurret', {start: 0, end: 15}),
		frameRate: 3,
	});
	this.anims.create({
		key: 'fireTurretInitial',
		frames: this.anims.generateFrameNumbers('fireTurret', {start: 15, end: 15}),
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

	infoTray = this.add.image(817, 562, 'infoTray');

	infoTrayMain = this.add.image(817, 562, 'infoTrayMain');
	infoTrayMain.visible = false;

	damageUpgradeIcon1 = this.add.image(715, 629, 'damageUpgradeIcon');
	damageUpgradeIcon2 = this.add.image(789, 629, 'damageUpgradeIcon');
	speedUpgradeIcon1 = this.add.image(869, 632, 'speedUpgradeIcon');
	speedUpgradeIcon2 = this.add.image(886, 632, 'speedUpgradeIcon');
	speedUpgradeIcon3 = this.add.image(903, 632, 'speedUpgradeIcon');
	damageUpgradeIcon1.visible = false;
	damageUpgradeIcon2.visible = false;
	speedUpgradeIcon1.visible = false;
	speedUpgradeIcon2.visible = false;
	speedUpgradeIcon3.visible = false;

	waveText = game.add.text(26.5*32, 0.75*32, 'Wave ' + wave, {font: '18px Arial'});
	cashText = game.add.text(25*32, 1.5*32, '$' + cash, {font: '18px Arial'});
	livesText = game.add.text(25.25*32, 3.75*32, lives, {font: '18px Arial'});
	arrowCostText = game.add.text(22.5*32, 8.8*32, '$' + arrowCost, {font: '18px Arial'});
	iceCostText = game.add.text(25.1*32, 11.3*32, '$' + iceCost, {font: '18px Arial'});
	lazerCostText = game.add.text(22.3*32, 11.3*32, '$' + lazerCost, {font: '18px Arial'});
	fireCostText = game.add.text(25.1*32, 8.8*32, '$' + fireCost, {font: '18px Arial'});
	sellText = game.add.text(22.5*32, 13.8*32, 'Sell', {font: '18px Arial'}); 
	turretCountText = game.add.text(22.2*32, 5.5*32, 'Turrets: ' + turretCount + '/' + maxTurretCount, {font: '18px Arial'});

	speedUpgradeText = game.add.text(860, 575, '$' + speedUpgradeCost, {font: '26px Arial'});
	speedUpgradeText.visible = false;

	damageUpgradeText = game.add.text(720, 575, '$' + damageUpgradeCost, {font: '26px Arial'});
	damageUpgradeText.visible = false;

	arrowDock = this.add.image(23*32, 8*32, 'dock');
	arrowTurretButton = this.add.image(23*32, 8*32, 'arrowTurret');
	arrowTurretButton.setDepth(1);
	arrowTurretButton.inputEnabled = true;

	iceTurretDock = this.add.image(25.75*32, 10.5*32, 'dock');
	iceTurretButton = this.add.image(25.75*32, 10.5*32, 'iceTurret');
	iceTurretButton.setDepth(1);
	iceTurretButton.inputEnabled = true;

	sellDock = this.add.image(23*32, 13*32, 'sellDock');
	sellIcon = this.add.image(23*32, 13*32, 'sellIcon');
	sellIcon.setDepth(1);
	sellIcon.inputEnabled = true;

	lazerDock = this.add.image(23*32, 10.5*32, 'dock');
	lazerDock.setDepth(0);
	lazerTurretButton = this.add.image(23*32, 10.5*32, 'lazerTurretButton');
	lazerTurretButton.inputEnabled = true;

	fireTurretDock = this.add.image(25.75*32, 8*32, 'dock');
	fireTurretDock.setDepth(0);
	fireTurretButton = this.add.image(25.85*32, 8.1*32, 'fireTurretButton');
	fireTurretButton.inputEnabled = true;


	arrowTurrets = this.physics.add.group();
	arrowTurrets.enableBody = true;
	arrowTurrets.physicsBodyType = Phaser.Physics.ARCADE;

	lazerTurrets = this.physics.add.group();
	lazerTurrets.enableBody = true;
	lazerTurrets.physicsBodyType = Phaser.Physics.ARCADE;

	fireTurrets = this.physics.add.group();
	fireTurrets.enableBody = true;
	fireTurrets.physicsBodyType = Phaser.Physics.ARCADE;

	iceTurrets = this.physics.add.group();
	iceTurrets.enableBody = true;
	iceTurrets.physicsBodyType = Phaser.Physics.ARCADE;

	mainEnemies = this.physics.add.group();
	mainEnemies.enableBody = true;
	mainEnemies.physicsBodyType = Phaser.Physics.ARCADE;
	mainEnemies.createMultiple(250, 'mainEnemies');

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
	spawnEndPoints(-40, 600);

	detectionCircles = this.physics.add.group();
	detectionCircles.enableBody = true;
	detectionCircles.physicsBodyType = Phaser.Physics.ARCADE;

	this.input.on('gameobjectdown', function (pointer, gameObject) {

		//gameObject.destroy();
		//detectionCircle.visible = false;

	});

	mainDetectionCircle = this.add.image(5000, 5000, 'mainDetectionCircle');
	mainDetectionCircle.visible = false;

	secondDetectionCircle = this.add.image(5000, 5000, 'mainDetectionCircle');
	secondDetectionCircle.visible = false;

	fireDetectionCircle = this.add.image(5000, 5000, 'fireDetectionCircle');
	fireDetectionCircle.visible = false;

	secondFireDetectionCircle = this.add.image(5000, 5000, 'fireDetectionCircle');
	secondFireDetectionCircle.visible = false;

	sight = this.add.image(5000, 5000, 'sight');
	sight.visible = false;

	redDetectionCircle = this.add.image(5000, 5000, 'redDetectionCircle');
	redDetectionCircle.visible = false;

	greenDetectionCircle = this.add.image(5000, 5000, 'greenDetectionCircle');
	greenDetectionCircle.visible = false;

	arrowHelp = this.add.image(815, 575, 'arrowHelp');

	this.input.on('gameobjectover', function(pointer, gameObject){
		if(selectedTurret == undefined){
			if(pointer.x <= 672 && gameObject.isFire != true){
				mainDetectionCircle.visible = true;
				mainDetectionCircle.x = gameObject.x;
				mainDetectionCircle.y = gameObject.y;
			}
			else if(gameObject.isFire){
				fireDetectionCircle.visible = true;
				fireDetectionCircle.x = gameObject.x;
				fireDetectionCircle.y = gameObject.y;
			}
		}
		if(gameObject.isLazer == true){
			sight.visible = true;
			sight.x = gameObject.sightX;
			sight.y = gameObject.sightY;
		}
	});
	this.input.on('gameobjectout', function(pointer, gameObject){
		sight.visible = false;
		mainDetectionCircle.visible = false;
		fireDetectionCircle.visible = false;
		if(selectedTurret){
			if(selectedTurret.isLazer){
				sight.visible = true;
				sight.x = selectedTurret.sightX;
				sight.y = selectedTurret.sightY;
			}
		}
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

		// Checks if damage upgrade is affordable
		if(cash >= damageUpgradeCost){
			damageUpgradeText.setColor('#00df00'); // Sets color to green if enough cash
		}
		else{
			damageUpgradeText.setColor('#ff0000'); // Sets color to red if not enough cash
		}
		// Checks if speed upgrade is affordable
		if(cash >= speedUpgradeCost){
			speedUpgradeText.setColor('#00df00'); // Sets color to green if enough cash
		}
		else{
			speedUpgradeText.setColor('#ff0000'); // Sets color to red if not enough cash
		}

		if(selectedTurret != undefined){
			if(selectedTurret.damage == 2){
				damageUpgradeText.visible = false;
				damageUpgradeIcon1.visible = true;
				damageUpgradeIcon2.visible = true;
			}
			if(selectedTurret.speed >= 1){
				speedUpgradeIcon1.visible = true;
			}
			if(selectedTurret.speed >= 2){
				speedUpgradeIcon2.visible = true;
			}
			if(selectedTurret.speed >= 3){
				speedUpgradeIcon3.visible = true;
				speedUpgradeText.visible = false;
			}
		}


		if(pointerX <= 762 && pointerX >= 713 && pointerY >= 233 && pointerY <= 283 && selectedTurret == undefined){
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

		if(arrowFollow || lazerFollow || fireTurretFollow || iceTurretFollow){
			if(arrowFollow){
				arrowTurretButton.x = this.input.activePointer.x;
				arrowTurretButton.y = this.input.activePointer.y;

				resetButtonsExcept("arrowTurretButton");
			}
			else if(lazerFollow){
				lazerTurretButton.x = this.input.activePointer.x;
				lazerTurretButton.y = this.input.activePointer.y;

				resetButtonsExcept("lazerTurretButton");
			}
			else if(fireTurretFollow){
				fireTurretButton.x = this.input.activePointer.x + 3;
				fireTurretButton.y = this.input.activePointer.y + 3;

				resetButtonsExcept("fireTurretButton");
			}
			else if(iceTurretFollow){
				iceTurretButton.x = this.input.activePointer.x;
				iceTurretButton.y = this.input.activePointer.y;

				resetButtonsExcept("iceTurretButton");
			}


			sellIcon.x = 23*32;
			sellIcon.y = 13*32;


			turretTileX = Math.floor(this.input.activePointer.x/32);
			turretTileY = Math.floor(this.input.activePointer.y/32);

			if(getTileID(turretTileX, turretTileY) == 15 && cash >= arrowCost && tileChecker(turretTileX, turretTileY) == true && turretCount < maxTurretCount){
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

			resetButtonsExcept("sellButton");

			redDetectionCircle.visible = false;
		}

		outside.lazerTurrets.children.each(function(lazerTurret){
			if(lazerTurret.isAiming){
				lazerTurret.initAngle = Phaser.Math.Angle.Between(lazerTurret.x, lazerTurret.y, this.input.activePointer.x, this.input.activePointer.y);
				lazerTurret.angle = (lazerTurret.initAngle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
				sight.x = this.input.activePointer.x;
				sight.y = this.input.activePointer.y;
				sight.visible = true;
			}
		}, this);

		if(this.time.now > spawnTimer && enemiesLeft > 0){
			var canSpawn = true;
			outside.mainEnemies.children.each(function(mainEnemy){
				if(Math.floor(mainEnemy.x/32) <= 1 && Math.floor(mainEnemy.y/32) <=11){
					canSpawn = false;
				}
			}, this);
			if(canSpawn && wave <= 3){
				spawnEnemy(1);
				enemiesLeft--;
				spawnTimer = this.time.now + 2000;
			}
			else if(canSpawn){
				spawnEnemy(1);
				enemiesLeft--;
				spawnTimer = this.time.now + 1000;
			}
		}
		if(this.time.now > spawnTimer && enemiesLeft <= 0){

			if(checkIfAllDead == true){
				changeLevel();
			}
		}

		arrowFire();
		lazerFire();
		fireTurretFire();
		iceTurretFire();
		//create = this;

	}
	else if(game.paused == true){
		arrowHelp.visible = false;
	}

}

/* ***** End of Update Function ***** */

function resetButtonsExcept(except){
	if(except != "arrowTurretButton"){
		arrowTurretButton.x = 23*32;
		arrowTurretButton.y = 8*32;
		arrowFollow = false;
	}
	if(except != "lazerTurretButton"){
		lazerTurretButton.x = 23*32;
		lazerTurretButton.y = 10.5*32;
		lazerFollow = false;
	}
	if(except != "fireTurretButton"){
		fireTurretButton.x = 25.85*32;
		fireTurretButton.y = 8.1*32;
		fireTurretFollow = false;
	}
	if(except != "sellButton"){
		sellIcon.x = 23*32;
		sellIcon.y = 13*32;
		sellFollow = false;
	}
	if(except != "iceTurretButton"){
		iceTurretButton.x = 25.75*32;
		iceTurretButton.y = 10.5*32;
		iceTurretFollow = false;
	}

};

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
	//console.log(cash);
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
	var tileX = Math.floor(pointer.x/32);
	var tileY = Math.floor(pointer.y/32);

	if(tileChecker(tileX, tileY) == false && game.paused == false && !sellFollow){
		arrowTurrets.children.each(function(arrowTurret){
			if(Math.floor(arrowTurret.x/32) == tileX && Math.floor(arrowTurret.y/32) == tileY && arrowTurret.isAlive == true){
				selectedTurret = arrowTurret;
				// Creates detection circle that stays indicating a selected turret
				secondDetectionCircle.visible = true;
				secondDetectionCircle.x = selectedTurret.x;
				secondDetectionCircle.y = selectedTurret.y;
				mainDetectionCircle.visible = false;

				infoTrayMain.visible = true;

				if(arrowTurret.speed >= 1){
					speedUpgradeIcon1.visible = true;
				}
				if(arrowTurret.speed >= 2){
					speedUpgradeIcon2.visible = true;
				}
				if(arrowTurret.speed >= 3){
					speedUpgradeIcon3.visible = true;
				}
				if(arrowTurret.speed < 1){
					speedUpgradeIcon1.visible = false;
				}
				if(arrowTurret.speed < 2){
					speedUpgradeIcon2.visible = false;
				}
				if(arrowTurret.speed < 3){
					speedUpgradeIcon3.visible = false;
				}

				if(arrowTurret.damage == 2){
					damageUpgradeIcon1.visible = true;
					damageUpgradeIcon2.visible = true;
				}
				else{
					damageUpgradeIcon1.visible = false;
					damageUpgradeIcon2.visible = false;
				}

				if(arrowTurret.speed < 3){
					speedUpgradeText.visible = true;
				}
				if(arrowTurret.damage == 1){
					damageUpgradeText.visible = true;
				}

			}
		}, this);
		lazerTurrets.children.each(function(lazerTurret){
			if(Math.floor(lazerTurret.x/32) == tileX && Math.floor(lazerTurret.y/32) == tileY && lazerTurret.isAlive == true){
				selectedTurret = lazerTurret;
				// Creates detection circle that stays indicating a selected turret
				secondDetectionCircle.visible = true;
				secondDetectionCircle.x = selectedTurret.x;
				secondDetectionCircle.y = selectedTurret.y;
				mainDetectionCircle.visible = false;
			}
		}, this);
		fireTurrets.children.each(function(fireTurret){
			if(Math.floor(fireTurret.x/32) == tileX && Math.floor(fireTurret.y/32) == tileY && fireTurret.isAlive == true){
				selectedTurret = fireTurret;
				// Creates detection circle that stays indicating a selected turret
				secondFireDetectionCircle.visible = true;
				secondFireDetectionCircle.x = selectedTurret.x;
				secondFireDetectionCircle.y = selectedTurret.y;
				mainDetectionCircle.visible = false;
				fireDetectionCircle.visible = false;
			}

		}, this);
	}
	if(selectedTurret && tileChecker(tileX, tileY) == true && pointer.x <= 671){
		selectedTurret = undefined;
		sight.visible = false;
		secondDetectionCircle.visible = false;
		secondFireDetectionCircle.visible = false;
		hideTray();
	}
	if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 233 && pointer.y <= 283 && arrowFollow == false){
		// Clicked on arrow turret icon
		arrowFollow = true;
		sellFollow = false;
		lazerFollow = false;
		fireTurretFollow = false;
		mainDetectionCircle.visible = false;
		secondDetectionCircle.visible = false;
		hideTray();
		sight.visible = false;
		selectedTurret = undefined;
	}
	else if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 393 && pointer.y <= 442 && sellFollow == false){
		// Clicked on sell icon
		sellFollow = true;
		arrowFollow = false;
		lazerFollow = false;
		fireTurretFollow = false;
		mainDetectionCircle.visible = false;
		secondDetectionCircle.visible = false;
		hideTray();
		sight.visible = false;
		selectedTurret = undefined;

	}
	else if(pointer.x <= 762 && pointer.x >= 713 && pointer.y >= 312 && pointer.y <= 362 && lazerFollow == false){
		// Clicked on lazer icon
		sellFollow = false;
		arrowFollow = false;
		lazerFollow = true;
		fireTurretFollow = false;
		mainDetectionCircle.visible = false;
		secondDetectionCircle.visible = false;
		infoTrayMain.visible = false;
		speedUpgradeText.visible = false;
		damageUpgradeText.visible = false;
		sight.visible = false;
		selectedTurret = undefined;
	}
	else if(pointer.x <= 850 && pointer.x >= 800 && pointer.y >= 233 && pointer.y <= 282 && fireTurretFollow == false){
		// Clicked on fire turret icon
		sellFollow = false;
		arrowFollow = false;
		lazerFollow = false;
		fireTurretFollow = true;
		mainDetectionCircle.visible = false;
		secondDetectionCircle.visible = false;
		infoTrayMain.visible = false;
		speedUpgradeText.visible = false;
		damageUpgradeText.visible = false;
		sight.visible = false;
		selectedTurret = undefined;
	}
	else if(pointer.x <= 850 && pointer.x >= 800 && pointer.y >= 310 && pointer.y <= 360 && iceTurretFollow == false){
		iceTurretFollow = true;
		mainDetectionCircle.visible = false;
		secondDetectionCircle.visible = false;
		infoTrayMain.visible = false;
		speedUpgradeText.visible = false;
		damageUpgradeText.visible = false;
		sight.visible = false;
		selectedTurret = undefined;


	}
	else if(pointer.x >= 825 && pointer.x <= 938 && pointer.y >= 475 && pointer.y <= 650 && selectedTurret != undefined){
		// Allows for speed upgrade to be bought
		if(selectedTurret.speed < 3 && cash >= speedUpgradeCost){
			selectedTurret.speed++;
			selectedTurret.delay = arrowTurretDelays[selectedTurret.speed];
			cash -= speedUpgradeCost;
			cashText.setText('$' + cash);

		}
		//console.log(selectedTurret.speed);
	}
	else if(pointer.x >= 693 && pointer.x <= 809 && pointer.y >= 475 && pointer.y <= 650){
		// Allows for damage upgrade to be bought
		if(selectedTurret.damage == 1 && cash >= damageUpgradeCost){
			selectedTurret.damage = 2;
			cash -= damageUpgradeCost;
			cashText.setText('$' + cash);
			//damageUpgradeText.setText('DONE');
		}

	}
	else if(pointer.x >= 672){
		redDetectionCircle.visible = false;
		greenDetectionCircle.visible = false;

		resetButtonsExcept("");

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
	else if(fireTurretFollow){
		placeFire(pointer.x, pointer.y);
	}
	else if(iceTurretFollow){
		placeIce(pointer.x, pointer.y);
	}
	else{
		outside.lazerTurrets.children.each(function(lazerTurret){
			if(lazerTurret.isAiming){
				lazerTurret.isAiming = false;
				sight.visible = false;
				lazerTurret.sightX = pointer.x;
				lazerTurret.sightY = pointer.y;
			}
		}, this);
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
	xTile = Math.floor(x/32);
	yTile = Math.floor(y/32);
	if(cash >= arrowCost && tileChecker(xTile, yTile) == true && getTileID(xTile, yTile) == 15 && turretCount < maxTurretCount){ 	
		var arrowTurret = arrowTurrets.create(xTile*32 + 15, yTile*32 + 15, 'arrowTurret').setInteractive();
		arrowTurret.isAlive = true;
		arrowTurret.firingTimer = 0;
		var detectionCircle = detectionCircles.create(xTile*32 + 15, yTile*32 +15, 'detectionCircle').setInteractive();
		detectionCircle.visible = false;
		cash -= arrowCost;
		turretCount++;
		resetText();
		arrowTurret.speed = 0; // Sets firing speed to default
		arrowTurret.delay = 5000;
		arrowTurret.damage = 1;
	}
}
function resetText(){
	cashText.setText('$' + cash);
	turretCountText.setText('Turrets: ' + turretCount + '/' + maxTurretCount);
}

function hideTray(){
	infoTrayMain.visible = false;
	damageUpgradeText.visible = false;
	speedUpgradeText.visible = false;

	damageUpgradeIcon1.visible = false;
	damageUpgradeIcon2.visible = false;
	speedUpgradeIcon1.visible = false;
	speedUpgradeIcon2.visible = false;
	speedUpgradeIcon3.visible = false;

}

function placeLazer(x, y){
	xTile = Math.floor(x/32);
	yTile = Math.floor(y/32);
	if(cash >= lazerCost && tileChecker(xTile, yTile) == true && getTileID(xTile, yTile) == 15 && turretCount < maxTurretCount){   
		var lazerTurret = lazerTurrets.create(xTile*32 + 15, yTile*32 + 15, 'lazerTurret').setInteractive();
		lazerTurret.anims.play('lazerInitial', true);
		lazerTurret.isAlive = true;
		lazerTurret.isAiming = true; //makes turret aim to mouse
		lazerTurret.firingTimer = 0;
		var detectionCircle = detectionCircles.create(xTile*32 + 15, yTile*32 +15, 'detectionCircle').setInteractive();
		detectionCircle.visible = false;
		cash -= lazerCost;
		cashText.setText('$' + cash);

		lazerFollow = false;
		greenDetectionCircle.visible = false;
		redDetectionCircle.visible = false;
		lazerTurretButton.x = 23*32;
		lazerTurretButton.y = 10.5*32;

		lazerTurret.isLazer = true; 

		turretCount++;
		resetText();

	}
}

function placeFire(x, y){
	var canPlace = true;
	xTile = Math.floor(x/32);
	yTile = Math.floor(y/32);
	if(cash >= fireCost && tileChecker(xTile, yTile) == true && getTileID(xTile, yTile) == 15 && turretCount < maxTurretCount){   
		var fireTurret = fireTurrets.create(xTile*32+15, yTile*32+15, 'fireTurret').setInteractive();
		fireTurret.anims.play('fireTurretInitial', true);
		fireTurret.isAlive = true;
		fireTurret.firingTimer = 0;
		var detectionCircle = detectionCircles.create(xTile*32+15, yTile*32+15, 'detectionCircle').setInteractive();
		detectionCircle.visible = false;
		cash -= fireCost;
		cashText.setText('$' + cash);

		fireTurret.isFire = true; 

		turretCount++;
		resetText();
	}
}

function placeIce(x, y){
	var canPlace = true;
	xTile = Math.floor(x/32);
	yTile = Math.floor(y/32);
	if(cash >= iceCost && tileChecker(xTile, yTile) == true && getTileID(xTile, yTile) == 15 && turretCount < maxTurretCount){   
		var iceTurret = iceTurrets.create(xTile*32+15, yTile*32+15, 'iceTurret').setInteractive();
		iceTurret.isAlive = true;
		iceTurret.firingTimer = 0;
		var detectionCircle = detectionCircles.create(xTile*32+15, yTile*32+15, 'detectionCircle').setInteractive();
		detectionCircle.visible = false;
		cash -= iceCost;
		cashText.setText('$' + cash);

		iceTurret.isIceTurret = true; 
		iceTurret.delay = 5000;

		turretCount++;
		resetText();
	}

}


function sellTurret(tileX, tileY){
	this.arrowTurrets.children.each(function(arrowTurret){
		if(Math.floor(arrowTurret.x/32) == tileX && Math.floor(arrowTurret.y/32) == tileY && arrowTurret.isAlive == true){
			arrowTurret.destroy();
			arrowTurret.isAlive = false;
			cash += Math.floor(arrowCost*0.8);
			mainDetectionCircle.visible = false;
			turretCount--;
			resetText();
		}
	}, this);
	this.lazerTurrets.children.each(function(lazerTurret){
		if(Math.floor(lazerTurret.x/32) == tileX && Math.floor(lazerTurret.y/32) == tileY && lazerTurret.isAlive == true){
			lazerTurret.destroy();
			lazerTurret.isAlive = false;
			cash += Math.floor(lazerCost*0.8);
			mainDetectionCircle.visible = false;
			turretCount--;
			resetText();
		}
	}, this);
	this.fireTurrets.children.each(function(fireTurret){
		if(Math.floor(fireTurret.x/32) == tileX && Math.floor(fireTurret.y/32) == tileY && fireTurret.isAlive == true){
			fireTurret.destroy();
			fireTurret.isAlive = false;
			cash += Math.floor(fireCost*0.8);
			mainDetectionCircle.visible = false;
			turretCount--;
			resetText();
		}
	}, this);
	this.iceTurrets.children.each(function(iceTurret){
		if(Math.floor(iceTurret.x/32) == tileX && Math.floor(iceTurret.y/32) == tileY && iceTurret.isAlive == true){
			iceTurret.destroy();
			iceTurret.isAlive = false;
			cash += Math.floor(iceCost*0.8);
			mainDetectionCircle.visible = false;
			turretCount--;
			resetText();
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
	}, this);
	this.lazerTurrets.children.each(function(lazerTurret){
		if(Math.floor(lazerTurret.x/32) == tileX && Math.floor(lazerTurret.y/32) == tileY && lazerTurret.isAlive == true){
			able = false;
		}
	}, this);
	this.fireTurrets.children.each(function(fireTurret){
		if(Math.floor(fireTurret.x/32) == tileX && Math.floor(fireTurret.y/32) == tileY && fireTurret.isAlive == true){
			able = false;
		}
	}, this);
	if(able){
		return true;
	}
	else{
		return false;
	}
}


function spawnEnemy(type){
	if(type == 1 && mainEnemies.countActive(true) <= 20){
		if(wave > 3 && spawnRight){
			var mainEnemy = mainEnemies.create(20*32, 32, 'enemy');
			spawnRight = false;
		}
		else if(spawnRight == false){
			var mainEnemy = mainEnemies.create(0, 32, 'enemy');
			if(wave > 3){
				spawnRight = true;
			}
		}

		mainEnemy.body.immovable = true;
		mainEnemy.collideWorldBounds = true;
		mainEnemy.onOutOfBoundsKill = true;
		mainEnemy.anims.play('red', true);
		mainEnemy.hp = 1;
		mainEnemy.speed = 800;

		mainEnemy.invulnTimer = create.time.now;
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

		if(!spawnRight){
			mainEnemy.spawn = "left";
			movement(mainEnemy, 640, 608);
		}
		else {
			mainEnemy.spawn = "right";
			movement(mainEnemy, 10, 608);
		}
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
					if(arrowTurret.speed == 0){
						arrowTurret.anims.play('arrowCharge', true);
					}
					else if(arrowTurret.speed == 1){
						arrowTurret.anims.play('arrowChargeSpeed1', true);
					}

					else if(arrowTurret.speed == 2){
						arrowTurret.anims.play('arrowChargeSpeed2', true);
					}

					else if(arrowTurret.speed == 3){
						arrowTurret.anims.play('arrowChargeSpeed3', true);
					}

					var bullet = bullets.create(arrowTurret.x, arrowTurret.y, 'bullet');
					bullet.checkWorldBounds = true;
					bullet.outOfBoundsKill = true;
					bullet.setDepth(1);
					bullet.setOrigin(0, 0.5);
					var dx = Math.cos(angle);
					var dy = Math.sin(angle);
					bullet.body.velocity.x = dx*1000;
					bullet.body.velocity.y = dy*1000;

					bullet.damage = arrowTurret.damage;

					arrowTurret.firingTimer = create.time.now + arrowTurret.delay;
				}


			}

		}
	}, this); 
	if(checkIfAllDead() == true){
		changeLevel();
	}

};
function iceTurretFire(){

	this.iceTurrets.children.each(function(iceTurret){
		if(iceTurret.isAlive){
			var enemy = getEnemy(iceTurret.x, iceTurret.y, 64);
			if(enemy) {
				// Fires Bullet
				if(create.time.now > iceTurret.firingTimer){
					this.mainEnemies.children.each(function(mainEnemy){
						if(Math.abs(mainEnemy.x - iceTurret.x) < 64 && Math.abs(mainEnemy.y - iceTurret.y) < 64){
							mainEnemy.speed = 1200;
							if(mainEnemy.spawn == "left"){
								movement(mainEnemy, 640, 608);
							}
							else{
								movement(mainEnemy, 10, 608);
							}
						}
					}, this);
					iceTurret.firingTimer = create.time.now + iceTurret.delay;
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


				var angle = Phaser.Math.Angle.Between(lazerTurret.x, lazerTurret.y, enemy.x, enemy.y);
				//lazerTurret.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;


				if(create.time.now > lazerTurret.firingTimer && lazerTurret.isAiming == false){
					lazerTurret.anims.play('lazerCharge', true);
					var lazer = lazers.create(lazerTurret.x, lazerTurret.y, 'lazer');
					lazer.checkWorldBounds = true;
					lazer.outOfBoundsKill = true;
					lazer.setDepth(1);
					lazer.setOrigin(0, 0);
					/*
							var dx = 0.2 + Math.cos(angle);
							var dy = 0.2 + Math.sin(angle);
							*/
					var dx = Math.cos(lazerTurret.initAngle);
					var dy = Math.sin(lazerTurret.initAngle);
					lazer.body.velocity.x = dx*1000;
					lazer.body.velocity.y = dy*1000;
					lazerTurret.firingTimer = create.time.now + 12250;
				}
			}
		}
	}, this);
};

function fireTurretFire(){
	this.fireTurrets.children.each(function(fireTurret){
		var enemy = getEnemy(fireTurret.x, fireTurret.y, 150);
		if(enemy){

			if(create.time.now > fireTurret.firingTimer && fireTurret.isAlive == true){
				fireTurret.anims.play('fireTurretFire', true);
				fireTurret.firingTimer = create.time.now + 6000;
				outside.mainEnemies.children.each(function(enemy){
					if(Phaser.Math.Distance.Between(enemy.x, enemy.y, fireTurret.x, fireTurret.y) <= 150){
						// Changes enemy to the next enemy within area
						enemy = getEnemy(fireTurret.x, fireTurret.y, 150);
						// Takes away 2 health points and checks to see if it kills enemy
						enemy.hp -= 2;
						checkHp(enemy);

						cash += 5;
						cashText.setText('$' + cash);
						resetText();

					}
				}, this);

			}
		}
	}, this);
}
function changeLevel(){
	wave++;
	waveText.setText('Wave ' + wave);
	addedEnemies += 2;
	enemiesLeft = 10 + addedEnemies;
}

function checkHp(enemy){
	if(enemy.hp <= 0){
		enemy.destroy();
		enemy.isAlive = false;
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
}


function bulletCollision(bullet, enemy){
	bullet.setActive(false);
	bullet.destroy();
	cashText.setText('$' + cash);
	if(enemy.hp == 1){
		enemy.hp--;
		cash += 5;
	}
	else{
		enemy.hp = enemy.hp - bullet.damage;
		cash = cash + (5*bullet.damage);
	}
	checkHp(enemy);
	resetText();
};
function lazerCollision(lazer, enemy){
	if(enemy.invulnTimer < create.time.now){
		cash += 5;
		cashText.setText('$' + cash);
		enemy.hp--;

		if(enemy.hp > 0){
			cash += 5;
			cashText.setText('$' + cash);
			enemy.hp--;
		}

		checkHp(enemy);
		enemy.invulnTimer = create.time.now + 500;
	}
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
function movement(player, x, y){
	//var x = 640;
	//var y = 608;
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
			speed = player.speed;
			//console.log(path);
			moveCharacter(path, player, speed);
		}
	});
	finder.calculate();
};

function moveCharacter(path, enemy, speed){
	// Sets up a list of tweens, one for each tile to walk, that will be chained by the timeline
	var tweens = [];
	for(var i = 0; i < path.length-1; i++){
		var ex = path[i+1].x;
		var ey = path[i+1].y;
		tweens.push({
			//targets: Game.player,
			targets: enemy,
			x: {value: ex*map.tileWidth, duration: speed},
			y: {value: ey*map.tileHeight, duration: speed}
		});
	}
	game.tweens.timeline({
		tweens: tweens
	});
};
