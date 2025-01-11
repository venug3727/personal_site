import React from "react";

import { motion } from "framer-motion";

import { Code, User } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-white text-lg font-bold">About Me:</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'&apos;s a passionate Full Stack Developer with a keen eye for
              design and a love for creating beautiful, functional web
              applications. With [X] years of experience in the industry,
              I&apos;ve worked on a wide range of projects from small business
              websites to large-scale enterprise applications.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              My journey in tech started with [background/education], and
              I&apos;ve since developed expertise in modern web technologies and
              best practices. I&apos;m particularly interested in [specific
              areas of interest/expertise].
            </p>
            <div className="flex space-x-4">
              <a
                href="#contact"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <User className="w-5 h-5 mr-2" />
                More About Me
              </a>
              <a
                href="#projects"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                <Code className="w-5 h-5 mr-2" />
                See My Work
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transform rotate-6 opacity-20"></div>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
              alt="Developer workspace"
              className="relative rounded-lg shadow-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
