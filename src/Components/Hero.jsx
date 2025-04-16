import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../public/dp.png"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero = () => {
  return (
    <motion.div
      className="px-4 sm:px-8 md:px-12 lg:px-24 xl:px-32 py-12 sm:py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Image with perfect centering */}
      <motion.div
        className="flex justify-center mb-8 sm:mb-12"
        variants={itemVariants}
      >
        <div className="relative">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-md -z-10" />
          
          {/* Your perfect profile image container */}
          <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px] border-2 border-blue-500/80 rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
            <img
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              src={heroImg}
              alt="Ashiqe - MERN Stack Developer"
              loading="eager"
            />
          </div>
        </div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        className="text-center px-4 max-w-2xl mx-auto"
        variants={itemVariants}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-[2.8rem] font-bold text-white mb-3 leading-tight"
          variants={itemVariants}
        >
          Hi, I'm <span className="text-blue-400">Ashiqe</span>
          <span className="typing-cursor animate-pulse">|</span>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-gray-300 mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Fullstack Developer crafting modern web applications with{" "}
          <span className="text-blue-300 font-medium">JavaScript</span>,{" "}
          <span className="text-cyan-300 font-medium">React</span>,{" "}
          <span className="text-emerald-300 font-medium">Node.js</span>, and{" "}
          <span className="text-purple-300 font-medium">MongoDB</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-10"
          variants={itemVariants}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-5 py-2.5 bg-gray-800/50 border border-gray-700 text-white font-medium rounded-lg hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
            View Resume
          </a>

          <a
            href="#contact"
            className="flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      {/* Social Links */}
      <motion.div className="text-center" variants={itemVariants}>
        <motion.div
          className="flex justify-center gap-6 mb-8 text-3xl"
          variants={itemVariants}
        >
          {[
            { icon: "github", url: "#" },
            { icon: "linkedin", url: "#" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110"
              aria-label={social.icon}
            >
              {/* Using FontAwesome's icon */}
              <i className={`fa-brands fa-${social.icon}`} />
            </a>
          ))}
        </motion.div>

        {/* Subtle divider */}
        <motion.div
          className="h-px bg-gray-700 max-w-xs mx-auto mb-8"
          variants={itemVariants}
        />

        {/* Phone CTA */}
        <motion.div variants={itemVariants}>
          <a
            href="tel:+1234567890"
            className="inline-flex items-center text-blue-400 hover:text-white font-medium transition-colors duration-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Request call
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
