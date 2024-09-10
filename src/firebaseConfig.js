import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, deleteDoc, addDoc, getDocs, collection, orderBy, limit, query, doc } from 'https://www.gstatic.com/firebasejs/10.13/firebase-firestore.js'
import config from "../config.js";

const app = initializeApp(config);

const db = getFirestore(app);
const leadersRef = collection(db, "leaderboard");

export {app, db, leadersRef};
