import { getFirestore, deleteDoc, addDoc, getDocs, collection, orderBy, limit, query, doc } from 'https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js';
import { db, app, leadersRef } from './firebaseConfig.js';

class HighScore extends Phaser.Scene {
    constructor () {
        super({ key: 'HighScore' });
        this.eventsAttached = false;
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
        this.leadersPrepped = data.leaders;
        if (data.outcome) {
            this.outcome = 'won';
        }
    }
    create () {
        this.leaderName = '';
        this.add.image(400, 300, 'moonscape');
        this.username = this.add.text(350, 440, '', { fontFamily: 'Concert One', fontSize: '50px', fill: '#00ffff' });

        //  Do this, otherwise this Scene will steal all keyboard input
        this.input.keyboard.enabled = false;
        this.scene.launch('AddName');
        let panel = this.scene.get('AddName');

        //  Listen to events from the AddName scene
        if (!this.eventsAttached) {
            panel.events.on('updateName', this.updateName, this);
            panel.events.on('submitName', this.submitName, this);
            this.eventsAttached = true;
        }
    }
    async addLeaders(addName, addScore) {
        await addDoc(collection(db, "leaderboard"), {
            name: addName,
            score: addScore
        });
        this.getLeaders(addName, addScore);
    }
    async getLeaders(getName, getScore) {
        this.leadersPrepped.push ( {name: getName, score: getScore} );
        this.leadersPrepped.sort( function ( a, b ) { 
            return b.score - a.score;
        } );
        console.log(this.leadersPrepped);
        this.scene.start('Leaderboard', { leadersList: this.leadersPrepped } );
    }
    updateName (name) {
        this.username.setText(name);
    }
    submitName () {
        this.scene.stop('AddName');
        this.leaderName = this.username._text;
        console.log(this.leaderName);
        this.addLeaders(this.leaderName, this.runningTotal);
    }
}

export default HighScore;
