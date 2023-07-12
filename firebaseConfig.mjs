// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7RpczBMSDfyBXVsITyY_yY2KB6-x_qTk",
  authDomain: "speedy-valor-379408.firebaseapp.com",
  projectId: "speedy-valor-379408",
  storageBucket: "speedy-valor-379408.appspot.com",
  messagingSenderId: "153460609557",
  appId: "1:153460609557:web:97e2064be13fa69989f41c",
  measurementId: "G-KVLRV6N9Z1",
  // there could be other properties depending on the project
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); //Add to Initialize Authentication
export const database = getDatabase(app); //Add to Initialize Reatime Database
export const firestoreDB = getFirestore(app); //Add to Initialize Firestore Database
export const storage = getStorage(app); //Add to Initialize Storage
