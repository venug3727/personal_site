import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const projectsRef = collection(db, "project");
      const querySnapshot = await getDocs(projectsRef);

      if (!querySnapshot.empty) {
        const projectData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectData);
      } else {
        setError("No projects available.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore my technical craftsmanship through these highlighted works
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 text-xl flex items-center justify-center gap-2">
              <span className="text-2xl">⚠️</span>
              {error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={project.imageLink || "/placeholder-project.png"}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags?.map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 rounded-full backdrop-blur-sm"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex gap-4">
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {project.links?.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                    <Link
                      to={`/projects/${project.id}`}
                      className="group-hover:text-blue-500 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-xl">
              🚧 Projects under construction - check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
