class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }
    init (data) {
        if (data.bugColor == 'red') {
            this.bugColor = 'red';
        } else if (data.bugColor == 'yellow') {
            this.bugColor = 'yellow';
        } else {
            this.bugColor = 'blue';
        }
        this.level = data.level;
        if (data.outcome == 'won') {
            this.outcome = 'won';
        }
    }
    create() {
        this.add.image(400, 300, 'moonscape');
        if (this.bugColor == 'red') {
            this.bug = this.physics.add.sprite(400, 550, 'red', 0); // create bug before cannon so it's hidden under cannon
        } else if (this.bugColor == 'yellow') {
            this.bug = this.physics.add.sprite(400, 550, 'yellow', 0); // create bug before cannon so it's hidden under cannon
        } else {
            this.bug = this.physics.add.sprite(400, 550, 'blue', 0); // create bug before cannon so it's hidden under cannon
        }
        if (this.outcome == 'won') {
            this.gameOverText = this.add.text(this.sys.game.scale.width / 2, this.sys.game.scale.height / 2, 'YOU WON!', { fontFamily: 'Rubik Moonrocks', fontSize: '50px', fill: '#00ffff' });
            this.gameOverText.setOrigin(0.5);
        } else {
            this.gameOverText = this.add.text(this.sys.game.scale.width / 2, this.sys.game.scale.height / 2, 'GAMEOVER', { fontFamily: 'Rubik Moonrocks', fontSize: '50px', fill: '#00ffff' });
            this.gameOverText.setOrigin(0.5);

            this.tryAgainButton = this.add.text(100, 330, 'Try Level ' + this.level + ' Again', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerdown', () => {
                this.tryAgainButton.setScale(0.8);
                this.tryAgainButton.setX(110);
                this.tryAgainButton.setY(330);
                this.input.once('pointerup', (pointer) => {
                    this.time.delayedCall(500, () => {
                        this.scene.start('Level'+this.level, { cumulativeScore: 0, bugColor: this.bugColor });
                    });
                });
            })
            this.input.on('gameobjectover', (pointer, tryAgainButton) => {
                tryAgainButton.setStyle({ fill: '#f00' });
                document.body.style.cursor = 'pointer';
            });
            this.input.on('gameobjectout', (pointer, tryAgainButton) => {
                tryAgainButton.setStyle({ fill: '#0f0' });
                document.body.style.cursor = 'default';
            });

            this.startOverButton = this.add.text(450, 330, 'Start Over', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerdown', () => {
                this.startOverButton.setScale(0.8);
                this.startOverButton.setX(460);
                this.startOverButton.setY(330);
                this.input.once('pointerup', (pointer) => {
                    this.time.delayedCall(500, () => {
                        this.scene.start('Preload');
                    });
                });
            })
            this.input.on('gameobjectover', (pointer, startOverButton) => {
                startOverButton.setStyle({ fill: '#f00' });
                document.body.style.cursor = 'pointer';
            });
            this.input.on('gameobjectout', (pointer, startOverButton) => {
                startOverButton.setStyle({ fill: '#0f0' });
                document.body.style.cursor = 'default';
            });
        }
    }
}

export default GameOver;
