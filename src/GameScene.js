import { Scene } from 'phaser';

class GameScene extends Scene {
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('player', 'assets/player.png');
  }

  create() {
    const sky = this.add.image(0, 0, 'sky');
    sky.setOrigin(0, 0);
    this.createPlatforms();
    this.createPlayer();
    this.createCoin();
    this.score = 0;
    const style = { font: '20px Arial', fill: '#fff' };
    this.scoreText = this.add.text(20, 20, `score: ${this.score}`, style);
    this.arrow = this.input.keyboard.createCursorKeys();
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.physics.add.collider(this.player, this.platforms);
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
  }

  createCoin() {
    this.coin = this.physics.add.sprite(200, 450, 'coin');
  }

  update() {
    if (this.physics.overlap(this.player, this.coin)) {
      this.collect();
    }
    if (this.arrow.right.isDown) {
      this.player.x += 3;
    } else if (this.arrow.left.isDown) {
      this.player.x -= 3;
    }

    if (this.arrow.down.isDown) {
      this.player.y += 3;
    } else if (this.arrow.up.isDown) {
      this.player.y -= 3;
    }
  }

  collect() {
    this.coin.x = Phaser.Math.Between(100, 600);
    this.coin.y = Phaser.Math.Between(100, 200);

    this.score += 10;
    this.scoreText.setText(`score: ${this.score}`);
  }
}

export default GameScene;