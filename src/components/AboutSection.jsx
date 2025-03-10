import { motion, useScroll, useTransform } from "framer-motion";
import { Code, User, Rocket, Briefcase, Terminal } from "lucide-react";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const skills = [
    { name: "Web Development", icon: Terminal },
    { name: "Frontend Development", icon: Code },
    { name: "Project Management", icon: Briefcase },
    { name: "AI", icon: Rocket },
  ];

  return (
    <section
      id="about"
      className="relative py-32 px-4 overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
      ref={ref}
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-600/5" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-5" />
      </motion.div>

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text Content */}
          <div className="space-y-8 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-16 -left-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
            />

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
            >
              About Me
            </motion.h2>

            <motion.div className="space-y-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                I'm a passionate Frontend Developer with expertise in creating
                modern web applications. I specialize in bridging the gap
                between design and technical implementation.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                My journey began with a Computer Science degree, evolving
                through various roles from frontend development to full-stack
                solutions. I'm passionate about performance optimization and
                user-centric design.
              </motion.p>

              {/* Skills Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                {skills.map(({ name, icon: Icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ y: -5 }}
                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700
                      bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center gap-3"
                  >
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600
                    text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <User className="w-5 h-5" />
                  More About Me
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700
                    bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm flex items-center gap-2
                    shadow-lg hover:shadow-xl transition-all"
                >
                  <Code className="w-5 h-5" />
                  View Projects
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                alt="Developer workspace"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
