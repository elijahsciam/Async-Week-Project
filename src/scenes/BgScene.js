import 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    this.load.image('japan', 'assets/backgrounds/japan.png');
  }

  create() {
    this.add.image(0, 0, 'japan').setOrigin(0).setSize(800, 600).setScale(0.6);
  }
}
