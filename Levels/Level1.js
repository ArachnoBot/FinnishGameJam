import Phaser from "phaser"
import woolPath from "../Assets/Level1/wool.png"
import bgPath from "../Assets/Level1/level1Background.png"

let settings;
let config;

export default class Level1 extends Phaser.Scene {
  constructor() {
      super("Level1")
  }

  preload() {
    this.load.image("woolPiece", woolPath)
    this.load.image("bg", bgPath)
  }

  create(data) {
    config = data.config
    settings = data.settings

    this.add.image(config.width / 2, config.height / 2, "bg")

    this.woolPieces = this.physics.add.group({
      classType: WoolPiece,
      runChildUpdate: true
    })

    this.triggerTimer = this.time.addEvent({
      callback: this.spawnWool,
      callbackScope: this,
      delay: 100,
      loop: true
    })
  }

  update(time, delta) {
    
  }

  spawnWool() {
    const x = config.width*0.05 + Math.random()*config.width*0.9

    this.woolPiece = this.woolPieces.get()
    if (this.woolPiece) {
      this.woolPiece.setPosition(x, -10)
    }
  }
}


class WoolPiece extends Phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    super(scene, 0, 0, "woolPiece")
    this.lifespan = 5000
    this.speed = 0.5
    this.currentRotation = 0
    this.setScale(2)
  }

  preUpdate(time, delta) {
    this.currentRotation += 0.1
    this.setRotation(this.currentRotation)
    super.preUpdate(time, delta);
    this.lifespan -= delta;
    this.y += this.speed * delta;

    if (this.lifespan <= 0) {
      console.log("wool destroyed")
      this.destroy();
    }
  }
}