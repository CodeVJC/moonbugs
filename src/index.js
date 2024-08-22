import Preload from "./Preload.js";
import ChoosePlayer from "./ChoosePlayer.js";
import CheckScore from "./CheckScore.js";
import HighScore from "./HighScore.js";
import AddName from "./AddName.js";
import GameOver from "./GameOver.js";
import Leaderboard from "./Leaderboard.js";
import Level1 from "./Level1.js";
import Level2 from "./Level2.js";
import Level3 from "./Level3.js";
import Level4 from "./Level4.js";
import Level5 from "./Level5.js";
import Level6 from "./Level6.js";
import Level7 from "./Level7.js";

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
    scene: [ Preload, ChoosePlayer, Level1, Level2, Level3, Level4, Level5, Level6, Level7, CheckScore, HighScore, AddName, GameOver, Leaderboard ],
};

new Phaser.Game(config);