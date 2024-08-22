import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, deleteDoc, addDoc, getDocs, collection, orderBy, limit, query, doc } from 'https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyA4-4-i_tblMvRBaz6CMp7C2WqNe4y02oY",
    authDomain: "moonbugs-ff885.firebaseapp.com",
    projectId: "moonbugs-ff885",
    storageBucket: "moonbugs-ff885.appspot.com",
    messagingSenderId: "139146411424",
    appId: "1:139146411424:web:258ad764219fb86d31b8c5"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const leadersRef = collection(db, "leaderboard");

export {app, db, leadersRef};
