import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJZ2IJDpHde5olrrPsHYHOCIMN6fYsUDM",
  authDomain: "allison-internship-summarist.firebaseapp.com",
  projectId: "allison-internship-summarist",
  storageBucket: "allison-internship-summarist.firebasestorage.app",
  messagingSenderId: "82497534511",
  appId: "1:82497534511:web:655a5ecadac272489ce4da",
  measurementId: "G-QWXCWP6HLE"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
