import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { doc, getFirestore, deleteDoc, addDoc, getDocs, collection, orderBy, limit, query } from 'https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js'

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
        this.documents = [];
        this.leaderboard = [];
        this.replaceIndex = -1;
        this.highScore = false;
        this.add.image(400, 300, 'moonscape');

        this.firebaseConfig = {
            apiKey: "AIzaSyA4-4-i_tblMvRBaz6CMp7C2WqNe4y02oY",
            authDomain: "moonbugs-ff885.firebaseapp.com",
            projectId: "moonbugs-ff885",
            storageBucket: "moonbugs-ff885.appspot.com",
            messagingSenderId: "139146411424",
            appId: "1:139146411424:web:258ad764219fb86d31b8c5"
        };
        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.app);
        this.leadersRef = collection(this.db, "leaderboard");
        this.checkScore();
    }
    async checkScore() {
        // get current leaderboard from database
        this.query = query(this.leadersRef, orderBy("score", "desc"), limit(10));
        this.querySnapshot = await getDocs(this.query);
        this.querySnapshot.forEach((doc) => {
            this.documents.push( doc.id );
            this.leaderboard.push( doc.data() );
        });
        this.forDeletion = this.documents[this.documents.length-1];
        console.log(this.forDeletion);

        // see if/where player's score belongs on leaderboard
        if (this.leaderboard.length == 0 || this.leaderboard.length < 10) {
            this.highScore = true;
        } else if (this.leaderboard.length > 0) {
            for (let i of this.leaderboard) {
                if (this.runningTotal > i.score) {
                    this.highScore = true;
                }
            };
        }
        console.log(this.leaderboard.length, this.highScore);

        if (this.highScore == true) {
            if (this.forDeletion !== undefined && this.leaderboard.length == 10) {
                this.leaderboard.pop();
                await deleteDoc(doc(this.db, "leaderboard", this.forDeletion));
            }
            this.scene.start('HighScore', { leaders: this.leaderboard, bug: this.bug, cumulativeScore: this.runningTotal, leaders: this.leaderboard, outcome: this.outcome });
        } else {
            this.scene.start('GameOver', { bug: this.bug, outcome: this.outcome, level: this.level });
        }
    }
}

export default CheckScore;
