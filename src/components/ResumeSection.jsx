import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { db } from "../firebase"; // Assuming firebase is initialized in this file
import { doc, getDoc } from "firebase/firestore"; // Import specific Firestore methods
import { getAuth } from "firebase/auth";

const ResumeSection = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeUrl = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setResumeUrl(data.resumeUrl || null); // Ensure it handles undefined resumeUrl
          } else {
            console.error("No document found for the current user.");
          }
        } catch (error) {
          console.error("Error fetching resume URL:", error);
        } finally {
          setLoading(false); // Always stop loading after attempt
        }
      } else {
        console.error("No user is logged in.");
        setLoading(false);
      }
    };

    fetchResumeUrl();
  }, []);

  const handleDownload = () => {
    if (resumeUrl) {
      window.location.href = resumeUrl; // Trigger the download
    } else {
      console.error("Resume URL is not available.");
    }
  };

  return (
    <section id="resume" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h1>Resume</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Professional Experience
            </h3>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!resumeUrl || loading}
            >
              <Download className="w-4 h-4 mr-2" />
              {loading ? "Loading..." : "Download CV"}
            </button>
          </div>
          <div className="space-y-8">
            {loading ? (
              <p>Loading...</p>
            ) : resumeUrl ? (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative pl-8 border-l-2 border-blue-600"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-600 rounded-full" />
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Senior Full Stack Developer
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Tech Company | 2020 - Present
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Led development of multiple high-impact projects...
                </p>
              </motion.div>
            ) : (
              <p>No resume available for download.</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
