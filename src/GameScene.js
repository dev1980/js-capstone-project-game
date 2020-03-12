import { Scene } from 'phaser';

class GameScene extends Scene {
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('player', 'assets/player.png');
  }

  
}

export default GameScene;