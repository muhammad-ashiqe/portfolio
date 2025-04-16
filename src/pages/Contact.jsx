import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle } from "react-icons/fi";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <motion.section
      id="contact"
      className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-12 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/3 top-1/4 w-60 h-60 bg-blue-500 rounded-full blur-[80px] opacity-10" />
        <div className="absolute right-1/4 bottom-1/4 w-60 h-60 bg-purple-500 rounded-full blur-[80px] opacity-10" />
      </div>

      {/* Heading */}
      <motion.div className="text-center mb-10" variants={itemVariants}>
        <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-semibold text-white">
          Get In <span className="text-blue-400">Touch</span>
        </h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
          Have a project in mind or want to collaborate?
        </p>
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent w-full max-w-xs mx-auto mt-6"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              },
            },
          }}
        />
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-gray-900/50 border border-gray-800 rounded-xl shadow-lg p-6 sm:p-8 backdrop-blur-md"
        variants={containerVariants}
      >
        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-800 border ${
              errors.name ? "border-red-500" : "border-gray-700"
            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </motion.div>

        <motion.div className="mb-5" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-800 border ${
              errors.email ? "border-red-500" : "border-gray-700"
            } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Your Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="2"
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-800 border ${
              errors.message ? "border-red-500" : "border-gray-700"
            } text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
            placeholder="Hello, I’d like to talk about..."
          />
          {errors.message && (
            <p className="text-red-400 text-xs mt-1">{errors.message}</p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            disabled={isLoading || isSubmitted}
            className={`w-full py-3 px-6 flex items-center justify-center gap-2 text-white font-medium rounded-lg transition-all duration-300 ${
              isLoading || isSubmitted
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.14 5.82 3 7.94l3-2.65z"
                  />
                </svg>
                Sending...
              </>
            ) : isSubmitted ? (
              <>
                <FiCheckCircle className="text-lg" />
                Message Sent!
              </>
            ) : (
              <>
                <FiSend className="text-lg" />
                Send Message
              </>
            )}
          </button>
        </motion.div>
      </motion.form>
    </motion.section>
  );
};

export default Contact;
