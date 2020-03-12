import { Scene } from 'phaser';

class GameScene extends Scene {
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('player', 'assets/player.png');
  }

  create() {
    const sky = this.add.image(0, 0, 'sky');
    sky.setOrigin(0, 0);
    this.createPlatforms();
    
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
}

}

export default GameScene;