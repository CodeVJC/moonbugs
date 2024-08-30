import Leaderboard from "./Leaderboard.js";
import AddName from "./AddName.js";
import { getFirestore, deleteDoc, addDoc, getDocs, collection, orderBy, limit, query, doc } from 'https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js';
import { app, db, leadersRef } from './firebaseConfig.js';

class HighScore extends Phaser.Scene {
    constructor () {
        super({ key: 'HighScore' });
        this.eventsAttached = false;
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
        this.leadersPrepped = data.leaders;
        if (data.outcome) {
            this.outcome = 'won';
        }
        this.level = data.level;
    }
    create () {
        if (!this.scene.manager.getScene('Leaderboard') && !this.scene.manager.getScene('AddName')) {
            this.scene.add('Leaderboard', Leaderboard);
            this.scene.add('AddName', AddName);
        }
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
    async addLeader(addName, addScore) {
        await addDoc(leadersRef, {
            name: addName,
            score: addScore
        });
        this.getLeaders(addName, addScore);
    }
    getLeaders(getName, getScore) {
        this.leadersPrepped.push( {name: getName, score: getScore} );
        this.leadersPrepped.sort( function ( a, b ) { 
            return b.score - a.score;
        } );
        console.log(this.leadersPrepped);
        for (let i=9; i>=0; i--) {
            if (this.leadersPrepped[i].name == getName && this.leadersPrepped[i].score == getScore) {
                this.specialIndex = i;
                break;
            }
        }
        this.scene.start('Leaderboard', { leadersList: this.leadersPrepped, level: this.level, specialIndex: this.specialIndex } );
    }
    updateName(name) {
        this.username.setText(name);
    }
    submitName() {
        this.scene.stop('AddName');
        this.leaderName = this.username._text;
        console.log(this.leaderName);
        this.addLeader(this.leaderName, this.runningTotal);
    }
}

export default HighScore;
