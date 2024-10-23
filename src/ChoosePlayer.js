import Level1 from "./Level1.js";
import Level2 from "./Level2.js";
import Level3 from "./Level3.js";
import Level4 from "./Level4.js";
import Level5 from "./Level5.js";
import Level6 from "./Level6.js";
import Level7 from "./Level7.js";
import Level8 from "./Level8.js";
import Level9 from "./Level9.js";
import Level10 from "./Level10.js";

class ChoosePlayer extends Phaser.Scene {
    constructor() {
        super({ key: 'ChoosePlayer' });
    }
    create() {
        if (!this.scene.manager.getScene('Level1')) {
            this.scene.add('Level1', Level1);
        }
        if (!this.scene.manager.getScene('Level2')) {
            this.scene.add('Level2', Level2);
        }
        if (!this.scene.manager.getScene('Level3')) {
            this.scene.add('Level3', Level3);
        }
        if (!this.scene.manager.getScene('Level4')) {
            this.scene.add('Level4', Level4);
        }
        if (!this.scene.manager.getScene('Level5')) {
            this.scene.add('Level5', Level5);
        }
        if (!this.scene.manager.getScene('Level6')) {
            this.scene.add('Level6', Level6);
        }
        if (!this.scene.manager.getScene('Level7')) {
            this.scene.add('Level7', Level7);
        }
        if (!this.scene.manager.getScene('Level8')) {
            this.scene.add('Level8', Level8);
        }
        if (!this.scene.manager.getScene('Level9')) {
            this.scene.add('Level9', Level9);
        }
        if (!this.scene.manager.getScene('Level10')) {
            this.scene.add('Level10', Level10);
        }
        document.body.style.cursor = 'default';
        this.add.image(400, 300, 'moonscape');
        this.bugRed = this.add.sprite(150, 250, 'red', 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.bugRed.setScale(0.8);
                this.bugRed.setX(151);
                this.bugRed.setY(251);
                this.input.once('pointerup', (pointer) => {
                    this.time.delayedCall(250, () => {
                        this.scene.start('Level1', { bugColor: 'red' });
                    });
                });
            });
        this.bugYellow = this.add.sprite(400, 250, 'yellow', 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.bugYellow.setScale(0.8);
                this.bugYellow.setX(401);
                this.bugYellow.setY(251);
                this.input.once('pointerup', (pointer) => {
                    this.time.delayedCall(250, () => {
                        this.scene.start('Level1', { bugColor: 'yellow' });
                    });
                });
            });
        this.bugBlue = this.add.sprite(650, 250, 'blue', 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.bugBlue.setScale(0.8);
                this.bugBlue.setX(651);
                this.bugBlue.setY(251)
                this.input.once('pointerup', (pointer) => {
                    this.time.delayedCall(250, () => {
                        this.scene.start('Level1', { bugColor: 'blue' });
                    });
                });
            });
        this.bugGreen = this.add.sprite(520, 370, 'green', 0);
        this.welcomeText = this.add.text(180, 150, 'Choose Your Bug', { fontFamily: 'Rubik Moonrocks', fontSize: '50px', fill: '#fff'});
        this.warpText = this.add.text(180, 350, 'or warp ahead as', { fontFamily: 'Rubik Moonrocks', fontSize: '35px', fill: '#0f0'});

        // create clickable warp buttons
        this.warpButton2 = this.add.text(50, 400, 'Level 2', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton2.setScale(0.8);
                this.warpButton2.setX(60);
                this.warpButton2.setY(410);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level2', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.warpButton3 = this.add.text(50, 450, 'Level 3', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton3.setScale(0.8);
                this.warpButton3.setX(60);
                this.warpButton3.setY(460);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level3', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.warpButton4 = this.add.text(50, 500, 'Level 4', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton4.setScale(0.8);
                this.warpButton4.setX(60);
                this.warpButton4.setY(510);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level4', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.warpButton5 = this.add.text(200, 400, 'Level 5', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton5.setScale(0.8);
                this.warpButton5.setX(210);
                this.warpButton5.setY(410);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level5', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.warpButton6 = this.add.text(200, 450, 'Level 6', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton6.setScale(0.8);
                this.warpButton6.setX(210);
                this.warpButton6.setY(460);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level6', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.warpButton7 = this.add.text(200, 500, 'Level 7', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton7.setScale(0.8);
                this.warpButton7.setX(210);
                this.warpButton7.setY(510);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level7', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.warpButton8 = this.add.text(345, 400, 'Level 8', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton8.setScale(0.8);
                this.warpButton8.setX(355);
                this.warpButton8.setY(410);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level8', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.warpButton9 = this.add.text(345, 450, 'Level 9: Plinko', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton9.setScale(0.8);
                this.warpButton9.setX(355);
                this.warpButton9.setY(460);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level9', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.warpButton10 = this.add.text(345, 500, 'Level 10: Gravity Inversion', { fontFamily: 'Rubik Moonrocks', fontSize: '30px', fill: '#00f', backgroundColor: '#0f0'})
            .setInteractive()
            .on('pointerdown', () => {
                this.warpButton10.setScale(0.8);
                this.warpButton10.setX(355);
                this.warpButton10.setY(510);
                this.time.delayedCall(200, () => {
                    this.scene.start('Level10', { cumulativeScore: 0, bugColor: 'green' })
                })
            });
        this.input.on('gameobjectover', (pointer, object) => {
            if (object.type == 'Sprite') {
                object.setTint(0x00ff00);
            } else {
                object.setStyle({ fill: '#fff' });
            }
            document.body.style.cursor = 'pointer';
        });
        this.input.on('gameobjectout', (pointer, object) => {
            if (object.type == 'Sprite') {
                object.clearTint();
            } else {
                object.setStyle({ fill: '#00f' });
            }
            document.body.style.cursor = 'default';
        });
    }
}

export default ChoosePlayer;