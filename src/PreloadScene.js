class PreloadScene extends Phaser.Scene {
    preload() {
        this.load.image('moonscape', 'assets/moonscape.png');
        this.load.spritesheet('bug', 'assets/bug.png', { frameWidth: 40, frameHeight: 37 });
        this.load.image('h3', 'assets/h3.png');
        this.load.spritesheet('cannon', 'assets/cannon.png', { frameWidth: 100, frameHeight: 57 });
        this.load.image('spiral_galaxy', 'assets/spiral_galaxy.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('black_hole', 'assets/black_hole.png');
        this.load.image('asteroid', 'assets/asteroid.png');
        this.load.spritesheet('satellite', 'assets/satellite.png', { frameWidth: 128, frameHeight: 111 });
        this.load.image('horizontal', 'assets/horizontal.png');
        this.load.image('vertical', 'assets/vertical.png');
        this.load.audio("soundSatellite", "assets/soundSatellite.mp3");
        this.load.audio("soundCannon", "assets/soundCannon.mp3");
        this.load.audio("soundBorder", "assets/soundBorder.mp3");
        this.load.audio("soundGround", "assets/soundGround.mp3");
        this.load.audio("soundBlackHoleOrSpiral", "assets/soundBlackHoleOrSpiral.mp3");
        this.load.audio("soundH3OrStar", "assets/soundH3OrStar.mp3");
    }
    create() {
        this.add.image(400, 300, 'moonscape');
        this.h3 = this.physics.add.group();
        this.h3.create(100, 300, 'h3');
        this.h3Explainer = this.add.text(120, 290, `= Collect H-3 to win! Maintain an average of 20 per level.`, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.star = this.physics.add.staticSprite(100, 340, 'star');
        this.starExplainer = this.add.text(120, 330, '= Star, +1 attempts', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.spiralGalaxy = this.physics.add.staticSprite(130, 380, 'spiral_galaxy');
        this.spiralExplainer = this.add.text(180, 370, '= Spiral galaxy, -1 attempts', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.blackHole = this.physics.add.staticSprite(130, 430, 'black_hole');
        this.blackHoleExplainer = this.add.text(180, 420, '= Black hole! Game Over', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.satellite1 = this.physics.add.staticSprite(155, 480, 'satellite', 0);
        this.satellite1Explainer = this.add.text(220, 470, `= Satellite, rebound in direction of arrow`, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.welcomeText = this.add.text(180, 150, 'MOONBUGS', { fontFamily: 'Arial', fontSize: '70px', fill: '#fff'});

        // create clickable button
        const nextLevelButton = this.add.text(350, 230, 'Start', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerup', () => this.scene.start('Level1'));
    }
}

export default PreloadScene;
