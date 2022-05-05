// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig: object = {
  apiKey: "AIzaSyC3rUxTS6iPrkSzr9GBobGD1dHzaPozg4k",
  authDomain: "dreamteamforum.firebaseapp.com",
  databaseURL: "https://dreamteamforum-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dreamteamforum",
  storageBucket: "dreamteamforum.appspot.com",
  messagingSenderId: "409132805527",
  appId: "1:409132805527:web:09157a56f5a4a1bb76a8d2"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const db: Database = getDatabase(app);
