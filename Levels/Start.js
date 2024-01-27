import Phaser from "phaser"
import startImg from "../Assets/Start/start.png"

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
      image.setScale(0.2)
      image.on("pointerdown", this.handleStartClick, this)
    }

    update(time, delta) {

    }

    handleStartClick() {
      console.log("start clicked")
      this.scene.start("Level1", {config, settings});
    }
}