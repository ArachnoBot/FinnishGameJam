import Phaser from "phaser"
import ballDownPath from "../Assets/Level2/yarnball_down.png"
import ballLeftPath from "../Assets/Level2/yarnball_left.png"
import ballRightPath from "../Assets/Level2/yarnball_right.png"
import ballUpPath from "../Assets/Level2/yarnball_up.png"
import bgPath from "../Assets/Level2/background.png"

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
      this.load.image("bg", bgPath)
    }

    create(data) {
      config = data.config
      settings = data.settings
      this.barMaxWidth = 800
      this.lastSlot = 0
      this.playTime = 25
      this.finished = false
      this.ballArray = []
      this.ballVelocity = 800
      this.pressDelay = (this.ballVelocity/800)*1350

      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

      this.keyA.on("down", () => {this.handleKeystroke("left")})
      this.keyD.on("down", () => {this.handleKeystroke("right")})
      this.keyW.on("down", () => {this.handleKeystroke("up")})
      this.keyS.on("down", () => {this.handleKeystroke("down")})

      this.add.image(config.width / 2, config.height / 2, "bg").setDepth(0)
      this.outlineGraphics = this.add.graphics(2).setDepth(2)
      this.barGraphics = this.add.graphics().setDepth(1)

      this.outlineGraphics.lineStyle(6, 0xaaaaaa)
      this.bar = this.outlineGraphics.strokeRoundedRect(1050, 40, 800, 80)

      this.createBallAnims()

      this.yarnBalls = this.physics.add.group({
        classType: YarnBall,
        runChildUpdate: true
      })

      this.ballTrigger = this.time.addEvent({
        callback: this.spawnBall,
        callbackScope: this,
        delay: 1000,
        loop: true
      })

      setTimeout(() => {
        this.ballTrigger.delay = 800
        this.ballVelocity = 1000
        this.pressDelay = (this.ballVelocity/800)*1350
        console.log("done")
      }, 5000)
      
      setTimeout(() => {
        console.log("done2")
        this.ballTrigger.delay = 500
        this.ballVelocity = 1200
        this.pressDelay = (this.ballVelocity/1200)*1350
      }, 10000)
    }

    update(time, delta) {      
      if (!this.finished && this.playTime > 800) {
        this.triggerEnding()
      } 
      else if (!this.finished && this.playTime <= 800) {
        this.barGraphics.clear()
        //console.log(this.playTime)
        this.barGraphics.fillStyle("0x34ebdf", 1)
        this.bar = this.barGraphics.fillRoundedRect(1050, 40, this.playTime, 78)
        this.playTime += 0.2
      }
    }

    handleKeystroke(slot) {
      const ballArray = this.yarnBalls.getChildren()
      if (ballArray.length > 0) {
        const ball = ballArray[0]
        const delay = new Date() - ball.initTime
        console.log(Math.abs(delay -this.pressDelay), ball.slot)
        if (ball.slot == slot && Math.abs(delay - this.pressDelay) <= settings.maxDelay) {
          this.playTime += 5
        } else {
          this.playTime -= 5
        }
        ball.destroy()
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

    spawnBall(velocity) {
      let slot = Math.round(Math.random()*3)
      while (slot == this.lastSlot) {
        slot = Math.round(Math.random()*3)
      }
      this.lastSlot = slot

      let x = 0
      let animStr = ""
      const slots = ["left", "down", "up", "right"]
      if (slot == 0) {
        x = 120
        animStr = "ballLeftAnim"
      }
      else if (slot == 1) {
        x = 370
        animStr = "ballDownAnim"
      }
      else if (slot == 2) {
        x = 615
        animStr = "ballUpAnim"
      }
      else if (slot == 3) {
        x = 860
        animStr = "ballRightAnim"
      }
      let yarnBall = this.yarnBalls.get()
      if (yarnBall) {
        yarnBall.setPosition(x, -200)
        yarnBall.setScale(1)
        yarnBall.body.setVelocity(0, this.ballVelocity)
        yarnBall.slot = slots[slot]
        yarnBall.anims.play(animStr)
      }
    }

    triggerEnding() {

      this.finished = true
    }
}


class YarnBall extends Phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    super(scene, 0, 0, "YarnBall")
    this.lifespan = 1700
    this.setScale(1.5)
    this.initTime = new Date()
    this.slot = ""
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.lifespan -= delta;
    
    if (this.lifespan <= 0) {
      //console.log("ball destroyed")
      this.destroy()
    }
  }
}