// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "event-scheduler-3d9c6.firebaseapp.com",
  projectId: "event-scheduler-3d9c6",
  storageBucket: "event-scheduler-3d9c6.appspot.com",
  messagingSenderId: "322531263408",
  appId: "1:322531263408:web:44dcaa50191456348d0c75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Auth = getAuth(app);
const Provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { Auth, Provider, db };
