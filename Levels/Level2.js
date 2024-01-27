import Phaser from "phaser"
import ballDownPath from "../Assets/Level2/yarnball_down.png"
import ballLeftPath from "../Assets/Level2/yarnball_left.png"
import ballRightPath from "../Assets/Level2/yarnball_right.png"
import ballUpPath from "../Assets/Level2/yarnball_up.png"

let settings;
let config;

export default class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2")
    }

    preload() {
      this.load.spritesheet("ballDown", ballDownPath, {frameWidth: 181, frameHeight: 335 })
      this.load.spritesheet("ballLeft", ballLeftPath, {frameWidth: 181, frameHeight: 335 })
      this.load.spritesheet("ballRight", ballRightPath, {frameWidth: 181, frameHeight: 335 })
      this.load.spritesheet("ballUp", ballUpPath, {frameWidth: 181, frameHeight: 335 })
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

      this.yarnBalls = this.physics.add.group({
        classType: YarnBall,
        runChildUpdate: true
      })

      this.createBallAnims()

      const ball1 = this.dropYarnBall("left")
      const ball2 = this.dropYarnBall("down")
      const ball3 = this.dropYarnBall("up")
      const ball4 = this.dropYarnBall("right")
      
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

    createBallAnims () {
      this.anims.create({
        key: "ballLeftAnim",
        frames: this.anims.generateFrameNumbers("ballLeft", {start: 0, end : 1}),
        frameRate: 4,
        repeat: -1
      })
      this.anims.create({
        key: "ballRightAnim",
        frames: this.anims.generateFrameNumbers("ballRight", {start: 0, end : 1}),
        frameRate: 4,
        repeat: -1
      })
      this.anims.create({
        key: "ballDownAnim",
        frames: this.anims.generateFrameNumbers("ballDown", {start: 0, end : 1}),
        frameRate: 4,
        repeat: -1
      })
      this.anims.create({
        key: "ballUpAnim",
        frames: this.anims.generateFrameNumbers("ballUp", {start: 0, end : 1}),
        frameRate: 4,
        repeat: -1
      })
    }

    dropYarnBall(slot) {
      let x = 0;
      let animStr = ""
      if (slot == "left") {
        x = 100
        animStr = "ballLeftAnim"
      }
      else if (slot == "down") {
        x = 200
        animStr = "ballDownAnim"
      }
      else if (slot == "up") {
        x = 300
        animStr = "ballUpAnim"
      }
      else if (slot == "right") {
        x = 400
        animStr = "ballRightAnim"
      }
      let yarnBall = this.yarnBalls.get()
      if (yarnBall) {
        yarnBall.setPosition(x, 0)
        yarnBall.setScale(0.5)
        yarnBall.body.setVelocity(0, 700)
        yarnBall.anims.play(animStr)
      }
      return yarnBall
    }
}


class YarnBall extends Phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    super(scene, 0, 0, "YarnBall")
    this.lifespan = 5000
    this.setScale(1.5)
    this.initTime = new Date().getTime()
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.lifespan -= delta;
    
    if (this.lifespan <= 0) {
      console.log("ball destroyed")
      this.destroy();
    }
  }
}