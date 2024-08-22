class ChoosePlayer extends Phaser.Scene {
    constructor() {
        super({ key: 'ChoosePlayer' });
    }
    create() {
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
                        this.scene.start('Level1', { bug: 'red' });
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
                        this.scene.start('Level1', { bug: 'yellow' });
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
                        this.scene.start('Level1', { bug: 'blue' });
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
    }
}

export default ChoosePlayer;