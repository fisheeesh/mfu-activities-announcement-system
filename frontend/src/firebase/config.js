import firebase from "firebase/app";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC1X5Oqaqc41zAPnEjHLLTdYzNVm7JMbhM",
    authDomain: "activities-announcement-system.firebaseapp.com",
    projectId: "activities-announcement-system",
    storageBucket: "activities-announcement-system.appspot.com",
    messagingSenderId: "50450329069",
    appId: "1:50450329069:web:60b22fb1d58ec648040be4"
};

firebase.initializeApp(firebaseConfig)

let auth = firebase.auth()

export { auth }