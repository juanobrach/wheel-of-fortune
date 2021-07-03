import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAzVTRh-WtVDtnUsCOh8muQjHUmDmDEDXM",
  authDomain: "wheeloffortune-fe46d.firebaseapp.com",
  databaseURL: "https://wheeloffortune-fe46d-default-rtdb.firebaseio.com",
  projectId: "wheeloffortune-fe46d",
  storageBucket: "wheeloffortune-fe46d.appspot.com",
  messagingSenderId: "705755572209",
  appId: "1:705755572209:web:95dad4c590e371f16d8650",
  measurementId: "G-CJH20BKMNT",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
