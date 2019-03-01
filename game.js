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
var cursors;      // Control events
const PLAYER_SPEED = 160;
var stars

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

  // Create list of static physics objects
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // bottom = twice as large
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  platforms.create(-195, 45, 'ground').setOrigin(0, 0).refreshBody();   // Need to refresh physics body

  // Creating a player
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);

  // Stop from falling through bottom of scene
  // Does not stop from falling through platforms
  player.setCollideWorldBounds(true);

  // Add gravity to the player
  player.body.setGravityY(300);   // body is ref to physics body

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

  // Add collision detection between player and platforms.
  // Bit of automagic that create separation
  // The effect of this will be that player will not
  // pass through platforms anymore
  this.physics.add.collider(player, platforms);

  // Register events for keyboard
  cursors = this.input.keyboard.createCursorKeys();

  // Create dynamic group of star physics bodies
  // No static because they are dropped from the air, so they move
  // Spawns all the stars in a row at the top of the screen
  // But they are dynamic and thus affected by gravity, making them fall.
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,   // 12 in total
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  // Each star is given a random bounce value between 0.4 and 0.8
  stars.children.iterate(function (child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  // Make the stars collide with the platforms, so they dont fall through
  this.physics.add.collider(stars, platforms);
}

function update () {
  // Check for keyboard events
  if (cursors.left.isDown) {
      player.setVelocityX(-PLAYER_SPEED);
      player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
      player.setVelocityX(PLAYER_SPEED);
      player.anims.play('right', true);
  }
  else {
      player.setVelocityX(0);
      player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-500);  // Jump if standing on something
  }
}