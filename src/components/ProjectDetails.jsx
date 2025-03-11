import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExternalLink, Github, Globe } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Helper function to extract Google Drive ID
const extractDriveId = (url) => {
  const match = url.match(/\/d\/([^\/]+)/);
  return match ? match[1] : null;
};

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, "project", projectId);
        const docSnap = await getDoc(projectRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("Project not found");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Slider settings for the image carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400 text-xl">⚠️ {error}</p>
      </div>
    );
  }

  const driveVideoId = project.videoLink
    ? extractDriveId(project.videoLink)
    : null;
  const driveDemoId = project.links?.demo
    ? extractDriveId(project.links.demo)
    : null;

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => window.history.back()}
          className="mb-8 text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Projects
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6">
          {/* Video Section */}
          {driveVideoId && (
            <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
              <iframe
                src={`https://drive.google.com/file/d/${driveDemoId}/preview`}
                className="w-full h-full"
                allowFullScreen
                title={project.title}
                frameBorder="0"
                scrolling="no"
                style={{ overflow: "hidden" }}
              />
            </div>
          )}

          {/* Image Section */}
          <div className="relative h-96 overflow-hidden rounded-xl mb-6">
            <Slider {...sliderSettings}>
              {project.imageLinks?.map((imageLink, index) => (
                <div key={index}>
                  <img
                    src={imageLink}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
            {project.description}
          </p>

          {/* Live Demo Section */}
          {driveDemoId && (
            <div className="relative aspect-video overflow-hidden rounded-xl mb-6">
              <iframe
                src={`https://drive.google.com/file/d/${driveDemoId}/preview`}
                className="w-full h-full"
                allowFullScreen
                title="Live Demo"
                frameBorder="0"
                scrolling="no"
                style={{ overflow: "hidden" }}
              />
            </div>
          )}

          <div className="flex gap-4">
            {project.links?.website && (
              <a
                href={project.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span>Website</span>
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
