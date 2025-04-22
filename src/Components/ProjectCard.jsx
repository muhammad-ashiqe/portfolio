import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ image, title, description, tools, github, demo }) => {
  return (
    <motion.div
      className="projectcard relative group w-full max-w-xs sm:max-w-sm md:max-w-md bg-gray-800/50 border border-gray-700 text-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-400/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Project Image with Glow Effect */}
      <div className="w-full h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Hover Overlay with Buttons */}
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
          {github && (
            <motion.a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/90 text-white text-sm border border-gray-600 rounded-lg hover:bg-blue-600 hover:border-blue-400 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="text-lg" />
              <span>View Code</span>
            </motion.a>
          )}
          
          {demo && (
            <motion.a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600/90 text-white text-sm border border-blue-400 rounded-lg hover:bg-blue-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt className="text-lg" />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-5 flex flex-col">
        {/* Project Title */}
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        {/* Description with Custom Scrollbar */}
        <div className="text-sm text-gray-300 mb-4 h-20 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {description}
        </div>

        {/* Tools Used with Chips */}
        <div className="mt-auto">
          <p className="text-xs text-gray-400 mb-2">Built with:</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <span 
                key={index}
                className="text-xs px-2 py-1 bg-gray-700/50 text-blue-300 rounded-full border border-gray-600"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;