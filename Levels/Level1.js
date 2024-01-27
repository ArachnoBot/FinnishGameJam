import Phaser from "phaser"
import woolPath from "../Assets/Level1/wool.png"
import bgPath from "../Assets/Level1/level1Background.png"
import basketPath from "../Assets/Level1/basket.png"


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
    this.load.spritesheet("lambSheet", lambPath, soldierSize);
  }

  create(data) {
    config = data.config
    settings = data.settings

    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.add.image(config.width / 2, config.height / 2, "bg")
    this.physics.world.setBounds(0, 0, config.width, config.height);
    this.basket = this.createBasket()

    this.woolPieces = this.physics.add.group({
      classType: WoolPiece,
      runChildUpdate: true
    })

    this.triggerTimer = this.time.addEvent({
      callback: this.spawnWool,
      callbackScope: this,
      delay: 1000,
      loop: true
    })

    this.physics.add.collider(
      this.woolPieces,
      this.basket,
      (basket, woolPiece) => {
        console.log("wool caught")
        woolPiece.destroy()
      }
  );
  }

  update(time, delta) {
    this.basketController(delta)
  }

  spawnWool() {
    const x = config.width*0.05 + Math.random()*config.width*0.9
    let woolPiece = this.woolPieces.get()
    if (woolPiece) {
      woolPiece.setPosition(x, -30)
      woolPiece.setSize(settings.woolSizeX, settings.woolSizeY)
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

  createBasket() {
    const basket = this.physics.add.sprite(config.width/2, config.height-160, "basket");
    basket.setDrag(600)
    basket.setSize(settings.basketSizeX, settings.basketSizeY)
    basket.setOffset(50,250)
    basket.setCollideWorldBounds(true);
    return basket
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