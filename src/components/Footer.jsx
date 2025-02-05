// import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Footer Content */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo / Name */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="text-lg font-bold">[Your Name or Logo]</h3>
            <p className="text-sm">
              Crafting web experiences with passion and precision.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-400 transition">
              Home
            </a>
            <a href="#about" className="hover:text-gray-400 transition">
              About
            </a>
            
            <a href="#contact" className="hover:text-gray-400 transition">
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          className="mt-6 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
        >
          <p>
            © {new Date().getFullYear()} Venugopal C S (VG). All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
