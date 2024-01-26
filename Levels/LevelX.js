import Phaser from "phaser"

let settings;
let config;


export default class LevelX extends Phaser.Scene {
    constructor() {
        super("LevelX")
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