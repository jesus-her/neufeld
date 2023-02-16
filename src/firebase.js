// Import the functions you need from the SDKs you need
import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAel9AAdGP314zn52NDuo0rTfEn8cYG4Fk",
  authDomain: "neufeld-9b6b8.firebaseapp.com",
  projectId: "neufeld-9b6b8",
  storageBucket: "neufeld-9b6b8.appspot.com",
  messagingSenderId: "235289446135",
  appId: "1:235289446135:web:319f6f7b90efd0f03b35f2",
  measurementId: "G-QB0PTM0MXK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
