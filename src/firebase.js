// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD94EszsDpMP7OUBCgoal3_EX_YOiZGcwY",
  authDomain: "test1-topaz-eight.vercel.app",
  projectId: "keyrentsale",
  storageBucket: "keyrentsale.appspot.com",
  messagingSenderId: "684791475821",
  appId: "1:684791475821:web:4b939d9193c88c2e6ad964",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
