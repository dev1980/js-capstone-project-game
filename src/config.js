import Phaser from 'phaser';
import GameScene from './GameScene';
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: GameScene,
    physics: {
        default: 'arcade',
        }
};

export { config }