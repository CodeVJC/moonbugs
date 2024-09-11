import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import config from "../config.js";

const app = initializeApp(config);
const db = getFirestore(app);
const leadersRef = collection(db, "leaderboard");

export {db, leadersRef};
