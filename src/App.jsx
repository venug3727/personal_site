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
import Footer from "./components/Footer";
import ResumeSection from "./components/ResumeSection";
import Admin from "./components/AdminPage";
import Achievement from "./components/Achievement";
import ProjectDetails from "./components/ProjectDetails"; // Ensure this file exists

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
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
                <Achievement />
                <ContactSection />
                <Footer />
              </>
            }
          />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />

          {/* Admin page route */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
