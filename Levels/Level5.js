import Phaser from "phaser"
import retryPath from "../Assets/Level4/uudelleen.png"
import yesEnding from "../Assets/Level2/background.png"

let settings;
let config;


export default class Level5 extends Phaser.Scene {
    constructor() {
        super("Level5")
    }

    preload() {
      console.log("level 5")
      this.load.image("retryBtn", retryPath)
      this.load.image("bg5", yesEnding)
    }

    create(data) {
      config = data.config
      settings = data.settings

      this.add.image(config.width / 2, config.height / 2, "bg5").setDepth(0)
      this.retryBtn = this.add.image(config.width/2, config.height - 220, "retry").setDepth(1).setInteractive()

      this.retryBtn.on("pointerdown", ()=>{
        this.scene.start("Start", {config, settings})
      }, this)
    }

    update(time, delta) {

    }
}