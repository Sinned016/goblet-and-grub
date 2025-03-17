import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAW8e2VrYE34xi47j-HKtXc-roAsp6zIfE",
  authDomain: "goblet-and-grub.firebaseapp.com",
  projectId: "goblet-and-grub",
  storageBucket: "goblet-and-grub.firebasestorage.app",
  messagingSenderId: "131924751063",
  appId: "1:131924751063:web:410d3fcecfe400842c3692",
  measurementId: "G-WE7VB7F91Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get services
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
