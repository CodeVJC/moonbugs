import HighScore from "./HighScore.js";
import GameOver from "./GameOver.js";
import { getFirestore, deleteDoc, addDoc, getDocs, collection, orderBy, limit, query, doc } from 'https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js';
import { app, db, leadersRef } from './firebaseConfig.js';

class CheckScore extends Phaser.Scene {
    constructor() {
        super({ key: 'CheckScore' });
    }
    init (data) {
        if (data.bug == 'red') {
            this.bug = 'red';
        } else if (data.bug == 'yellow') {
            this.bug = 'yellow';
        } else {
            this.bug = 'blue';
        }
        this.runningTotal = data.cumulativeScore;
        this.level = data.level;
        if (data.outcome) {
            this.outcome = 'won';
        } else {
            this.outcome = '';
        }
    }
    create() {
        if (!this.scene.manager.getScene('HighScore') && !this.scene.manager.getScene('GameOver')) {
            this.scene.add('HighScore', HighScore);
            this.scene.add('GameOver', GameOver);
        }
        this.documents = [];
        this.leaderboard = [];
        this.replaceIndex = -1;
        this.highScore = false;
        this.add.image(400, 300, 'moonscape');
        this.checkScore();
    }
    async checkScore() {
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
            this.scene.start('HighScore', { leaders: this.leaderboard, bug: this.bug, cumulativeScore: this.runningTotal, leaders: this.leaderboard, outcome: this.outcome });
        } else {
            this.scene.start('GameOver', { bug: this.bug, outcome: this.outcome, level: this.level });
        }
    }
}

export default CheckScore;
