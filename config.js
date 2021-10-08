import firebase from "firebase";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBM-FWh-ulSAivKqxUal08-s6XjYhWqkVw",
    authDomain: "mercy-83e7c.firebaseapp.com",
    projectId: "mercy-83e7c",
    storageBucket: "mercy-83e7c.appspot.com",
    messagingSenderId: "1010786945244",
    appId: "1:1010786945244:web:3e8374a58334ebf7580c19",
    measurementId: "G-0QB1N6D7MY"
  };

let app;
if(firebase.apps.length === 0 ){
    app = firebase.initializeApp(firebaseConfig)
}else{
    app = firebase.app()
}

const auth = firebase.auth()
export {auth};