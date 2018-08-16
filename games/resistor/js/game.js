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

function preload(){
  game = this;
}


function create(){

  create = this; 

}
/* ***** End of Create function ***** */

function update(){

}

/* ***** End of Update Function ***** */

