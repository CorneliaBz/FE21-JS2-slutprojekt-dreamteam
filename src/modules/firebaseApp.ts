// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3rUxTS6iPrkSzr9GBobGD1dHzaPozg4k",
  authDomain: "dreamteamforum.firebaseapp.com",
  databaseURL: "https://dreamteamforum-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dreamteamforum",
  storageBucket: "dreamteamforum.appspot.com",
  messagingSenderId: "409132805527",
  appId: "1:409132805527:web:09157a56f5a4a1bb76a8d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
