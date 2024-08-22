import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, addDoc, getDocs, collection, orderBy, limit, query, doc, deleteDoc } from 'https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js'

class HighScore extends Phaser.Scene {
    constructor () {
        super({ key: 'HighScore' });
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
        this.leaders = data.leaders;
        if (data.outcome) {
            this.outcome = 'won';
        }
    }
    create () {
        this.name = '';
        this.add.image(400, 300, 'moonscape');
        this.username = this.add.text(350, 440, '', { fontFamily: 'Concert One', fontSize: '50px', fill: '#00ffff' });

        //  Do this, otherwise this Scene will steal all keyboard input
        this.input.keyboard.enabled = false;

        this.scene.launch('AddName');
        let panel = this.scene.get('AddName');
        //  Listen to events from the AddName scene
        panel.events.on('updateName', this.updateName, this);
        panel.events.on('submitName', this.submitName, this);

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
    }
    async addLeaders(name, score) {
        await addDoc(collection(this.db, "leaderboard"), {
            name: name,
            score: score
        });
        this.getLeaders(name, score);
    }
    async getLeaders(name, score) {
        this.leaders.push ( {name: name, score: score} );
        this.leaders.sort( function ( a, b ) { 
            return b.score - a.score;
        } );
        console.log(this.leaders);
        this.scene.start('Leaderboard', { leaders: this.leaders } );
    }
    updateName (name) {
        this.username.setText(name);
    }
    submitName () {
        this.scene.stop('AddName');
        this.name = this.username._text;
        console.log(this.name);
        this.addLeaders(this.name, this.runningTotal);
    }
}

export default HighScore;
