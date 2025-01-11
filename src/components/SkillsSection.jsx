import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 80 },
  { name: "JavaScript", level: 85 },
  { name: "React", level: 70 },
  { name: "Node.js", level: 60 },
  { name: "Python", level: 75 },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h1>Skills & Expertise</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              category: "Frontend",
              skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
            },
            {
              category: "Backend",
              skills: ["Node.js", "Python", "PostgreSQL", "REST APIs"],
            },
            {
              category: "Tools & Methods",
              skills: ["Git", "Docker", "Agile", "CI/CD"],
            },
            {
              category: "Soft Skills",
              skills: [
                "Communication",
                "Leadership",
                "Problem Solving",
                "Team Work",
              ],
            },
          ].map((group, index) => (
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
                {group.skills.map((skill, skillIndex) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{skill}</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.1 + skillIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
