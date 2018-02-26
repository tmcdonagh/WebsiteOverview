var playState = {
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //this.game.plugins.add(PhaserNavmesh);

    //possibly add:
    //pause button
    //unpause
    //icons
    /* Land Tile Sprite and Boundaries */
    game.world.setBounds(-1000, -1000, 2000, 2000);
    land = game.add.tileSprite(0, 0, 800, 600, 'earth');
    land.fixedToCamera = true;

    /* Controls */
    this.cursors = game.input.keyboard.createCursorKeys();
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    gKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
    fKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    /* Initialize Physics */
    game.physics.startSystem(Phaser.Physics.ARCADE);

    /* Initialize Player */
    player = game.add.sprite(0, 0, 'player');
    player.anchor.set(0.5, 0.5);

    /* Camera Stuff */
    game.camera.follow(player);
    //game.camera.deadzone = new Phaser.Rectangle(15, 15, 50, 30);
    game.camera.focusOnXY(0, 0);

    /* Should Stop Player From Going Off Edge (?) */
    player.bringToTop();
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.immovable = false;
    player.body.checkWorldBounds = true;
    player.body.collideWorlBounds = true;
    player.body.bounce.setTo(1);

    /* Initialize Zombies */
    zombies = game.add.group();
    zombies.enableBody = true;
    zombies.physicsBodyType = Phaser.Physics.ARCADE;

    /* Game Physics */
    //game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.enable(zombies, Phaser.Physics.ARCADE);

    /* Bullets */
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
  

    /* Detection Circle */
    detectionCircles = game.add.group();
    detectionCircles.enableBody = true;
    detectionCircles.physicsBodyType = Phaser.Physics.ARCADE;
    detectionCircles.createMultiple(30, 'detectionCircle');

    /* Path Finder */
    /*
    const navMeshPlugin = this.game.plugins.add(phaserNavmesh);
    const navMesh = navMeshPlugin.buildMeshFromTiled(tilemap, "navmesh", 12.5);

    const p1 = new Phaser.Point(100, 400);
    const p2 = new Phaser.Point(700, 200);
    const path = navMeshPlugin.findPath(p1, p2);
    */
    startGame();
  },

  update: function(){
    game.debug.text('$' + cash, 32, 32);
    if(playing){
      /* Movement */
      if((wKey.isDown || this.cursors.up.isDown) && player.y > -950){
        player.body.velocity.y = -speed;
      }
      else if((sKey.isDown || this.cursors.down.isDown) && player.y < 950){
        player.body.velocity.y = speed;
      }
      else{
        player.body.velocity.y = 0;
      }
      if((aKey.isDown || this.cursors.left.isDown) && player.x > -950){
        player.body.velocity.x = -speed;
      }
      else if((dKey.isDown || this.cursors.right.isDown) && player.x < 950){
        player.body.velocity.x = speed;
      }
      else{
        player.body.velocity.x = 0;
      }
      
      if(zombies.countLiving() < spawnCount && spawnTimer < game.time.now){
        spawnTimer = game.time.now + 20000;
        createZombies();
      }

      /* Firing */
      player.rotation = game.physics.arcade.angleToPointer(player) + 1.55 ;
      if(spaceKey.isDown){
        fireBullet();
      }
      /* Spawns Zombies With Key Press */
      if(gKey.isDown){
        createZombies();
      }
      zombies.forEachAlive(function(zombie){
        game.physics.arcade.moveToObject(zombie, player, 120);
      });
      land.tilePosition.x = -game.camera.x;
      land.tilePosition.y = -game.camera.y;

      /* Collisions */
      game.physics.arcade.overlap(bullets, zombies, collisionHandler, null, this);
    }
  }
};

