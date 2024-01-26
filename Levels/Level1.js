

let settings;
let config;

export default class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1");
    }

    preload() {

    }

    create(data) {
        config = data.config;
        settings = data.settings;
    }

    update(time, delta) {
        if (this.soldier.y > config.height || this.soldier.y < 0) {
            this.soldierDead = true;
        }
        if (!this.soldierDead) {
            this.soldierController(delta);
            this.checkSoldierLocation();
        } else {
            this.soldier.body.velocity.x *= 0.95;
            this.soldierDeadTimer += delta;
            if (this.soldierDeadTimer > settings.restartTime) {
                this.scene.start();
            }
        }
    } 
}