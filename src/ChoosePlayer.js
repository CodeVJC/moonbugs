import Level1 from "./Level1.js";
import Level8 from "./Level8.js";

class ChoosePlayer extends Phaser.Scene {
    constructor() {
        super({ key: 'ChoosePlayer' });
    }
    create() {
        if (!this.scene.manager.getScene('Level1')) {
            this.scene.add('Level1', Level1);
        }
        if (!this.scene.manager.getScene('Level8')) {
            this.scene.add('Level8', Level8);
        }
        document.body.style.cursor = 'default';
        this.add.image(400, 300, 'moonscape');
        this.bugRed = this.add.sprite(150, 300, 'red', 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.bugRed.setScale(0.8);
                this.bugRed.setX(151);
                this.bugRed.setY(301);
                this.input.once('pointerup', (pointer) => {
                    this.time.delayedCall(250, () => {
                        this.scene.start('Level1', { bugColor: 'red' });
                    });
                });
            });
        this.bugYellow = this.add.sprite(400, 300, 'yellow', 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.bugYellow.setScale(0.8);
                this.bugYellow.setX(401);
                this.bugYellow.setY(301);
                this.input.once('pointerup', (pointer) => {
                    this.time.delayedCall(250, () => {
                        this.scene.start('Level1', { bugColor: 'yellow' });
                    });
                });
            });
        this.bugBlue = this.add.sprite(650, 300, 'blue', 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.bugBlue.setScale(0.8);
                this.bugBlue.setX(651);
                this.bugBlue.setY(301)
                this.input.once('pointerup', (pointer) => {
                    this.time.delayedCall(250, () => {
                        this.scene.start('Level1', { bugColor: 'blue' });
                    });
                });
            });
        this.welcomeText = this.add.text(180, 150, 'Choose Your Bug', { fontFamily: 'Rubik Moonrocks', fontSize: '50px', fill: '#fff'});

        this.input.on('gameobjectover', (pointer, bugRed) => {
            bugRed.setTint(0x00ff00);
            document.body.style.cursor = 'pointer';
        });
        this.input.on('gameobjectout', (pointer, bugRed) => {
            bugRed.clearTint();
            document.body.style.cursor = 'default';
        });
        this.input.on('gameobjectover', (pointer, bugYellow) => {
            bugYellow.setTint(0x00ff00);
            document.body.style.cursor = 'pointer';
        });
        this.input.on('gameobjectout', (pointer, bugYellow) => {
            bugYellow.clearTint();
            document.body.style.cursor = 'default';
        });
        this.input.on('gameobjectover', (pointer, bugBlue) => {
            bugBlue.setTint(0x00ff00);
            document.body.style.cursor = 'pointer';
        });
        this.input.on('gameobjectout', (pointer, bugBlue) => {
            bugBlue.clearTint();
            document.body.style.cursor = 'default';
        });
        // create clickable button
        this.skipAheadButton = this.add.text(300, 400, 'Try Level 8', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerdown', () => {
                this.skipAheadButton.setScale(0.8);
                this.skipAheadButton.setX(310);
                this.skipAheadButton.setY(410);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level8', { cumulativeScore: 0, bugColor: 'blue' })
                })
            });
        this.input.on('gameobjectover', (pointer, skipAheadButton) => {
            skipAheadButton.clearTint();
            skipAheadButton.setStyle({ fill: '#00f' });
            document.body.style.cursor = 'pointer';
        });
        this.input.on('gameobjectout', (pointer, skipAheadButton) => {
            skipAheadButton.clearTint();
            skipAheadButton.setStyle({ fill: '#0f0' });
            document.body.style.cursor = 'default';
        });
    }
}

export default ChoosePlayer;