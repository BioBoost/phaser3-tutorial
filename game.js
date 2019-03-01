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
var platforms;    // Static Physics Groups (dont move but can collide)

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

  this.add.image(440, 350, 'star');
  this.add.image(30, 30, 'star');

  // Create list of static physics objects
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // bottom = twice as large
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  platforms.create(-184, 45, 'ground').setOrigin(0, 0);

  // Creating a player
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);

  // Stop from falling through bottom of scene
  // Does not stop from falling through platforms
  player.setCollideWorldBounds(true);

  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
  });
}

function update () {
}