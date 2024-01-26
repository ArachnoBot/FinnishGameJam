import Phaser from "phaser"
import Start from "./Levels/Start";

let game;

const settings = {

}

window.onload = () => {
    let gameConfig = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: 1920,
            height: 1080,
        },
        pixelArt: true,
        backgroundColor: "#808080",
        physics: {
            default: "arcade",
        },
        scene: [Bootloader, Start]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class Bootloader extends Phaser.Scene {
    constructor () {
        super("Bootloader")
    }

    create() {
        this.data = {
            config: game.config,
            settings: settings,
        }
        this.scene.start("Start", this.data)
    }
}