import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { motion } from "framer-motion";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16">
      {/* Main Title */}
      <motion.h2
        className="text-4xl font-bold text-white mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-lg text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

// Add PropTypes for validation
SectionTitle.propTypes = {
  title: PropTypes.string.isRequired, // Title is required and should be a string
  subtitle: PropTypes.string.isRequired, // Subtitle is required and should be a string
};

export default SectionTitle;
