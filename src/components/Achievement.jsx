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
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id || `cert-${index}`} // Ensure unique key
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
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
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Credential
                  </a>
                </div>
              </motion.div>
            ))}
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
    </div>
  );
};

export default Achievement;
