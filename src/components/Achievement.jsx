import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, ExternalLink, Medal, Trophy } from "lucide-react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

// Map for achievement icons
const iconMap = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
};

const Achievement = () => {
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null); // For modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch certificates
        const certsSnapshot = await getDocs(collection(db, "certificates"));
        const certsData = certsSnapshot.docs.flatMap(
          (doc) => doc.data().certificates || []
        );
        setCertificates(certsData);

        // Fetch achievements
        const achievementsSnapshot = await getDocs(
          collection(db, "achievements")
        );
        const achievementsData = achievementsSnapshot.docs.flatMap(
          (doc) => doc.data().achievements || []
        );
        setAchievements(achievementsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Helper function to extract Google Drive ID
  const extractDriveId = (url) => {
    const match = url.match(/\/d\/([^\/]+)/);
    return match ? match[1] : null;
  };

  // Open modal with full-size certificate
  const openCertificateModal = (cert) => {
    setSelectedCertificate(cert);
  };

  // Close modal
  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certificates & Achievements
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my professional certifications and notable
            achievements throughout my career.
          </p>
        </motion.div>

        {/* Certificates Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => {
              const isPDF = cert.image?.endsWith(".pdf");
              const driveId = isPDF ? extractDriveId(cert.image) : null;

              return (
                <motion.div
                  key={cert.id || `cert-${index}`} // Ensure unique key
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    {isPDF ? (
                      <iframe
                        src={`https://drive.google.com/file/d/${driveId}/preview`}
                        className="w-full h-full"
                        title={cert.title}
                        frameBorder="0"
                        scrolling="no"
                        style={{ overflow: "hidden" }}
                      />
                    ) : (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {cert.category
                          ? cert.category.charAt(0).toUpperCase() +
                            cert.category.slice(1)
                          : "No Category Available"}
                      </span>
                      <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 mr-1" />
                        {cert.date}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {cert.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {cert.issuer}
                    </p>
                    <button
                      onClick={() => openCertificateModal(cert)}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Full Certificate
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            Notable Achievements
          </h3>
          <div className="grid gap-8">
            {achievements.map((achievement, index) => {
              const Icon = iconMap[achievement.icon];
              return (
                <motion.div
                  key={achievement.id || `achievement-${index}`} // Ensure unique key
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                        {Icon ? (
                          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <div className="w-6 h-6 text-gray-400">
                            Icon Not Found
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {achievement.date}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for Full-Size Certificate */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedCertificate.title}
                </h3>
                <button
                  onClick={closeCertificateModal}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {selectedCertificate.image?.endsWith(".pdf") ? (
                <iframe
                  src={`https://drive.google.com/file/d/${extractDriveId(
                    selectedCertificate.image
                  )}/preview`}
                  className="w-full h-[70vh]"
                  title={selectedCertificate.title}
                  frameBorder="0"
                  scrolling="no"
                  style={{ overflow: "hidden" }}
                />
              ) : (
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievement;
