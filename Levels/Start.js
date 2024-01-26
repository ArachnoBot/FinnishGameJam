import Phaser from "phaser"
import startImg from "../Assets/start.png"

let settings;
let config;


export default class Start extends Phaser.Scene {
    constructor() {
        super("Start")
    }

    preload() {
      this.load.image('start', startImg)
    }

    create(data) {
      config = data.config
      settings = data.settings

      const image = this.add.sprite(config.width/2, config.height/2, 'start').setInteractive()

      //  Moves the image anchor to the middle, so it centers inside the game properly
      image.setScale(0.2)

      image.on("pointerdown", this.handleStartClick)
    }

    update(time, delta) {

    }

    handleStartClick() {
      console.log("start clicked")
    }
}