// Import the functions you need from the SDKs you need
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM-FWh-ulSAivKqxUal08-s6XjYhWqkVw",
  authDomain: "mercy-83e7c.firebaseapp.com",
  projectId: "mercy-83e7c",
  storageBucket: "mercy-83e7c.appspot.com",
  messagingSenderId: "1010786945244",
  appId: "1:1010786945244:web:3e8374a58334ebf7580c19",
  measurementId: "G-0QB1N6D7MY"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
}else{
    app = firebase.app()
}

const firestore = firebase.firestore();
export const {updateDoc, arrayUnion} = firebase.firestore()
const auth = firebase.auth();
const {getAuth, deleteUser} = firebase.auth()


export {firestore}
export {auth}

export {deleteUser}
