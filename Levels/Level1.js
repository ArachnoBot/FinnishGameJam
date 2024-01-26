import Phaser from "phaser"
import woolImg from "../Assets/Level1/wool.png"

let settings;
let config;

export default class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1")
    }

    preload() {
      this.load.image("wool", woolImg)
    }

    create(data) {
      config = data.config
      settings = data.settings

      
    }

    update(time, delta) {

    }
}