// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYWUo-_ofr23Q6hboXIDOBzIRYUCxiISI",
  authDomain: "moringa-records.firebaseapp.com",
  projectId: "moringa-records",
  storageBucket: "moringa-records.appspot.com",
  messagingSenderId: "357732413002",
  appId: "1:357732413002:web:337ef206952d34088a40b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);