import Phaser from "phaser"

let settings;
let config;

export default class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2")
    }

    preload() {

    }

    create(data) {
      config = data.config
      settings = data.settings
      this.lastPress = Date()

      const pressDelay = 1000

      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    }

    update(time, delta) {
      if (this.keyA.isDown) {
        console.log("A pressed")
      }
      else if (this.keyD.isDown) {
        console.log("D pressed")
      }
      else if (this.keyW.isDown) {
        console.log("W pressed")
      }
      else if (this.keyS.isDown) {
        const time = new Date().getTime()

        console.log("S: " + time)
      }
    }

    
}


class YarnBall extends Phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    super(scene, 0, 0, "woolPiece")
    this.lifespan = 5000
    this.setScale(1.5)
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.lifespan -= delta;
    
    if (this.lifespan <= 0) {
      console.log("wool destroyed")
      this.destroy();
    }
  }
}