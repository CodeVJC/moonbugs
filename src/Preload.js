import ChoosePlayer from "./ChoosePlayer.js";

class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }
    preload() {
        this.load.image('moonscape', 'assets/moonscape.png');
        this.load.spritesheet('red', 'assets/red.png', { frameWidth: 40, frameHeight: 37 });
        this.load.spritesheet('yellow', 'assets/yellow.png', { frameWidth: 40, frameHeight: 37 });
        this.load.spritesheet('blue', 'assets/blue.png', { frameWidth: 40, frameHeight: 37 });
        this.load.spritesheet('green', 'assets/green.png', { frameWidth: 40, frameHeight: 37 });
        this.load.image('h3', 'assets/h3.png');
        this.load.image('h3_bundle', 'assets/h3_bundle.png');
        this.load.spritesheet('cannon', 'assets/cannon.png', { frameWidth: 100, frameHeight: 57 });
        this.load.image('cannonPlinko', 'assets/cannonPlinko.png');
        this.load.image('spiral_galaxy', 'assets/spiral_galaxy.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('black_hole', 'assets/black_hole.png');
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.spritesheet('satellite', 'assets/satellite.png', { frameWidth: 128, frameHeight: 111 });
        this.load.image('horizontal', 'assets/horizontal_white.png');
        this.load.image('horizontal_half', 'assets/horizontal_white_half.png');
        this.load.image('horizontal_quarter', 'assets/horizontal_white_quarter.png');
        this.load.image('vertical', 'assets/vertical_white.png');
        this.load.image('vertical_long', 'assets/vertical_white_long.png');
        this.load.image('vertical_half', 'assets/vertical_white_half.png');
        this.load.image('vertical_quarter', 'assets/vertical_white_quarter.png');
        this.load.audio("soundSatellite", "assets/soundSatellite.mp3");
        this.load.audio("soundCannon", "assets/soundCannon.mp3");
        this.load.audio("soundBorder", "assets/soundBorder.mp3");
        this.load.audio("soundGround", "assets/soundGround.mp3");
        this.load.audio("soundBlackHoleOrSpiral", "assets/soundBlackHoleOrSpiral.mp3");
        this.load.audio("soundH3OrStar", "assets/soundH3OrStar.mp3");
    }
    create() {
        if (!this.scene.manager.getScene('ChoosePlayer')) {
            this.scene.add('ChoosePlayer', ChoosePlayer);
        }
        this.add.image(400, 300, 'moonscape');
        this.welcomeText = this.add.text(190, 100, 'MOONBUGS', { fontFamily: 'Rubik Moonrocks', fontSize: '70px', fill: '#00ffff'});
        this.h3 = this.physics.add.group();
        this.h3.create(100, 250, 'h3');
        this.h3Explainer = this.add.text(120, 240, `= Collect H-3 to win! Maintain an average of 20 per level.`, { fontFamily: 'Concert One', fontSize: '24px', fill: '#fff' });
        this.bonusExplainer = this.add.text(142, 265, `Collect all 25 on any level for 3 bonus H-3.`, { fontFamily: 'Concert One', fontSize: '24px', fill: '#fff' });
        this.bonusExplainer2 = this.add.text(142, 290, `10 bonus H-3 for winning the game.`, { fontFamily: 'Concert One', fontSize: '24px', fill: '#fff' });
        this.h3Bundle = this.physics.add.group();
        this.h3Bundle.create(75, 340, 'h3_bundle');
        this.h3BundleExplainer = this.add.text(120, 330, `= H-3 bundle equal to 5 H3!`, { fontFamily: 'Concert One', fontSize: '24px', fill: '#fff' });
        this.star = this.physics.add.staticSprite(100, 390, 'star');
        this.starExplainer = this.add.text(120, 380, '= Star, +1 attempts', { fontFamily: 'Concert One', fontSize: '24px', fill: '#fff' });
        this.spiralGalaxy = this.physics.add.staticSprite(130, 430, 'spiral_galaxy');
        this.spiralExplainer = this.add.text(180, 420, '= Spiral galaxy, -1 attempts', { fontFamily: 'Concert One', fontSize: '24px', fill: '#fff' });
        this.blackHole = this.physics.add.staticSprite(130, 480, 'black_hole');
        this.blackHoleExplainer = this.add.text(180, 470, '= Black hole! Game Over', { fontFamily: 'Concert One', fontSize: '24px', fill: '#fff' });
        this.satellite1 = this.physics.add.staticSprite(155, 530, 'satellite', 0);
        this.satellite1Explainer = this.add.text(220, 530, `= Satellite, rebound in direction of arrow`, { fontFamily: 'Concert One', fontSize: '24px', fill: '#fff' });

        // create clickable button
        this.nextLevelButton = this.add.text(350, 180, 'Start', { fontFamily: 'Rubik Moonrocks', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerdown', () => {
                this.nextLevelButton.setScale(0.8);
                this.nextLevelButton.setX(360);
                this.nextLevelButton.setY(190);
                this.time.delayedCall(200, () => {
                    this.scene.start('ChoosePlayer')
                })
            });
        this.input.on('gameobjectover', (pointer, button) => {
            button.setStyle({ fill: '#f00' });
            document.body.style.cursor = 'pointer';
        });
        this.input.on('gameobjectout', (pointer, button) => {
            button.setStyle({ fill: '#0f0' });
            document.body.style.cursor = 'default';
        });
    }
}

export default Preload;
