import Phaser from "phaser"
import woolPath from "../Assets/Level1/wool.png"

let settings;
let config;

export default class Level1 extends Phaser.Scene {
  constructor() {
      super("Level1")
  }

  preload() {
    this.load.image("woolPiece", woolPath)
  }

  create(data) {
    config = data.config
    settings = data.settings

    this.woolPieces = this.physics.add.group({
      classType: WoolPiece,
      runChildUpdate: true
    })

    this.triggerTimer = this.time.addEvent({
      callback: this.spawnWool,
      callbackScope: this,
      delay: 1000,
      loop: true
    });
  }

  update(time, delta) {
    
  }

  spawnWool() {
    this.woolPiece = this.woolPieces.get();
    if (this.woolPiece) {
        console.log("wool piece created")
    }
  }
}


class WoolPiece extends Phaser.Physics.Arcade.Sprite {
  constructor (scene){
    super(scene, 0, 0, "woolPiece")
    this.lifespan = 1000
    this.speed = 2
    this.setPosition(100, 0)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.lifespan -= delta;
    this.y += this.speed * delta;

    if (this.lifespan <= 0) {
      console.log("wool destroyed")
      this.destroy();
    }
  }
}