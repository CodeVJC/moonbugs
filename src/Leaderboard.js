class Leaderboard extends Phaser.Scene {
    constructor() {
        super({ key: 'Leaderboard' });
    }
    init (data) {
        if (data.bugColor == 'red') {
            this.bugColor = 'red';
        } else if (data.bugColor == 'yellow') {
            this.bugColor = 'yellow';
        } else {
            this.bugColor = 'blue';
        }
        this.leadersReady = data.leadersList;
        this.level = data.level;
        this.specialIndex = data.specialIndex;
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
        this.add.text(250, 25, 'LEADERBOARD', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#00ffff' }); 
        let x = 300;
        let y = 75;
        let count = 0;
        for (let i of this.leadersReady) {
            if (count == this.specialIndex) {
                this.add.text(x, y, i.name, { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#ffff00' });
                x += 150;
                this.add.text(x, y, i.score, { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#ffff00' }); 
                y += 30;
                x -= 150;
                count = 10;
            } else {
                this.add.text(x, y, i.name, { fontFamily: 'Concert One', fontSize: '36px', fill: '#00ffff' }); 
                x += 150;
                this.add.text(x, y, i.score, { fontFamily: 'Concert One', fontSize: '36px', fill: '#00ffff' }); 
                y += 30;
                x -= 150;
                count += 1;
            }
        };
        this.tryAgainButton = this.add.text(100, 450, 'Try Level ' + this.level + ' Again', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
        .setInteractive()
        .on('pointerdown', () => {
            this.tryAgainButton.setScale(0.8);
            this.tryAgainButton.setX(110);
            this.tryAgainButton.setY(450);
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

        this.startOverButton = this.add.text(450, 450, 'Start Over', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
        .setInteractive()
        .on('pointerdown', () => {
            this.startOverButton.setScale(0.8);
            this.startOverButton.setX(460);
            this.startOverButton.setY(450);
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

export default Leaderboard;