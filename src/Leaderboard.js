class Leaderboard extends Phaser.Scene {
    constructor() {
        super({ key: 'Leaderboard' });
    }
    init (data) {
        if (data.bug == 'red') {
            this.bug = 'red';
        } else if (data.bug == 'yellow') {
            this.bug = 'yellow';
        } else {
            this.bug = 'blue';
        }
        this.leadersReady = data.leadersList;
    }
    create() {
        this.add.image(400, 300, 'moonscape');
        this.add.text(250, 25, 'LEADERBOARD', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#00ffff' }); 
        let x = 300;
        let y = 75;
        for (let i of this.leadersReady) {
            this.add.text(x, y, i.name, { fontFamily: 'Concert One', fontSize: '36px', fill: '#00ffff' }); 
            x += 150;
            this.add.text(x, y, i.score, { fontFamily: 'Concert One', fontSize: '36px', fill: '#00ffff' }); 
            y += 30;
            x -= 150;
        };
        this.startOverButton = this.add.text(290, 450, 'Start Over', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
        .setInteractive()
        .on('pointerdown', () => {
            this.startOverButton.setScale(0.8);
            this.startOverButton.setX(300);
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