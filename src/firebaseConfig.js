import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, deleteDoc, addDoc, getDocs, collection, orderBy, limit, query, doc } from 'https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js'
//import firebaseConfig from "../config.js";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const leadersRef = collection(db, "leaderboard");

export {app, db, leadersRef};
