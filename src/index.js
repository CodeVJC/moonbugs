import Preload from "./Preload.js";

// Load WebFontLoader
WebFont.load({
    google: {
        families: ['Concert One', 'Rubik Moonrocks']
    },
    active: function() {
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
            scene: [ Preload ],
        };
        new Phaser.Game(config);
    }
});

