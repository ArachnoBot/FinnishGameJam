import Phaser from "phaser"
import Start from "./Levels/Start";
import Level1 from "./Levels/Level1";
import Level2 from "./Levels/Level2";

let game;

const settings = {
  woolSizeX: 50,
  woolSizeY: 50,
  basketSizeX: 300,
  basketSizeY: 50,
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
      arcade: {
        debug: true
      }
    },
    scene: [Bootloader, Start, Level1, Level2]
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
        this.scene.start("Level2", this.data)
    }
}