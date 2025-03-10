import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const SkillsSection = () => {
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const db = getFirestore();
        const skillsCollectionRef = collection(db, "skills");
        const querySnapshot = await getDocs(skillsCollectionRef);
        const skills = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSkillsData(skills);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="relative py-24 px-4 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
        >
          Skills & Expertise
        </motion.h1>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((group, index) => (
              <motion.div
                key={group.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Category Title */}
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {group.category}
                </h3>

                {/* Skills List */}
                <div className="space-y-6">
                  {Array.isArray(group.items) && group.items.length > 0 ? (
                    group.items.map((skill, skillIndex) => (
                      <div
                        key={skill.heading || skillIndex}
                        className="space-y-2"
                      >
                        {/* Skill Heading and Percentage */}
                        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                          <span className="font-medium">
                            {skill.heading}: {skill.title}
                          </span>
                          <span className="text-blue-600 dark:text-blue-400">
                            {skill.description}%
                          </span>
                        </div>

                        {/* Progress Bar */}
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
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      No skills available
                    </p>
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
