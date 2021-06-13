import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
const firebaseConfig = {
    apiKey: "AIzaSyB75kXiQijnVt9hVZlzzAx6xt8JMBZpQiU",
    authDomain: "airmonitorgrad.firebaseapp.com",
    projectId: "airmonitorgrad",
    storageBucket: "airmonitorgrad.appspot.com",
    messagingSenderId: "20442912340",
    appId: "1:20442912340:web:c11ac08388629a50b07fc1"
  };
  firebase.initializeApp(firebaseConfig)
export const provider = new firebase.auth.GoogleAuthProvider();  
export const authh = firebase.auth()
export const database = firebase.database()