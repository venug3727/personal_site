import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Uses the default credentials from the environment
  storageBucket: "persnal-website-9ab5f.firebasestorage.app", // Replace with your Firebase project's bucket name
});

// Export Firebase services
const db = admin.firestore();

export default { db };
