// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFfnUzMUCbDGDxDX5UcuP1IgkwdflbarA",
  authDomain: "react-firebase-21e95.firebaseapp.com",
  projectId: "react-firebase-21e95",
  storageBucket: "react-firebase-21e95.firebasestorage.app",
  messagingSenderId: "102886742866",
  appId: "1:102886742866:web:419caa6175024fbeadb88b"
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig);
export const db =  getFirestore(app);