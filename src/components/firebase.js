import firebase from "firebase";

const config = {
  apiKey: "AIzaSyD1UCpu5L54wqZOn89UE5jAGlBWYgKoYXM",
  authDomain: "progress-tracker-13d1c.firebaseapp.com",
  databaseURL: "https://progress-tracker-13d1c.firebaseio.com",
  projectId: "progress-tracker-13d1c",
  storageBucket: "progress-tracker-13d1c.appspot.com",
  messagingSenderId: "742939111596"
};
firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
