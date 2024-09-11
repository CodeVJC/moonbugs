import HighScore from "./HighScore.js";
import GameOver from "./GameOver.js";
import { deleteDoc, getDocs, orderBy, limit, query, doc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { db, leadersRef } from './firebaseConfig.js';

class CheckScore extends Phaser.Scene {
    constructor() {
        super({ key: 'CheckScore' });
    }
    init (data) {
        if (data.bugColor == 'red') {
            this.bugColor = 'red';
        } else if (data.bugColor == 'yellow') {
            this.bugColor = 'yellow';
        } else {
            this.bugColor = 'blue';
        }
        this.runningTotal = data.cumulativeScore;
        if (data.levels) {
            this.levels = data.levels;
        }
        this.level = data.level;
    }
    create() {
        console.log('arrived at CheckScore scene');
        this.checkScoreCalled = false;
        if (!this.scene.manager.getScene('HighScore') && !this.scene.manager.getScene('GameOver')) {
            this.scene.add('HighScore', HighScore);
            this.scene.add('GameOver', GameOver);
        }
        this.documents = [];
        this.leaderboard = [];
        this.replaceIndex = -1;
        this.highScore = false;
        this.add.image(400, 300, 'moonscape');
        this.events.once('start', this.checkScore, this);
        this.events.emit('start');
    }
    async checkScore() {
        if (this.checkScoreCalled) return;
        this.checkScoreCalled = true;
        console.log("checkScore called");
        this.documents = [];
        this.leaderboard = [];
        // get current leaderboard from database
        this.query = query(leadersRef, orderBy("score", "desc"), limit(10));
        this.querySnapshot = await getDocs(this.query);
        this.querySnapshot.forEach((doc) => {
            this.documents.push( doc.id );
            this.leaderboard.push( doc.data() );
        });
        this.forDeletion = this.documents[this.documents.length-1];
        console.log(this.forDeletion);

        // see if/where player's score belongs on leaderboard
        if (this.leaderboard.length < 10) {
            this.highScore = true;
        } else if (this.leaderboard.length == 10) {
            for (let i of this.leaderboard) {
                if (this.runningTotal > i.score) {
                    this.highScore = true;
                }
            };
        }
        console.log(this.leaderboard.length, this.highScore);

        if (this.highScore == true) {
            if (this.leaderboard.length == 10) {
                this.leaderboard.pop();
                await deleteDoc(doc(db, "leaderboard", this.forDeletion));
            }
            this.scene.start('HighScore', { leaders: this.leaderboard, bugColor: this.bugColor, cumulativeScore: this.runningTotal, leaders: this.leaderboard, levels: this.levels, level: this.level });
        } else {
            this.scene.start('GameOver', { bugColor: this.bugColor, levels: this.levels, level: this.level });
        }
    }
}

export default CheckScore;
