// lib/firebaseAdmin.js
import admin, { ServiceAccount } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

if (!admin.apps.length) {
  const serviceAccount: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"), // Important to replace escaped \n with real newlines
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore(); // Firestore reference
const adminAuth = getAuth();

export { db, adminAuth };
