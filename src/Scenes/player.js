import 'phaser';

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, player, name, cursor) {
    super(scene, x, y, player, name);
    this.name = name;
    scene.physics.world.enableBody(this);
    scene.add.existing(this);
    this.scene = scene;
    this.cursor = cursor;
    //this.setBounce(0.2);
    //this.setCollideWorldBounds(true);
  }

  getname() {
    return this.name;
  }

  update() {
    if (this.cursor.right.isDown) {
      this.x += 3;
    } else if (this.cursor.left.isDown) {
      this.x -= 3;
    }

    if (this.cursor.down.isDown) {
      this.y += 3;
    } else if (this.cursor.up.isDown) {
      this.y -= 3;
    }
  }
}