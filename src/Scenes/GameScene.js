/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
import Phaser from 'phaser';
// import Button from '../Objects/Button';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
    this.gameOver = false;
    this.score = 0;
    this.userName;
  }

  preload() {
    // load images
    this.load.image('logo', '../../assets/logo.png');
    this.load.image('sky', '../../assets/sky.png');
    this.load.image('ground', '../../assets/platform.png');
    this.load.image('coin', '../../assets/coin.png');
    this.load.image('bomb', '../../assets/bomb.png');
    this.load.image('player', '../../assets/player.png');
    this.load.html('userInput', '../../assets/inputUser.html');
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.createPlatforms();
    this.createPlayer();
    this.createCoin();
    this.createBombs();
    const style = { font: '20px Arial', fill: '#fff' };
    this.scoreText = this.add.text(20, 20, `score: ${this.score}`, style);
    this.arrow = this.input.keyboard.createCursorKeys();
    this.gameOverText = this.add.text(400, 250, 'Game Over', { fontSize: '32px', fill: '#000' });
    this.gameOverText.visible = false;
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
  }

  createCoin() {
    this.coin = this.physics.add.sprite(200, 450, 'coin');
    this.physics.add.collider(this.coin, this.platforms);
    this.coin.setBounce(0.2);
    this.coin.setCollideWorldBounds(true);
  }

  createBombs() {
    this.bombs = this.physics.add.group();
    const bomb = this.bombs.create(200, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setGravity(200);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-300, 400), 20);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
  }

  hitBomb(player) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
    this.gameOverText.visible = true;
    this.inputForm();
    this.uploadScore();
  }

  inputForm() {
    this.userName = prompt('Enter your name:');
  }

  async uploadScore() {
    const playerScore = {
      user: this.userName,
      score: this.score,
    };
    try {
      const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/quDNZqIoDEWvWqkfQrOG/scores/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(playerScore),
      });
      const apiresult = await result.json();
      if (apiresult) {
        this.scene.start('Score');
      }
      return apiresult;
    // eslint-disable-next-line no-empty
    } catch (error) {
    }
    return undefined;
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
