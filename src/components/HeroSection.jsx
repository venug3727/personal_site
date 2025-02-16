import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
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

  // Floating spaceship animation
  const FloatingSpaceship = () => (
    <motion.div
      initial={{ x: "-30%", y: "20%" }}
      animate={{ x: "130%", y: "20%" }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute z-0 opacity-50"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6366f1"
        strokeWidth="2"
      >
        <path d="M12 2l-3 9h6l-3 9 9-6h-6l9-6h-6l-3-9z" />
      </svg>
    </motion.div>
  );

  // Rotating planet animation
  const RotatingPlanet = () => (
    <motion.div
      className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2"
      animate={{ rotate: 360 }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 opacity-10" />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-400 rounded-full"
        animate={{ y: [-10, 10, -10] }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );

  // Pulsating radar circles
  const PulsarEffect = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-blue-500/20 rounded-full"
          style={{ width: 100 + i * 200, height: 100 + i * 200 }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1, opacity: 0 }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );

  // Floating code snippets
  // Floating code snippets
  const FloatingCode = () => (
    <>
      {["React", "TS", "Node", "CSS"].map((text, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-400/30 dark:text-blue-600/40 font-mono font-bold text-3xl blur-[2px]"
          initial={{
            x: Math.random() * 100 - 50 + "%",
            y: Math.random() * 100 - 50 + "%",
            rotate: Math.random() * 15 - 7 + "deg",
            opacity: 0,
          }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [1, 1, 1],
            rotate: Math.random() * 15 - 7 + "deg",
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: "blur(2px)",
            zIndex: -10,
          }}
        >
          {`<${text} />`}
        </motion.div>
      ))}
    </>
  );

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden isolate"
    >
      {/* Background animations */}
      <motion.div style={{ opacity, y }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/10 to-blue-500/20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </motion.div>

      {/* Animated elements */}
      <FloatingSpaceship />
      <RotatingPlanet />
      <PulsarEffect />
      <FloatingCode />

      {/* Floating particles */}
      <div className="absolute inset-0 -z-20">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 3 + 2,
              height: Math.random() * 3 + 2,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative text-center max-w-6xl mx-auto px-4">
        <div className="space-y-8">
          {/* Title badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-block"
          >
            <span className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 backdrop-blur-sm">
              Full Stack Developer
            </span>
          </motion.div>

          {/* Name with animation */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          >
            <motion.span
              className="block"
              animate={{
                textShadow: [
                  "0 0 10px rgba(99,102,241,0)",
                  "0 0 20px rgba(99,102,241,0.3)",
                  "0 0 10px rgba(99,102,241,0)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Venugopal C S
            </motion.span>
            <motion.span
              className="text-3xl md:text-5xl font-medium bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent"
              animate={{ letterSpacing: ["0em", "0.1em", "0em"] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Building Digital Experiences
            </motion.span>
          </motion.h1>

          {/* Animated connection lines */}
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute h-0.5 bg-blue-500/10"
                initial={{
                  width: 0,
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                }}
                animate={{
                  width: ["0%", "50%", "0%"],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>

          {/* Animated description text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about creating immersive web experiences with modern
            technologies. Specializing in full-stack development with focus on
            performance and user experience.
          </motion.p>

          {/* Action buttons with hover animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col md:flex-row justify-center items-center gap-4 mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="relative px-8 py-4 w-full md:w-48 text-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all group overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="relative px-8 py-4 w-full md:w-48 text-center rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all group overflow-hidden"
            >
              <span className="relative z-10">View Work</span>
              <motion.div
                className="absolute inset-0 bg-gray-100/50 dark:bg-gray-700/50 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* Social links with floating animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
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
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="p-3 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-blue-500/10 dark:hover:bg-blue-400/10 transition-colors relative group"
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 2,
                    delay: index * 0.2,
                    repeat: Infinity,
                  },
                }}
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
