import Phaser from "phaser"

let settings;
let config;


export default class Level3 extends Phaser.Scene {
    constructor() {
        super("Level3")
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