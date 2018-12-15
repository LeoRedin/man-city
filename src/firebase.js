import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyB_6aLsSpO3FGMeM8PDshCJ_AuVSqkUGZs",
    authDomain: "team-de794.firebaseapp.com",
    databaseURL: "https://team-de794.firebaseio.com",
    projectId: "team-de794",
    storageBucket: "team-de794.appspot.com",
    messagingSenderId: "982376324643"
};
firebase.initializeApp(config);

const firebaseDB = firebase.database();

const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");

export {
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers,
    firebaseDB
};
