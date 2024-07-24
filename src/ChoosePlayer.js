class ChoosePlayer extends Phaser.Scene {
    constructor() {
        super({ key: 'ChoosePlayer' });
    }
    create() {
        this.add.image(400, 300, 'moonscape');
        this.bug = this.add.sprite(150, 300, 'bug', 0).setInteractive().on('pointerup', () => this.scene.start('Level1', { bug: 'red' }));
        this.bug = this.add.sprite(400, 300, 'bug_yellow', 0).setInteractive().on('pointerup', () => this.scene.start('Level1', { bug: 'yellow' }));
        this.bug = this.add.sprite(650, 300, 'bug_blue', 0).setInteractive().on('pointerup', () => this.scene.start('Level1', { bug: 'blue' }));
        this.welcomeText = this.add.text(180, 150, 'Choose Your Bug', { fontFamily: 'Arial', fontSize: '50px', fill: '#fff'});

        this.input.on('gameobjectover', (pointer, gameObject) => {
            gameObject.setTint(0x00ff00);
            document.body.style.cursor = 'pointer';
        });
        this.input.on('gameobjectout', (pointer, gameObject) => {
            gameObject.clearTint();
            document.body.style.cursor = 'default';
        });
    }
}

export default ChoosePlayer;