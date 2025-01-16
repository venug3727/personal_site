import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this path points to your Firebase configuration file

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchProjects = async () => {
    try {
      const projectsRef = collection(db, "project"); // Reference to the "projects" collection in Firestore
      const querySnapshot = await getDocs(projectsRef);

      if (!querySnapshot.empty) {
        const projectData = [];
        querySnapshot.forEach((doc) => {
          const project = doc.data();
          console.log("Fetched Project:", project); // Log each project
          projectData.push({
            id: doc.id,
            ...project,
          });
        });
        setProjects(projectData);
      } else {
        console.log("No projects found.");
        setError("No projects available.");
      }
    } catch (err) {
      console.error("Error fetching data from Firestore:", err);
      setError("Error fetching projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch data on component mount
  }, []);

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Featured Projects
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading projects...
          </p>
        ) : error ? (
          <p className="text-center text-red-600 dark:text-red-400">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={project.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.imageLink || "/placeholder-image.png"} // Fallback for missing image
                      alt={project.title || "Project Image"} // Fallback for missing title
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {project.title || "Untitled Project"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description || "No description available."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags && project.tags.length > 0 ? (
                        project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          No tags available
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-4">
                      {project.links?.demo ? (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Demo
                        </a>
                      ) : (
                        <span className="text-gray-500">No Demo</span>
                      )}
                      {project.links?.github ? (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </a>
                      ) : (
                        <span className="text-gray-500">No Code</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">
                No projects available.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
