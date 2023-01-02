import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCLtYjaVlLZjpp-HSlP5Tg_un4bKZQb5RY",
  authDomain: "dash-dev-deb52.firebaseapp.com",
  projectId: "dash-dev-deb52",
  storageBucket: "dash-dev-deb52.appspot.com",
  messagingSenderId: "165301443999",
  appId: "1:165301443999:web:0e01219d18aaefa7aa71aa",
  measurementId: "G-9K2FFB0TJ9",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  provider,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
  getDocs,
};
