class Level5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level5' });
    }
    init (data) {
        if (data.bug == 'bug') {
            this.bug = 'red';
        } else if (data.bug == 'bug_yellow') {
            this.bug = 'yellow';
        } else {
            this.bug = 'blue';
        }
        if (data.cumulativeScore == 0) {
            this.runningTotal = 0;
            this.levels = 0;
        } else {
            this.runningTotal = data.cumulativeScore;
            this.levels = data.levels;
        }
    }
    create() {
        document.body.style.cursor = 'default';
        this.needed = this.calcRequiredScore(this.runningTotal, this.levels);
        this.attempt = 1;
        this.score = 0;
        this.level = 5;
        this.scoreFill = 0;
        this.scoreExtra = 0;
        this.canLaunch = true;
        this.canCollect = false;
        this.distance = 0;

        this.add.image(400, 300, 'moonscape');

        // create spiral galaxy
        this.spiralGalaxy = this.physics.add.staticSprite(333, 150, 'spiral_galaxy');
        // create star   
        this.star = this.physics.add.staticSprite(733, 50, 'star');
        // create black hole   
        this.blackHole = this.physics.add.staticSprite(400, 350, 'black_hole');
        // create asteroids
        this.asteroid = this.physics.add.staticGroup();
        this.asteroid.create(466, 250, 'asteroid');
        this.asteroid.create(200, 350, 'asteroid');
        this.asteroid.create(733, 450, 'asteroid');
        this.asteroid.create(333, 550, 'asteroid');
        // create satellites
        this.satellite1 = this.physics.add.staticSprite(600, 450, 'satellite', 0);
        this.satellite2 = this.physics.add.staticSprite(66, 150, 'satellite', 1);

        if (this.bug == 'red') {
            this.bug = this.physics.add.sprite(50, 550, 'bug', 0); // create bug before cannon so it's hidden under cannon
        } else if (this.bug == 'yellow') {
            this.bug = this.physics.add.sprite(50, 550, 'bug_yellow', 0); // create bug before cannon so it's hidden under cannon
        } else {
            this.bug = this.physics.add.sprite(50, 550, 'bug_blue', 0); // create bug before cannon so it's hidden under cannon
        }
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
        this.scoreBar.fillRect(515, 8, 0, 20);

        this.scoreBarBorder = this.add.graphics(); // create score bar border
        this.scoreBarBorder.lineStyle(2, 0xffffff, 1);
        this.scoreBarBorder.strokeRect(515, 8, 200, 20);

        // add text objects
        this.attemptText = this.add.text(100, 5, 'Attempt ' + this.attempt + '/3', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }); 
        if (this.runningTotal != 0) {
            this.requiredText = this.add.text(330, 5, this.needed + ' H-3 needed', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }); 
        } else {
            this.requiredText = this.add.text(330, 5, '20 H-3 needed', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        }
        this.scoreText = this.add.text(720, 5, this.score + '/25', { fontFamily: 'Arial', fontSize: '24px', fill: '#00ffff' });
        this.welcomeText = this.add.text(10, 5, 'Level ' + this.level + ', ', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }); 
        this.winText = this.add.text(this.sys.game.scale.width / 2, this.sys.game.scale.height / 2, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.winText.setOrigin(0.5);
        this.totalText = this.add.text(this.sys.game.scale.width / 2, 350, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.totalText.setOrigin(0.5);
        this.gameOverText = this.add.text(this.sys.game.scale.width / 2, this.sys.game.scale.height / 2, 'GAMEOVER', { fontFamily: 'Arial', fontSize: '50px', fill: '#ff0000' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;

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

        this.soundSatellite = this.sound.add("soundSatellite", { 
            volume: .9, 
            loop: false 
        });

        this.soundCannon = this.sound.add("soundCannon", { 
            volume: .7, 
            loop: false 
        });

        this.soundBorder = this.sound.add("soundBorder", { 
            volume: .3, 
            loop: false 
        });

        this.soundGround = this.sound.add("soundGround", { 
            volume: .3, 
            loop: false 
        });

        this.soundBlackHoleOrSpiral = this.sound.add("soundBlackHoleOrSpiral", { 
            volume: .9, 
            loop: false 
        });

        this.soundH3OrStar = this.sound.add("soundH3OrStar", { 
            volume: .01, 
            loop: false 
        });

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
            this.soundCannon.play();

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
            this.soundBorder.play();
            this.bug.setFrame(4);  // right pose
        } else if (this.bug.body.blocked.right) { // hits right surface
            this.soundBorder.play();
            this.bug.setFrame(3);  // left pose
        } else if (this.bug.body.blocked.up) { // hits top surface
            this.soundBorder.play();
            this.bug.setFrame(2);  // down pose
        }

        // apply more drag when bug's touching a bottom surface
        if (this.bug.body.blocked.down) {
            this.soundGround.play();
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
                if (this.score >= this.needed) { // check for winning level
                    this.soundGround.stop();
                    this.winText.setText('Level ' + this.level + ' Complete!');
                    this.totalText.setText('Average: ' + ( Math.round( ((this.score + this.runningTotal) / (this.levels + 1)) * 10 ) /10 ));
                    this.bug.setFrame(0);
                    this.bug.setTint(0x00ff00);
                    this.physics.pause();
                    this.time.delayedCall(2000, () => {
                        this.scene.start('Level6', { bug: this.bug.texture.key, cumulativeScore: this.score + this.runningTotal, levels: this.levels + 1 }); // start next level after delay
                    });
                } else {
                    // gameover
                    this.soundGround.stop();
                    this.gameOverText.visible = true;
                    this.bug.setFrame(0);
                    this.bug.setTint(0xaaffbb);
                    this.physics.pause();  // pause game

                    // add button
                    this.tryAgainButton = this.add.text(250, 330, 'Try Level ' + this.level + ' Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
                        .setInteractive()
                        .on('pointerup', () => this.scene.start('Level5', { cumulativeScore: 0 }));
                    this.input.on('gameobjectover', (pointer, tryAgainButton) => {
                        tryAgainButton.setTint(0x00ff00);
                        document.body.style.cursor = 'pointer';
                    });
                    this.input.on('gameobjectout', (pointer, tryAgainButton) => {
                        tryAgainButton.clearTint();
                        document.body.style.cursor = 'default';
                    });
                }
            }
            this.canLaunch = true; // bug allowed to launch again
        }
    }
    collecth3(bug, h3) {
        if (!this.canCollect) {
            return;
        }
        this.soundH3OrStar.play();
        h3.disableBody(true, true);  // remove collected h3

        // update score and scorebar
        this.score += 1;
        this.scoreFill += 8;
        this.scoreBar.clear();
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(515, 8, this.scoreFill, 20); // length of bar is determined by score
        this.scoreText.setText(this.score + '/25');   
    }
    hitStar(bug, star) {
        this.soundH3OrStar.play();
        this.attempt -=1;
        star.disableBody(true, true);  // remove star
        this.attemptText.setText('Attempt ' + this.attempt + '/3');
    }
    hitSpiral(bug, spiralGalaxy) {
        this.soundBlackHoleOrSpiral.play();
        this.attempt +=1;
        spiralGalaxy.disableBody(true, true);  // remove star
        this.attemptText.setText('Attempt ' + this.attempt + '/3');
    }
    hitBlackHole(bug, blackHole) {
        this.soundBlackHoleOrSpiral.play();
        this.gameOverText.visible = true;
        bug.setFrame(0);
        bug.setTint(0xaaffbb);
        this.physics.pause();
        const tryAgainButton = this.add.text(250, 330, 'Try Level ' + this.level + ' Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
            .setInteractive()
            .on('pointerup', () => this.scene.start('Level5', { cumulativeScore: 0 }));
    }
    hitSatellite(bug, satellite) { // handle overlap with satellite
        if (!this.canCollect) {
            return;
        }
        this.soundSatellite.play();
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
    calcRequiredScore(total, rounds) {
        for (let i=0; i<=25; i++) {
            if ((total + i)/(rounds + 1) >= 20) {
                return i;
            }
        }
    }
}

export default Level5;
