import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS27RDZrx72z7QwnedhX7iVkLXJW4t4Oc",
  authDomain: "persnal-website-9ab5f.firebaseapp.com",
  projectId: "persnal-website-9ab5f",
  storageBucket: "persnal-website-9ab5f.appspot.com",
  messagingSenderId: "135506035497",
  appId: "1:135506035497:web:62199e679d661e2b3d6d38",
  measurementId: "G-2KE6NK0XY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };

// Fetching data from Firestore as a test
const fetchProjects = async () => {
  try {
    const projectsCol = collection(db, "projects"); // Get the "projects" collection
    const snapshot = await getDocs(projectsCol); // Fetch documents from the collection
    const projectData = [];

    snapshot.forEach((doc) => {
      projectData.push({
        id: doc.id, // Firestore document ID
        ...doc.data(), // Get the document data
      });
    });

    if (projectData.length > 0) {
      console.log("Fetched Projects:", projectData);
    } else {
      console.log("No data available in projects.");
    }
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
  }
};

// Call this function to test the data fetch
fetchProjects();
