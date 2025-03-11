// lib/firebaseAdmin.js
import admin from "firebase-admin";
import path from "path";
import serviceAccount from "../firebase-service-account.json";

if (!admin.apps.length) {
  // Initialize Firebase Admin SDK with the service account JSON file
  admin.initializeApp({
    credential: admin.credential.cert(
      path.join(process.cwd(), "firebase-service-account.json") // Going up one level to the root
    ),
  });
}

const db = admin.firestore(); // Firestore reference
const auth = admin.auth(); // Firebase Auth reference

export { db, auth };
