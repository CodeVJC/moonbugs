// create intro (every class after this is a level)
class PreloadScene extends Phaser.Scene {
    preload() {
        this.load.image('moonscape', 'assets/moonscape.png');
    }
    create() {
        this.add.image(400, 300, 'moonscape');

        this.welcomeText = this.add.text(config.width / 2, config.height / 2, 'MOONBUGS', { fontFamily: 'Arial', fontSize: '70px', fill: '#fff'});
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
    preload() {
        this.load.spritesheet('bug', 'assets/bug.png', { frameWidth: 40, frameHeight: 37 });
        this.load.image('h3', 'assets/h3.png');
        this.load.image('cannon', 'assets/cannon.png');
    }
    create() {
        this.level = 1;
        this.attempt = 1;
        this.score = 0;
        this.scoreFill = 0;
        this.canLaunch = true;
        this.canCollect = false;

        this.add.image(400, 300, 'moonscape');

        var x = Phaser.Math.Between(20, 780);
        var y = Phaser.Math.Between(20, 580);
        this.bug = this.physics.add.sprite(x, y, 'bug', 0); // create bug before cannon so it's hidden under cannon
        this.bug.setCollideWorldBounds(true); // stay within boundaries of game   
        this.bug.setVelocity(0, 0);
        this.bug.setBounce(.7);
        this.bug.setDrag(.2);
        this.bug.body.gravity.y = 0;

        this.cannon = this.add.sprite(this.bug.x, this.bug.y, 'cannon');  // create cannon
        this.cannon.setOrigin(0.5, 0.5);  // set rotation axis to center

        this.scoreBar = this.add.graphics(); // create score bar
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(555, 8, 0, 20);

        this.scoreBarBorder = this.add.graphics(); // create score bar border
        this.scoreBarBorder.lineStyle(2, 0xffffff, 1);
        this.scoreBarBorder.strokeRect(555, 8, 160, 20);

        // add text objects
        this.attemptText = this.add.text(15, 5, 'Attempt ' + this.attempt, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }); 
        this.scoreText = this.add.text(720, 5, this.score + '/40', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.welcomeText = this.add.text(350, 300, 'Level ' + this.level, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });  
        this.winText = this.add.text(config.width / 2, config.height / 2, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.winText.setOrigin(0.5);
        this.gameOverText = this.add.text(config.width / 2, config.height / 2, 'GAMEOVER', { fontFamily: 'Arial', fontSize: '50px', fill: '#ff0000' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;

        // create h3 molecules
        this.h3 = this.physics.add.group();
        for (let i = 0; i < 50; i++) {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);
            this.h3.create(x, y, 'h3');
        };

        // pointer move event listener to rotate the cannon toward the pointer
        this.input.on('pointermove', function (pointer) {
            const angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);
            this.cannon.setRotation(angle);
        }, this);

        // pointer up event listener to launch bug in direction cannon is facing
        this.input.on('pointerup', function (pointer) {
            // only works if canLaunch is true
            if (!this.canLaunch) return;          

            // add overlap check between bug and h3
            this.physics.add.overlap(this.bug, this.h3, this.collecth3, null, this);

            this.time.delayedCall(750, () => {
                this.cannon.setVisible(false);  // remove cannon after delay
            });

            // calculate distance between cannon and pointer
            const distance = Phaser.Math.Distance.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);

            // normalize this distance to suitable range for speed
            const minDistance = 0;  // min distance
            const maxDistance = 800;  // max distance
            const minSpeed = 200;  // min speed
            const maxSpeed = 800;  // max speed
            const speed = Phaser.Math.Percent(distance, minDistance, maxDistance) * (maxSpeed - minSpeed) + minSpeed;

            // only access collecth3 logic after delay, to prevent collecting h3 while still inside cannon
            // faster speeds will enable collection sooner, since bug leaves cannon sooner
            if (speed < 300) {
                this.time.delayedCall(250, () => {
                    this.canCollect = true;
                });
            } else if (speed < 400) {
                this.time.delayedCall(150, () => {
                    this.canCollect = true;
                });   
            } else if (speed < 500) {
                this.time.delayedCall(100, () => {
                    this.canCollect = true;
                });  
            } else {
                this.time.delayedCall(75, () => {
                    this.canCollect = true;
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
            this.bug.setDragX(100);
        } else {
            this.bug.setDragX(0.2);
        }

        // check if bug's touching a bottom surface with no horizontal velocity
        // and prevent glitch where touching h3 fulfills those conditions before this.canCollect is set to true
        if (this.bug.body.blocked.down && this.bug.body.velocity.x === 0 && this.canCollect == true) {
            if (this.attempt < 3) {
                this.canCollect = false; // don't allow collection of h3 until following next launch

                // reset bug and cannon
                var x = Phaser.Math.Between(20, 780);
                var y = Phaser.Math.Between(20, 580);
                this.bug.setPosition(x, y);
                this.bug.setVelocity(0, 0);
                this.bug.body.gravity.y = 0;
                this.cannon.setVisible(true);
                this.cannon.setPosition(this.bug.x, this.bug.y);

                this.attempt += 1; // update attempt
                this.attemptText.setText('Attempt ' + this.attempt);
            } else {
                // gameover
                this.gameOverText.visible = true;
                this.bug.setFrame(0);
                this.bug.setTint(0xaaffbb);
                this.physics.pause();  // pause game

                // add button
                const tryAgainButton = this.add.text(250, 330, 'Try Level 1 Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
                    .setInteractive()
                    .on('pointerup', () => this.scene.start('Level1'));
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
        this.scoreFill += 4;

        if (this.score > 0) {
            this.welcomeText.visible = false; // once a score's on the board, remove welcome text
        }
        this.scoreBar.clear();
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(555, 8, this.scoreFill, 20); // length of bar is determined by score

        if (this.score <= 40) {
            this.scoreText.setText(this.score + '/40');            
        }

        if (this.score == 40) { // check for winning level
            this.winText.setText('Level 1 Complete!');
            this.bug.setFrame(0);
            this.bug.setTint(0x00ff00);
            this.physics.pause();
            this.time.delayedCall(2000, () => {
                this.scene.start('Level2'); // start next level after delay
            });
        }
    }
}

class Level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2' });
    }
    preload() {
        this.load.spritesheet('bug', 'assets/bug.png', { frameWidth: 40, frameHeight: 37 });
        this.load.image('h3', 'assets/h3.png');
        this.load.image('cannon', 'assets/cannon.png');
        this.load.spritesheet('satellite', 'assets/satellite.png', { frameWidth: 128, frameHeight: 111 });
    }
    create() {
        this.level = 2;
        this.attempt = 1;
        this.score = 0;
        this.scoreFill = 0;
        this.canLaunch = true;
        this.canCollect = false;

        this.add.image(400, 300, 'moonscape');

        // create satellites
        var a = Phaser.Math.Between(100, 700);
        var b = Phaser.Math.Between(100, 500);
        var c = Phaser.Math.Between(0, 3);
        var x = Phaser.Math.Between(100, 700);
        var y = Phaser.Math.Between(100, 500);
        var z = Phaser.Math.Between(0, 3);
        this.satellite1 = this.physics.add.staticSprite(a, b, 'satellite', c);
        this.satellite2 = this.physics.add.staticSprite(x, y, 'satellite', z);

        var x = Phaser.Math.Between(20, 780);
        var y = Phaser.Math.Between(20, 580);
        this.bug = this.physics.add.sprite(x, y, 'bug', 0);
        this.bug.setCollideWorldBounds(true);   
        this.bug.setVelocity(0, 0);
        this.bug.setBounce(.7);
        this.bug.setDrag(.2);
        this.bug.body.gravity.y = 0;

        this.cannon = this.add.sprite(this.bug.x, this.bug.y, 'cannon');
        this.cannon.setOrigin(0.5, 0.5);

        this.bug.setPosition(this.cannon.x, this.cannon.y);

        this.scoreBar = this.add.graphics();
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(555, 8, 0, 20);

        this.scoreBarBorder = this.add.graphics();
        this.scoreBarBorder.lineStyle(2, 0xffffff, 1);
        this.scoreBarBorder.strokeRect(555, 8, 160, 20);

        this.attemptText = this.add.text(15, 5, 'Attempt ' + this.attempt, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }); 
        this.scoreText = this.add.text(720, 5, this.score + '/40', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.welcomeText = this.add.text(350, 300, 'Level ' + this.level, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });  
        this.winText = this.add.text(config.width / 2, config.height / 2, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.winText.setOrigin(0.5);
        this.gameOverText = this.add.text(config.width / 2, config.height / 2, 'GAMEOVER', { fontFamily: 'Arial', fontSize: '50px', fill: '#ff0000' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;

        this.h3 = this.physics.add.group();
        for (let i = 0; i < 50; i++) {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);
            this.h3.create(x, y, 'h3');
        };

        this.input.on('pointermove', function (pointer) {
            const angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);
            this.cannon.setRotation(angle);
        }, this);

        this.input.on('pointerup', function (pointer) {
            if (!this.canLaunch) return;        

            this.physics.add.overlap(this.bug, this.h3, this.collecth3, null, this);

            // create overlaps between bug and satellites
            this.physics.add.overlap(this.bug, this.satellite1, this.hitSatellite, null, this);
            this.physics.add.overlap(this.bug, this.satellite2, this.hitSatellite, null, this);

            this.time.delayedCall(750, () => {
                this.cannon.setVisible(false);
            });

            const distance = Phaser.Math.Distance.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);

            const minDistance = 0;
            const maxDistance = 800;
            const minSpeed = 200;
            const maxSpeed = 800;
            const speed = Phaser.Math.Percent(distance, minDistance, maxDistance) * (maxSpeed - minSpeed) + minSpeed;
            if (speed < 300) {
                this.time.delayedCall(250, () => {
                    this.canCollect = true;
                });
            } else if (speed < 400) {
                this.time.delayedCall(150, () => {
                    this.canCollect = true;
                });   
            } else if (speed < 500) {
                this.time.delayedCall(100, () => {
                    this.canCollect = true;
                });  
            } else {
                this.time.delayedCall(75, () => {
                    this.canCollect = true;
                });  
            }
            const velocity = this.physics.velocityFromRotation(this.cannon.rotation, speed);
            this.bug.setFrame(0);
            this.bug.setVelocity(velocity.x, velocity.y);
            this.bug.body.gravity.y = 150;

            this.canLaunch = false;
        }, this);
    }
    update() {
        if (this.bug.body.blocked.left) {
            this.bug.setFrame(4);
        } else if (this.bug.body.blocked.right) {
            this.bug.setFrame(3);
        } else if (this.bug.body.blocked.up) {
            this.bug.setFrame(2);
        }

        if (this.bug.body.blocked.down) {
            this.bug.setDragX(100);
        } else {
            this.bug.setDragX(0.2);
        }

        if (this.bug.body.blocked.down && this.bug.body.velocity.x === 0 && this.canCollect == true) {
            if (this.attempt < 3) {
                this.canCollect = false;

                var x = Phaser.Math.Between(20, 780);
                var y = Phaser.Math.Between(20, 580);
                this.bug.setPosition(x, y);
                this.bug.setVelocity(0, 0);
                this.bug.body.gravity.y = 0;
                this.cannon.setVisible(true);
                this.cannon.setPosition(this.bug.x, this.bug.y);
                this.attempt += 1;
                this.attemptText.setText('Attempt ' + this.attempt);
            } else {
                this.gameOverText.visible = true;
                this.bug.setFrame(0);
                this.bug.setTint(0xaaffbb);
                this.physics.pause();
                const tryAgainButton = this.add.text(250, 330, 'Try Level 2 Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
                    .setInteractive()
                    .on('pointerup', () => this.scene.start('Level2'));
            }
            this.canLaunch = true;
        }
    }
    collecth3(bug, h3) {
        if (!this.canCollect) {
            return;
        }
        h3.disableBody(true, true);

        this.score += 1;
        this.scoreFill += 4;

        if (this.score > 0) {
            this.welcomeText.visible = false;
        }
        this.scoreBar.clear();
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(555, 8, this.scoreFill, 20);

        if (this.score <= 40) {
            this.scoreText.setText(this.score + '/40');            
        }

        if (this.score == 40) {
            this.winText.setText('Level 2 Complete!');
            this.bug.setFrame(0);
            this.bug.setTint(0x00ff00);
            this.physics.pause();
            this.time.delayedCall(2000, () => {
                this.scene.start('Level3');
            });
        }
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

class Level3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Level3' });
    }
    preload() {
        this.load.spritesheet('bug', 'assets/bug.png', { frameWidth: 40, frameHeight: 37 });
        this.load.image('h3', 'assets/h3.png');
        this.load.image('cannon', 'assets/cannon.png');
        this.load.spritesheet('satellite', 'assets/satellite.png', { frameWidth: 128, frameHeight: 111 });
        this.load.image('horizontal', 'assets/horizontal.png');
        this.load.image('vertical', 'assets/vertical.png');
    }
    create() {
        this.level = 3;
        this.attempt = 1;
        this.score = 0;
        this.scoreFill = 0;
        this.canLaunch = true;
        this.canCollect = false;

        this.add.image(400, 300, 'moonscape');

        var a = Phaser.Math.Between(100, 700);
        var b = Phaser.Math.Between(100, 500);
        var c = Phaser.Math.Between(0, 3);
        var x = Phaser.Math.Between(100, 700);
        var y = Phaser.Math.Between(100, 500);
        var z = Phaser.Math.Between(0, 3);
        this.satellite1 = this.physics.add.staticSprite(a, b, 'satellite', c);
        this.satellite2 = this.physics.add.staticSprite(x, y, 'satellite', z);

        // create horizontal barrier
        this.horizontal = this.physics.add.staticGroup();
        for (let i = 0; i < 2; i++) {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);
            this.horizontal.create(x, y, 'horizontal');
        }

        // create vertical barrier
        this.vertical = this.physics.add.staticGroup();
        for (let i = 0; i < 2; i++) {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);
            this.vertical.create(x, y, 'vertical');
        }

        var x = Phaser.Math.Between(20, 780);
        var y = Phaser.Math.Between(20, 580);
        this.bug = this.physics.add.sprite(x, y, 'bug', 0);
        this.bug.setCollideWorldBounds(true);
        this.bug.setVelocity(0, 0);
        this.bug.setBounce(.7);
        this.bug.setDrag(.2);
        this.bug.body.gravity.y = 0;

        this.cannon = this.add.sprite(this.bug.x, this.bug.y, 'cannon');
        this.cannon.setOrigin(0.5, 0.5);

        this.bug.setPosition(this.cannon.x, this.cannon.y);

        // add collision check between bug and horizontals and verticals and de-activate them until launch
        this.colliderHorizontal = this.physics.add.collider(this.bug, this.horizontal);
        this.colliderVertical = this.physics.add.collider(this.bug, this.vertical);
        this.colliderHorizontal.active = false;
        this.colliderVertical.active = false;

        this.scoreBar = this.add.graphics();
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(555, 8, 0, 20);

        this.scoreBarBorder = this.add.graphics();
        this.scoreBarBorder.lineStyle(2, 0xffffff, 1);
        this.scoreBarBorder.strokeRect(555, 8, 160, 20);

        this.attemptText = this.add.text(15, 5, 'Attempt ' + this.attempt, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' }); 
        this.scoreText = this.add.text(720, 5, this.score + '/40', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.welcomeText = this.add.text(350, 300, 'Level ' + this.level, { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });  
        this.winText = this.add.text(config.width / 2, config.height / 2, '', { fontFamily: 'Arial', fontSize: '24px', fill: '#fff' });
        this.winText.setOrigin(0.5);
        this.gameOverText = this.add.text(config.width / 2, config.height / 2, 'GAMEOVER', { fontFamily: 'Arial', fontSize: '50px', fill: '#ff0000' });
        this.gameOverText.setOrigin(0.5);
        this.gameOverText.visible = false;

        this.h3 = this.physics.add.group();
        for (let i = 0; i < 50; i++) {
            var x = Phaser.Math.Between(0, 800);
            var y = Phaser.Math.Between(0, 600);
            this.h3.create(x, y, 'h3');
        };

        this.input.on('pointermove', function (pointer) {
            const angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);
            this.cannon.setRotation(angle);
        }, this);

        this.input.on('pointerup', function (pointer) {
            if (!this.canLaunch) return;     

            this.physics.add.overlap(this.bug, this.h3, this.collecth3, null, this);

            this.physics.add.overlap(this.bug, this.satellite1, this.hitSatellite, null, this);
            this.physics.add.overlap(this.bug, this.satellite2, this.hitSatellite, null, this);

            this.time.delayedCall(750, () => {
                this.cannon.setVisible(false);
            });

            const distance = Phaser.Math.Distance.Between(this.cannon.x, this.cannon.y, pointer.x, pointer.y);

            const minDistance = 0;
            const maxDistance = 800;
            const minSpeed = 200;
            const maxSpeed = 800;
            const speed = Phaser.Math.Percent(distance, minDistance, maxDistance) * (maxSpeed - minSpeed) + minSpeed;
            if (speed < 300) {
                this.time.delayedCall(250, () => {
                    this.canCollect = true;
                    this.colliderHorizontal.active = true;
                    this.colliderVertical.active = true;
                });
            } else if (speed < 400) {
                this.time.delayedCall(150, () => {
                    this.canCollect = true;
                    this.colliderHorizontal.active = true;
                    this.colliderVertical.active = true;
                });   
            } else if (speed < 500) {
                this.time.delayedCall(100, () => {
                    this.canCollect = true;
                    this.colliderHorizontal.active = true;
                    this.colliderVertical.active = true;
                });  
            } else {
                this.time.delayedCall(75, () => {
                    this.canCollect = true;
                    this.colliderHorizontal.active = true;
                    this.colliderVertical.active = true;
                });  
            }
            const velocity = this.physics.velocityFromRotation(this.cannon.rotation, speed);
            this.bug.setFrame(0);
            this.bug.setVelocity(velocity.x, velocity.y);
            this.bug.body.gravity.y = 150;

            this.canLaunch = false;
        }, this);
    }
    update() {
        if (this.bug.body.blocked.left) {
            this.bug.setFrame(4);
        } else if (this.bug.body.blocked.right) {
            this.bug.setFrame(3);
        } else if (this.bug.body.blocked.up) {
            this.bug.setFrame(2);
        }

        if (this.bug.body.blocked.down) {
            this.bug.setDragX(100);
        } else {
            this.bug.setDragX(0.2);
        }

        if (this.bug.body.blocked.down && this.bug.body.velocity.x === 0 && this.canCollect == true) {
            if (this.attempt < 3) {
                this.canCollect = false;
                // don't allow collisions with barriers until next launch
                this.colliderHorizontal.active = false;
                this.colliderVertical.active = false;

                var x = Phaser.Math.Between(20, 780);
                var y = Phaser.Math.Between(20, 580);
                this.bug.setPosition(x, y);
                this.bug.setVelocity(0, 0);
                this.bug.body.gravity.y = 0;
                this.cannon.setVisible(true);
                this.cannon.setPosition(this.bug.x, this.bug.y);
                this.attempt += 1;
                this.attemptText.setText('Attempt ' + this.attempt);
            } else {
                this.gameOverText.visible = true;
                this.bug.setFrame(0);
                this.bug.setTint(0xaaffbb);
                this.physics.pause();
                const tryAgainButton = this.add.text(250, 330, 'Try Level 3 Again?', { fontFamily: 'Arial', fontSize: '36px', fill: '#0f0', backgroundColor: 'black'})
                    .setInteractive()
                    .on('pointerup', () => this.scene.start('Level3'));
            }
            this.canLaunch = true;
        }
    }
    collecth3(bug, h3) {
        if (!this.canCollect) {
            return;
        }
        h3.disableBody(true, true);

        this.score += 1;
        this.scoreFill += 4;

        if (this.score > 0) {
            this.welcomeText.visible = false;
        }
        this.scoreBar.clear();
        this.scoreBar.fillStyle(0x00ff00, 1);
        this.scoreBar.fillRect(555, 8, this.scoreFill, 20);

        if (this.score <= 40) {
            this.scoreText.setText(this.score + '/40');            
        }

        if (this.score == 40) {
            this.winText.setText('Level 3 Complete!');
            this.bug.setFrame(0);
            this.bug.setTint(0x00ff00);
            this.physics.pause();
        }
    }
    hitSatellite(bug, satellite) {
        if (!this.canCollect) {
            return;
        }
        satellite.disableBody(true, true);
        if (satellite.frame.name == 0) {
            bug.body.velocity.y += -700;
        } else if (satellite.frame.name == 1) {
            bug.body.velocity.y += 700;
        } else if (satellite.frame.name == 2) {
            bug.body.velocity.x += -700;
        } else {
            bug.body.velocity.x += 700;
        }
    }
}

// create game config and game
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        }
    },
    scene: [PreloadScene, Level1, Level2, Level3],
};

const game = new Phaser.Game(config);
