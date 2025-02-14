import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, MousePointerClick } from "lucide-react";
import { useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springScroll = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
  });
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0]);
  const y = useTransform(springScroll, [0, 0.5], ["0%", "50%"]);

  // Particle animation configurations
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    duration: Math.random() * 5 + 3,
  }));

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden isolate"
    >
      {/* Dynamic gradient background */}
      <motion.div style={{ opacity, y }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 -z-20">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
            }}
            animate={{
              y: `${particle.y + 20}%`,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
            }}
          />
        ))}
      </div>

      <div className="relative text-center max-w-6xl mx-auto px-4">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 backdrop-blur-sm">
              Full Stack Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            <span className="block">Venugopal C S</span>
            <span className="text-3xl md:text-5xl font-medium bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
              Building Digital Experiences
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about creating immersive web experiences with modern
            technologies. Specializing in full-stack development with focus on
            performance and user experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="relative px-8 py-4 w-full md:w-48 text-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all group overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="relative px-8 py-4 w-full md:w-48 text-center rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all group overflow-hidden"
            >
              <span className="relative z-10">View Work</span>
              <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-6 mt-12"
          >
            {[
              {
                icon: Github,
                href: "https://github.com/venug3727",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/yourprofile",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:venug3727@gmail.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="p-3 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 transition-colors relative group"
              >
                <Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
