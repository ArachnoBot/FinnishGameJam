import Phaser from "phaser"

let settings;
let config;

export default class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1")
    }

    preload() {
      
    }

    create(data) {
      config = data.config
      settings = data.settings


    }

    update(time, delta) {

    }
}