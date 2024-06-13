// create intro (every class after this is a level)
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
    }
    create() {
        this.add.image(400, 300, 'moonscape');

        this.welcomeText = this.add.text(config.scale.width / 2, config.scale.height / 2, 'MOONBUGS', { fontFamily: 'Arial', fontSize: '70px', fill: '#fff'});
        this.welcomeText.setOrigin(0.5);

        // create clickable button
        const nextLevelButton = this.add.text(350, 330, 'Start', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerup', () => this.scene.start('Level1'));
    }
}

class Level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1' });
    }
    create() {
        this.attempt = 1;
        this.score = 0;
        this.level = 1;
        this.scoreFill = 0;
        this.scoreExtra = 0;
        this.canLaunch = true;
        this.canCollect = false;
        this.distance = 0;

        this.add.image(400, 300, 'moonscape');

        // create spiral galaxy
        this.spiralGalaxy = this.physics.add.staticSprite(600, 450, 'spiral_galaxy');
        this.spiralExplainer = this.add.text(645, 435, '= -1 attempts', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        // create star   
        this.star = this.physics.add.staticSprite(333, 50, 'star');
        this.starExplainer = this.add.text(355, 35, '= +1 attempts', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        // create black hole   
        this.blackHole = this.physics.add.staticSprite(600, 150, 'black_hole');
        this.blackHoleExplainer = this.add.text(645, 135, '= Game Over', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        // create asteroids
        this.asteroid = this.physics.add.staticGroup();
        this.asteroid.create(66, 250, 'asteroid');
        this.asteroid.create(200, 150, 'asteroid');
        this.asteroid.create(733, 250, 'asteroid');
        this.asteroid.create(466, 550, 'asteroid');

        this.bug = this.physics.add.sprite(50, 550, 'bug', 0); // create bug before cannon so it's hidden under cannon
        this.bug.setCollideWorldBounds(true); // stay within boundaries of game   
        this.bug.setVelocity(0, 0);
        this.bug.setBounce(.7);
        this.bug.setDrag(.2);
        this.bug.body.gravity.y = 0;

        this.cannon = this.physics.add.sprite(this.bug.x, this.bug.y, 'cannon');  // create cannon
        this.cannon.setOrigin(0.5, 0.5);  // set rotation axis to center

        // add collision check between bug and asteroid and de-activate them until launch
        this.colliderAsteroid = this.physics.add.collider(this.bug, this.asteroid);
        this.colliderAsteroid.active = false;

        this.scoreBar = this.add.graphics(); // create score bar
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(555, 8, 0, 20);

        this.scoreBarBorder = this.add.graphics(); // create score bar border
        this.scoreBarBorder.lineStyle(2, 0xffffff, 1);
        this.scoreBarBorder.strokeRect(555, 8, 160, 20);

        // add text objects
        this.attemptText = this.add.text(25, 5, 'Attempt ' + this.attempt + '/3', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }); 
        this.scoreText = this.add.text(720, 5, this.score + '/20', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.welcomeText = this.add.text(366, 240, 'Level ' + this.level, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });  
        this.winText = this.add.text(config.scale.width / 2, config.scale.height / 2, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.winText.setOrigin(0.5);
        this.gameOverText = this.add.text(config.scale.width / 2, config.scale.height / 2, 'GAMEOVER', { fontFamily: 'Arial', fontSize: '50px', fill: '#ff0000' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;

        /*this.time.delayedCall(3000, () => {
            this.welcomeText.visible = false;
            this.starExplainer.visible = false;
            this.spiralExplainer.visible = false;
            this.blackHoleExplainer.visible = false;
        });*/

        // create h3 molecules
        this.h3 = this.physics.add.group();
        this.h3.create(133, 100, 'h3');
        this.h3.create(266, 100, 'h3');
        this.h3.create(400, 100, 'h3');
        this.h3.create(533, 100, 'h3');
        this.h3.create(666, 100, 'h3');
        this.h3.create(133, 200, 'h3');
        this.h3.create(266, 200, 'h3');
        this.h3.create(400, 200, 'h3');
        this.h3.create(533, 200, 'h3');
        this.h3.create(666, 200, 'h3');
        this.h3.create(133, 300, 'h3');
        this.h3.create(266, 300, 'h3');
        this.h3.create(400, 300, 'h3');
        this.h3.create(533, 300, 'h3');
        this.h3.create(666, 300, 'h3');
        this.h3.create(133, 400, 'h3');
        this.h3.create(266, 400, 'h3');
        this.h3.create(400, 400, 'h3');
        this.h3.create(533, 400, 'h3');
        this.h3.create(666, 400, 'h3');
        this.h3.create(133, 500, 'h3');
        this.h3.create(266, 500, 'h3');
        this.h3.create(400, 500, 'h3');
        this.h3.create(533, 500, 'h3');
        this.h3.create(666, 500, 'h3');

        this.input.on('pointermove', function (pointer) { // pointer move event listener
            const angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);
            this.cannon.setRotation(angle); // rotate cannon toward the pointer

            // calculate distance between cannon and pointer
            this.distance = Phaser.Math.Distance.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);
            if (this.distance <= 125) { // change cannon's color based on distance from pointer
                this.cannon.setFrame(0);
            } else if (this.distance <= 250) {
                this.cannon.setFrame(1);
            } else if (this.distance <= 375) {
                this.cannon.setFrame(2);
            } else if (this.distance <= 500) {
                this.cannon.setFrame(3);
            } else if (this.distance <= 625) {
                this.cannon.setFrame(4);
            } else if (this.distance <= 750) {
                this.cannon.setFrame(5);
            } else {
                this.cannon.setFrame(6);
            }
        }, this);

        // pointer up event listener to launch bug in direction cannon is facing
        this.input.on('pointerup', function (pointer) {
            // only works if canLaunch is true
            if (!this.canLaunch) return;          

            this.welcomeText.visible = false;
            this.starExplainer.visible = false;
            this.spiralExplainer.visible = false;
            this.blackHoleExplainer.visible = false;

            // add overlap checks between bug and other objects
            this.physics.add.overlap(this.bug, this.h3, this.collecth3, null, this);
            this.physics.add.overlap(this.bug, this.spiralGalaxy, this.hitSpiral, null, this);
            this.physics.add.overlap(this.bug, this.star, this.hitStar, null, this);
            this.physics.add.overlap(this.bug, this.blackHole, this.hitBlackHole, null, this);

            this.time.delayedCall(750, () => {
                this.cannon.setVisible(false);  // remove cannon after delay
            });

            // normalize distance to suitable range for speed
            const minDistance = 0;  // min distance
            const maxDistance = 800;  // max distance
            const minSpeed = 200;  // min speed
            const maxSpeed = 800;  // max speed
            const speed = Phaser.Math.Percent(this.distance, minDistance, maxDistance) * (maxSpeed - minSpeed) + minSpeed;

            // only access collecth3 logic after delay, to prevent collecting h3 while still inside cannon
            // faster speeds will enable collection sooner, since bug leaves cannon sooner
            if (speed < 300) {
                this.time.delayedCall(200, () => {
                    this.canCollect = true;
                    this.colliderAsteroid.active = true;
                });
            } else if (speed < 400) {
                this.time.delayedCall(100, () => {
                    this.canCollect = true;
                    this.colliderAsteroid.active = true;
                });   
            } else if (speed < 500) {
                this.time.delayedCall(50, () => {
                    this.canCollect = true;
                    this.colliderAsteroid.active = true;
                });  
            } else {
                this.time.delayedCall(25, () => {
                    this.canCollect = true;
                    this.colliderAsteroid.active = true;
                });  
            }

            // get velocity from cannon's rotation
            const velocity = this.physics.velocityFromRotation(this.cannon.rotation, speed);

            this.bug.setFrame(0); // forward pose
            this.bug.setVelocity(velocity.x, velocity.y);
            this.bug.body.gravity.y = 150;

            this.canLaunch = false;  // can't launch bug again until it's reset back into cannon
        }, this);
    }
    update() {
        // set bug's pose when it hits any left, right or top surface
        if (this.bug.body.blocked.left) { // hits left surface
            this.bug.setFrame(4);  // right pose
        } else if (this.bug.body.blocked.right) { // hits right surface
            this.bug.setFrame(3);  // left pose
        } else if (this.bug.body.blocked.up) { // hits top surface
            this.bug.setFrame(2);  // down pose
        }

        // apply more drag when bug's touching a bottom surface
        if (this.bug.body.blocked.down) {
            this.bug.setDragX(500);
        } else {
            this.bug.setDragX(0.2);
        }

        // check if bug's touching a bottom surface with no horizontal velocity
        // and prevent glitch where touching h3 fulfills those conditions before this.canCollect is set to true
        if (this.bug.body.blocked.down && this.bug.body.velocity.x === 0 && this.canCollect == true) {
            if (this.attempt < 3) {
                this.canCollect = false; // don't allow collection of h3 until following next launch
                this.colliderAsteroid.active = false; // don't allow collisions with asteroids until next launch

                // reset bug and cannon
                this.bug.setPosition(50, 550);
                this.bug.setVelocity(0, 0);
                this.bug.body.gravity.y = 0;
                this.cannon.setVisible(true);
                this.cannon.setFrame(0);
                this.cannon.setPosition(this.bug.x, this.bug.y);
                this.attempt += 1; // update attempt
                this.attemptText.setText('Attempt ' + this.attempt + '/3');
            } else {
                if (this.score >= 20) { // check for winning level
                    this.winText.setText('Level ' + this.level + ' Complete!');
                    this.bug.setFrame(0);
                    this.bug.setTint(0x00ff00);
                    this.physics.pause();
                    this.time.delayedCall(2000, () => {
                        this.scene.start('Level2', { cumulativeScore: this.score }); // start next level after delay
                    });
                } else {
                    // gameover
                    this.gameOverText.visible = true;
                    this.bug.setFrame(0);
                    this.bug.setTint(0xaaffbb);
                    this.physics.pause();  // pause game

                    // add button
                    const tryAgainButton = this.add.text(250, 330, 'Try Level ' + this.level + ' Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
                        .setInteractive()
                        .on('pointerup', () => this.scene.start('Level1'));
                }
            }
            this.canLaunch = true; // bug allowed to launch again
        }
    }
    collecth3(bug, h3) {
        if (!this.canCollect) {
            return;
        }
        h3.disableBody(true, true);  // remove collected h3

        // update score and scorebar
        this.score += 1;
        this.scoreFill += 8;

        if (this.score > 0) {
            this.welcomeText.visible = false; // once a score's on the board, remove welcome text
        }

        if (this.score <= 20) {
            this.scoreBar.clear();
            this.scoreBar.fillStyle(0x00ff00, 1);
            this.scoreBar.fillRect(555, 8, this.scoreFill, 20); // length of bar is determined by score
            this.scoreText.setText(this.score + '/20'); 
        } else if (this.score < 25) {
            this.scoreExtra += 32;
            this.scoreBar.clear();
            this.scoreBar.fillStyle(0x00ffff, 1);
            this.scoreBar.fillRect(555, 8, this.scoreExtra, 20);
            this.scoreText.setText(this.score + '/25');   
            this.scoreText.setTint(0x00ffff);   
        } else {
            this.scoreExtra += 32;
            this.scoreBar.clear();
            this.scoreBar.fillStyle(0x00ffff, 1);
            this.scoreBar.fillRect(555, 8, this.scoreExtra, 20);
            this.scoreText.setText(this.score + '/25');
            this.winText.setText('PERFECTION!');
            this.bug.setFrame(0);
            this.bug.setTint(0x00ff00);
            this.physics.pause();
            this.time.delayedCall(2000, () => {
                this.scene.start('Level2', { cumulativeScore: this.score });
            });
        }
    }
    hitStar(bug, star) {
        this.attempt -=1;
        star.disableBody(true, true);  // remove star
        this.attemptText.setText('Attempt ' + this.attempt + '/3');
    }
    hitSpiral(bug, spiralGalaxy) {
        this.attempt +=1;
        spiralGalaxy.disableBody(true, true);  // remove star
        this.attemptText.setText('Attempt ' + this.attempt + '/3');
    }
    hitBlackHole(bug, blackHole) {
        this.gameOverText.visible = true;
        bug.setFrame(0);
        bug.setTint(0xaaffbb);
        this.physics.pause();
        const tryAgainButton = this.add.text(250, 330, 'Try Level ' + this.level + ' Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerup', () => this.scene.start('Level1'));
    }
}

class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
    }
    create() {
        this.attempt = 1;
        this.score = 0;
        this.level = 1;
        this.scoreFill = 0;
        this.scoreExtra = 0;
        this.canLaunch = true;
        this.canCollect = false;
        this.distance = 0;

        this.add.image(400, 300, 'moonscape');

        // create spiral galaxy
        this.spiralGalaxy = this.physics.add.staticSprite(600, 450, 'spiral_galaxy');
        // create star   
        this.star = this.physics.add.staticSprite(333, 50, 'star');
        // create black hole   
        this.blackHole = this.physics.add.staticSprite(600, 150, 'black_hole');
        // create asteroids
        this.asteroid = this.physics.add.staticGroup();
        this.asteroid.create(66, 250, 'asteroid');
        this.asteroid.create(200, 150, 'asteroid');
        this.asteroid.create(733, 250, 'asteroid');
        this.asteroid.create(466, 550, 'asteroid');
        // create satellites
        this.satellite1 = this.physics.add.staticSprite(600, 350, 'satellite', 0);
        this.satellite1Explainer = this.add.text(666, 335, `= launch
upward`, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.satellite2 = this.physics.add.staticSprite(333, 150, 'satellite', 1);
        this.satellite2Explainer = this.add.text(400, 135, `= launch
downward`, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });

        this.bug = this.physics.add.sprite(50, 550, 'bug', 0); // create bug before cannon so it's hidden under cannon
        this.bug.setCollideWorldBounds(true); // stay within boundaries of game   
        this.bug.setVelocity(0, 0);
        this.bug.setBounce(.7);
        this.bug.setDrag(.2);
        this.bug.body.gravity.y = 0;

        this.cannon = this.physics.add.sprite(this.bug.x, this.bug.y, 'cannon');  // create cannon
        this.cannon.setOrigin(0.5, 0.5);  // set rotation axis to center

        // add collision check between bug and asteroid and de-activate them until launch
        this.colliderAsteroid = this.physics.add.collider(this.bug, this.asteroid);
        this.colliderAsteroid.active = false;

        this.scoreBar = this.add.graphics(); // create score bar
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(555, 8, 0, 20);

        this.scoreBarBorder = this.add.graphics(); // create score bar border
        this.scoreBarBorder.lineStyle(2, 0xffffff, 1);
        this.scoreBarBorder.strokeRect(555, 8, 160, 20);

        // add text objects
        this.attemptText = this.add.text(25, 5, 'Attempt ' + this.attempt + '/3', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }); 
        this.scoreText = this.add.text(720, 5, this.score + '/20', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.welcomeText = this.add.text(366, 240, 'Level ' + this.level, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });  
        this.winText = this.add.text(config.scale.width / 2, config.scale.height / 2, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.winText.setOrigin(0.5);
        this.gameOverText = this.add.text(config.scale.width / 2, config.scale.height / 2, 'GAMEOVER', { fontFamily: 'Arial', fontSize: '50px', fill: '#ff0000' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;

        /*this.time.delayedCall(3000, () => {
            this.welcomeText.visible = false;
            this.starExplainer.visible = false;
            this.spiralExplainer.visible = false;
            this.blackHoleExplainer.visible = false;
        });*/

        // create h3 molecules
        this.h3 = this.physics.add.group();
        this.h3.create(133, 100, 'h3');
        this.h3.create(266, 100, 'h3');
        this.h3.create(400, 100, 'h3');
        this.h3.create(533, 100, 'h3');
        this.h3.create(666, 100, 'h3');
        this.h3.create(133, 200, 'h3');
        this.h3.create(266, 200, 'h3');
        this.h3.create(400, 200, 'h3');
        this.h3.create(533, 200, 'h3');
        this.h3.create(666, 200, 'h3');
        this.h3.create(133, 300, 'h3');
        this.h3.create(266, 300, 'h3');
        this.h3.create(400, 300, 'h3');
        this.h3.create(533, 300, 'h3');
        this.h3.create(666, 300, 'h3');
        this.h3.create(133, 400, 'h3');
        this.h3.create(266, 400, 'h3');
        this.h3.create(400, 400, 'h3');
        this.h3.create(533, 400, 'h3');
        this.h3.create(666, 400, 'h3');
        this.h3.create(133, 500, 'h3');
        this.h3.create(266, 500, 'h3');
        this.h3.create(400, 500, 'h3');
        this.h3.create(533, 500, 'h3');
        this.h3.create(666, 500, 'h3');

        this.input.on('pointermove', function (pointer) { // pointer move event listener
            const angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);
            this.cannon.setRotation(angle); // rotate cannon toward the pointer

            // calculate distance between cannon and pointer
            this.distance = Phaser.Math.Distance.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);
            if (this.distance <= 125) { // change cannon's color based on distance from pointer
                this.cannon.setFrame(0);
            } else if (this.distance <= 250) {
                this.cannon.setFrame(1);
            } else if (this.distance <= 375) {
                this.cannon.setFrame(2);
            } else if (this.distance <= 500) {
                this.cannon.setFrame(3);
            } else if (this.distance <= 625) {
                this.cannon.setFrame(4);
            } else if (this.distance <= 750) {
                this.cannon.setFrame(5);
            } else {
                this.cannon.setFrame(6);
            }
        }, this);

        // pointer up event listener to launch bug in direction cannon is facing
        this.input.on('pointerup', function (pointer) {
            // only works if canLaunch is true
            if (!this.canLaunch) return;          

            this.welcomeText.visible = false;
            this.satellite1Explainer.visible = false;
            this.satellite2Explainer.visible = false;

            // add overlap checks between bug and other objects
            this.physics.add.overlap(this.bug, this.h3, this.collecth3, null, this);
            this.physics.add.overlap(this.bug, this.spiralGalaxy, this.hitSpiral, null, this);
            this.physics.add.overlap(this.bug, this.star, this.hitStar, null, this);
            this.physics.add.overlap(this.bug, this.blackHole, this.hitBlackHole, null, this);
            // create overlaps between bug and satellites
            this.physics.add.overlap(this.bug, this.satellite1, this.hitSatellite, null, this);
            this.physics.add.overlap(this.bug, this.satellite2, this.hitSatellite, null, this);

            this.time.delayedCall(750, () => {
                this.cannon.setVisible(false);  // remove cannon after delay
            });

            // normalize distance to suitable range for speed
            const minDistance = 0;  // min distance
            const maxDistance = 800;  // max distance
            const minSpeed = 200;  // min speed
            const maxSpeed = 800;  // max speed
            const speed = Phaser.Math.Percent(this.distance, minDistance, maxDistance) * (maxSpeed - minSpeed) + minSpeed;

            // only access collecth3 logic after delay, to prevent collecting h3 while still inside cannon
            // faster speeds will enable collection sooner, since bug leaves cannon sooner
            if (speed < 300) {
                this.time.delayedCall(200, () => {
                    this.canCollect = true;
                    this.colliderAsteroid.active = true;
                });
            } else if (speed < 400) {
                this.time.delayedCall(100, () => {
                    this.canCollect = true;
                    this.colliderAsteroid.active = true;
                });   
            } else if (speed < 500) {
                this.time.delayedCall(50, () => {
                    this.canCollect = true;
                    this.colliderAsteroid.active = true;
                });  
            } else {
                this.time.delayedCall(25, () => {
                    this.canCollect = true;
                    this.colliderAsteroid.active = true;
                });  
            }

            // get velocity from cannon's rotation
            const velocity = this.physics.velocityFromRotation(this.cannon.rotation, speed);

            this.bug.setFrame(0); // forward pose
            this.bug.setVelocity(velocity.x, velocity.y);
            this.bug.body.gravity.y = 150;

            this.canLaunch = false;  // can't launch bug again until it's reset back into cannon
        }, this);
    }
    update() {
        // set bug's pose when it hits any left, right or top surface
        if (this.bug.body.blocked.left) { // hits left surface
            this.bug.setFrame(4);  // right pose
        } else if (this.bug.body.blocked.right) { // hits right surface
            this.bug.setFrame(3);  // left pose
        } else if (this.bug.body.blocked.up) { // hits top surface
            this.bug.setFrame(2);  // down pose
        }

        // apply more drag when bug's touching a bottom surface
        if (this.bug.body.blocked.down) {
            this.bug.setDragX(500);
        } else {
            this.bug.setDragX(0.2);
        }

        // check if bug's touching a bottom surface with no horizontal velocity
        // and prevent glitch where touching h3 fulfills those conditions before this.canCollect is set to true
        if (this.bug.body.blocked.down && this.bug.body.velocity.x === 0 && this.canCollect == true) {
            if (this.attempt < 3) {
                this.canCollect = false; // don't allow collection of h3 until following next launch
                this.colliderAsteroid.active = false; // don't allow collisions with asteroids until next launch

                // reset bug and cannon
                this.bug.setPosition(50, 550);
                this.bug.setVelocity(0, 0);
                this.bug.body.gravity.y = 0;
                this.cannon.setVisible(true);
                this.cannon.setFrame(0);
                this.cannon.setPosition(this.bug.x, this.bug.y);
                this.attempt += 1; // update attempt
                this.attemptText.setText('Attempt ' + this.attempt + '/3');
            } else {
                if (this.score >= 20) { // check for winning level
                    this.winText.setText('Level ' + this.level + ' Complete!');
                    this.bug.setFrame(0);
                    this.bug.setTint(0x00ff00);
                    this.physics.pause();
                    this.time.delayedCall(2000, () => {
                        this.scene.start('Level3', { cumulativeScore: this.score }); // start next level after delay
                    });
                } else {
                    // gameover
                    this.gameOverText.visible = true;
                    this.bug.setFrame(0);
                    this.bug.setTint(0xaaffbb);
                    this.physics.pause();  // pause game

                    // add button
                    const tryAgainButton = this.add.text(250, 330, 'Try Level ' + this.level + ' Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
                        .setInteractive()
                        .on('pointerup', () => this.scene.start('Level2'));
                }
            }
            this.canLaunch = true; // bug allowed to launch again
        }
    }
    collecth3(bug, h3) {
        if (!this.canCollect) {
            return;
        }
        h3.disableBody(true, true);  // remove collected h3

        // update score and scorebar
        this.score += 1;
        this.scoreFill += 8;

        if (this.score > 0) {
            this.welcomeText.visible = false; // once a score's on the board, remove welcome text
        }

        if (this.score <= 20) {
            this.scoreBar.clear();
            this.scoreBar.fillStyle(0x00ff00, 1);
            this.scoreBar.fillRect(555, 8, this.scoreFill, 20); // length of bar is determined by score
            this.scoreText.setText(this.score + '/20'); 
        } else if (this.score < 25) {
            this.scoreExtra += 32;
            this.scoreBar.clear();
            this.scoreBar.fillStyle(0x00ffff, 1);
            this.scoreBar.fillRect(555, 8, this.scoreExtra, 20);
            this.scoreText.setText(this.score + '/25');   
            this.scoreText.setTint(0x00ffff);   
        } else {
            this.scoreExtra += 32;
            this.scoreBar.clear();
            this.scoreBar.fillStyle(0x00ffff, 1);
            this.scoreBar.fillRect(555, 8, this.scoreExtra, 20);
            this.scoreText.setText(this.score + '/25');
            this.winText.setText('PERFECTION!');
            this.bug.setFrame(0);
            this.bug.setTint(0x00ff00);
            this.physics.pause();
            this.time.delayedCall(2000, () => {
                this.scene.start('Level3', { cumulativeScore: this.score });
            });
        }
    }
    hitStar(bug, star) {
        this.attempt -=1;
        star.disableBody(true, true);  // remove star
        this.attemptText.setText('Attempt ' + this.attempt + '/3');
    }
    hitSpiral(bug, spiralGalaxy) {
        this.attempt +=1;
        spiralGalaxy.disableBody(true, true);  // remove star
        this.attemptText.setText('Attempt ' + this.attempt + '/3');
    }
    hitBlackHole(bug, blackHole) {
        this.gameOverText.visible = true;
        bug.setFrame(0);
        bug.setTint(0xaaffbb);
        this.physics.pause();
        const tryAgainButton = this.add.text(250, 330, 'Try Level ' + this.level + ' Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerup', () => this.scene.start('Level2'));
    }
    hitSatellite(bug, satellite) { // handle overlap with satellite
        if (!this.canCollect) {
            return;
        }
        satellite.disableBody(true, true);  // remove satellite

        if (satellite.frame.name == 0) { // satellite with up arrow
            bug.body.velocity.y += -700;  // launch bug up
        } else if (satellite.frame.name == 1) { // satellite with down arrow
            bug.body.velocity.y += 700;  // launch bug down
        } else if (satellite.frame.name == 2) { // satellite with left arrow
            bug.body.velocity.x += -700;  // launch bug left
        } else { // satellite with right arrow
            bug.body.velocity.x += 700;  // launch bug right
        }
    }
}

// create game config and game
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: [PreloadScene, Level1, Level2],
};

const game = new Phaser.Game(config);
