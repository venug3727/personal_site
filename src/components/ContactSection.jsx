import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Github, Linkedin, Mail } from "lucide-react";
import emailjs from "emailjs-com"; // Import EmailJS

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_yhqibx9",
        "template_7bweltd",
        formData,
        "ApBoHzkLiWVDh-_V6"
      )
      .then(
        (response) => {
          console.log(
            "Email sent successfully!",
            response.status,
            response.text
          );
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          console.error("Error sending email:", error);
          alert("Failed to send message. Please try again.");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-white">Get in Touch</h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5 mr-3" />
                <span>venug3727@gmail.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Briefcase className="w-5 h-5 mr-3" />
                <span>Open for opportunities</span>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect with me
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/venug3727"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/venu-gopal-7aa856251/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Your message..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
