// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgm4VT5qoIXFu-Bs0w49ffXecH10TipYc",
  authDomain: "todolist-d8fa2.firebaseapp.com",
  projectId: "todolist-d8fa2",
  storageBucket: "todolist-d8fa2.appspot.com",
  messagingSenderId: "346028755475",
  appId: "1:346028755475:web:be8f85196f2997aea80de6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
