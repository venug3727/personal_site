import { getDatabase, ref, push } from "firebase/database";
import { db } from "../firebase"; // Ensure this points to your Firebase configuration

const addProject = async (projectData) => {
  try {
    const projectsRef = ref(db, "projects"); // Reference to the "projects" node
    const newProjectRef = push(projectsRef); // Create a unique child under "projects"
    await newProjectRef.set(projectData); // Push the project data

    console.log("Project added successfully!");
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

// Example usage:
const newProject = {
  title: "My First Project",
  description: "This is a sample project description.",
  image: "https://example.com/project-image.jpg",
  tags: ["React", "Firebase", "JavaScript"],
  links: {
    demo: "https://example.com/demo",
    github: "https://github.com/example/repo",
  },
};

addProject(newProject);
