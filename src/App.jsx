import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import { useInView } from "react-intersection-observer";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/admin";
import ResumeSection from "./components/ResumeSection";

// Admin Page Component (You can replace this with your actual admin content)
function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
        Admin Page
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300">
        Welcome to the admin page. Here you can manage all your content.
      </p>
    </div>
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const SectionTitle = ({ children }) => {
    const [ref, inView] = useInView({
      threshold: 0.3,
      triggerOnce: true,
    });

    return (
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
      >
        {children}
      </motion.h2>
    );
  };

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header toggleTheme={toggleTheme} isDark={isDark} />
        <Routes>
          {/* Main page routes */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
                <ResumeSection />
                <ContactSection />
              </>
            }
          />

          {/* Admin page route */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
