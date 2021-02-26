import Player from '../entity/Player';
import Ground from '../entity/Ground';
import Ramen from '../entity/Ramen';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
  }

  preload() {
    this.load.spritesheet('josh', 'assets/spriteSheets/josh.png', {
      frameWidth: 340,
      frameHeight: 460,
    });

    this.load.image('ground', 'assets/sprites/platform.png');

    this.load.image('ramen', 'assets/sprites/ramen.gif', {
      frameWidth: 150,
      frameHeight: 200,
    });

    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  createGround(x, y) {
    this.groundGroup.create(x, y, 'ground');
  }

  create() {
    //Entities
    this.player = new Player(this, 50, 200, 'josh').setScale(0.25);
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.createAnimations();
    this.createGround(670, 175);
    this.createGround(70, 375);
    this.createGround(370, 275);
    this.ramen = new Ramen(this, 670, 50, 'ramen').setScale(0.5);
    let scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      fill: '#000',
    });

    function collectRamen(player, ramen) {
      let score = 0;
      this.ramen.disableBody(true, true);
      score += 5;
      scoreText.setText('Score:' + score);
    }
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create sounds
    // << CREATE SOUNDS HERE >>
    //Collisions
    this.physics.add.collider(this.player, this.groundGroup);
    this.physics.add.collider(this.ramen, this.groundGroup);
    this.physics.add.overlap(this.player, this.ramen, collectRamen, null, this);
  }

  createAnimations() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('josh', { start: 17, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'jump',
      frames: [{ key: 'josh', frame: 17 }],
      frameRate: 20,
    });
    this.anims.create({
      key: 'idleUnarmed',
      frames: [{ key: 'josh', frame: 11 }],
      frameRate: 10,
    });
    this.anims.create({
      key: 'idleArmed',
      frames: [{ key: 'josh', frame: 6 }],
      frameRate: 10,
    });
  }
  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    this.player.update(this.cursors);
  }
}
