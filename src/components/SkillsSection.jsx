import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firebase Firestore methods

const SkillsSection = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const db = getFirestore(); // Initialize Firebase Firestore
        const skillsCollectionRef = collection(db, "skills"); // Reference to the "skills" collection

        // Fetch all documents from the "skills" collection
        const querySnapshot = await getDocs(skillsCollectionRef);
        const skills = [];

        // Loop through documents to fetch skill data
        querySnapshot.forEach((doc) => {
          skills.push(doc.data());
        });

        setSkillsData(skills); // Set the fetched skills data
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false); // Stop loading after the fetch attempt
      }
    };

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-11 text-gray-900 dark:text-white">
          Skills & Expertise
        </h1>
        {loading ? (
          <p>Loading skills...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillsData.map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {group.category}
                </h3>
                <div className="space-y-4">
                  {Array.isArray(group.skills) ? (
                    group.skills.map((skill, skillIndex) => (
                      <div key={skill.heading} className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>
                            {skill.heading}: {skill.title}
                          </span>
                          <span>{skill.description}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.description}%` }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.1 + skillIndex * 0.1,
                            }}
                            viewport={{ once: true }}
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p></p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
