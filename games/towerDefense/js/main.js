var config = {
    type: Phaser.AUTO,
    width: 30*32,
    height: 21*32,
    parent: 'game',
    scene: [Game]
};

var game = new Phaser.Game(config);
