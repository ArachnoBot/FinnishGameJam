import Phaser from "phaser"
import woolPath from "../Assets/Level1/wool.png"
import bgPath from "../Assets/Level1/background.png"
import basketPath from "../Assets/Level1/basket.png"
import sheepPath from "../Assets/Level1/sheepSheet.png"


let settings;
let config;

export default class Level1 extends Phaser.Scene {
  constructor() {
      super("Level1")
  }

  preload() {
    this.load.image("woolPiece", woolPath)
    this.load.image("bg", bgPath)
    this.load.image("basket", basketPath)
    this.load.spritesheet("sheepSheet", sheepPath, {frameWidth: 860, frameHeight: 555 });
  }

  create(data) {
    config = data.config
    settings = data.settings
    let woolCaught = 0
    this.finished = false

    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.add.image(config.width / 2, config.height / 2, "bg").setDepth(0)
    this.physics.world.setBounds(0, 0, config.width, config.height);
    this.basket = this.createBasket()
    let woolText = this.add.text(config.width - 600, 16, 'Wool caught: 0', { fontFamily: "Georgia", fontSize: 80, fill: '#ffffff' });
    this.playSheepAnim()

    this.woolPieces = this.physics.add.group({
      classType: WoolPiece,
      runChildUpdate: true
    })

    this.woolTrigger = this.time.addEvent({
      callback: this.spawnWool,
      callbackScope: this,
      delay: 1000,
      loop: true
    })

    this.physics.add.collider(
      this.woolPieces,
      this.basket,
      (basket, woolPiece) => {
        woolCaught += 1
        woolText.text = 'Wool caught: ' + woolCaught.toString()
        if (woolCaught >= 1) {
          this.triggerEnding()
        }
        woolPiece.destroy()
      }
    );
  }

  update(time, delta) {
    if (!this.finished) {
      this.basketController(delta)
    }
  }

  spawnWool() {
    const velocityX = -100 + Math.random()*500
    let woolPiece = this.woolPieces.get()
    if (woolPiece) {
      woolPiece.setPosition(500, 300)
      woolPiece.setSize(settings.woolSizeX, settings.woolSizeY)
      woolPiece.body.gravity.y = 500
      woolPiece.body.setVelocity(velocityX,-700)
      woolPiece.setDepth(1)
      setTimeout(() => {
        woolPiece.setDepth(3)
      }, 1000)
    }
  }

  basketController(delta) {
    if (this.keyLeft.isDown) {
      this.basket.body.velocity.x -= 30
    }
    else if (this.keyRight.isDown) {
      this.basket.body.velocity.x += 30
    }
  }

  playSheepAnim() {
    let sheep = this.add.sprite(0, 0, "sheepAnim");
    sheep.setOrigin(0,0)
    sheep.setDepth(2)
    this.anims.create({
      key: "sheepAnim",
      frames: this.anims.generateFrameNumbers("sheepSheet", {start: 0, end : 1}),
      frameRate: 4,
      repeat: -1
    })
    sheep.anims.play("sheepAnim")
  }

  createBasket() {
    const basket = this.physics.add.sprite(config.width/2, config.height-200, "basket");
    basket.setDrag(600)
    basket.setSize(settings.basketSizeX, settings.basketSizeY)
    basket.setSize(20,50)
    basket.setOffset(100,250)
    basket.setCollideWorldBounds(true);
    basket.setImmovable(true)
    basket.setDepth(4)
    return basket
  }

  triggerEnding() {
    this.woolTrigger.delay = 50
    this.add.image(config.width / 2, config.height / 2, "woolPiece").setDepth(5).setScale(10)
    this.finished = true
  }
}


class WoolPiece extends Phaser.Physics.Arcade.Sprite {
  constructor (scene) {
    super(scene, 0, 0, "woolPiece")
    this.lifespan = 5000
    this.currentRotation = 0
    this.setScale(1.5)
  }

  preUpdate(time, delta) {
    this.setScale(this.scale + 0.005)
    this.currentRotation += 0.1
    this.setRotation(this.currentRotation)
    super.preUpdate(time, delta);
    this.lifespan -= delta;
    
    if (this.lifespan <= 0) {
      console.log("wool destroyed")
      this.destroy();
    }
  }
}