import Phaser from "phaser"
import Level1 from "./Levels/Level1";

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
        scene: [Bootloader, Level1]
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
        this.scene.start("Level1", this.data)
    }
}