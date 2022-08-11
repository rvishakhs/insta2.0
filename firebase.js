// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore";
import { getStorage } from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhM6cq2UBB6awk-3ae7Wdp18TowFxa5nA",
  authDomain: "instagram-3783b.firebaseapp.com",
  projectId: "instagram-3783b",
  storageBucket: "instagram-3783b.appspot.com",
  messagingSenderId: "103617850732",
  appId: "1:103617850732:web:4633cbd48cdcbdde2bd749"
};

// Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage}; 
