var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);

function preload () {
  // Assets are accessible via asset key: sky, ground, ...
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');

  // Spritesheet of the player character
  this.load.spritesheet('dude', 
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );
}

function create () {
  // Center of asset is anchor by default
  // Topleft of screen = (0, 0)
  // Anchor can be moved using setOrigin
  this.add.image(0, 0, 'sky').setOrigin(0, 0);

  this.add.image(400, 300, 'star');   // Center of screen
}

function update () {
}