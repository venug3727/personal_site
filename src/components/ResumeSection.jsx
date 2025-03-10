import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firebase Firestore methods

const getDriveEmbedUrl = (url) => {
  const fileIdMatch = url.match(/\/d\/(.*?)(\/|$)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return null;
};

const ResumeSection = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeUrl = async () => {
      try {
        const db = getFirestore();
        const resumeCollectionRef = collection(db, "resume");

        const querySnapshot = await getDocs(resumeCollectionRef);
        querySnapshot.forEach((doc) => {
          const resumeData = doc.data();
          if (resumeData.resumeLink) {
            setResumeUrl(resumeData.resumeLink);
          }
        });

        if (!resumeUrl) {
          console.error("No resume URL found.");
        }
      } catch (error) {
        console.error("Error fetching resume URL:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeUrl();
  }, [resumeUrl]);

  const handleDownload = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      console.error("Resume URL is not available.");
    }
  };

  return (
    <section id="resume" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Resume
        </h1>
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
              <>
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative pl-8 border-l-2 border-blue-600"
                >
                  <div className="absolute left-[-9px] top-0 w-4 h-4 bg-blue-600 rounded-full" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Frontend Developer (Internship)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Digital Ipsum | SEP/2024-OCT/2024
                  </p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300"></p>
                </motion.div>

                {/* Display resume preview */}
                <motion.div
                  key="resume-preview"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mt-8"
                >
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Resume Preview
                  </h4>
                  {resumeUrl && (
                    <iframe
                      src={getDriveEmbedUrl(resumeUrl)}
                      className="w-full h-96 border rounded-lg mt-4"
                      title="Resume Preview"
                    />
                  )}
                </motion.div>
              </>
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
