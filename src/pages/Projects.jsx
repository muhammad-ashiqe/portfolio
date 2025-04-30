import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "react-feather";
import ProjectCard from "../Components/ProjectCard";
import { projects } from "../assets/data";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  // Pagination calculations
  const totalProjects = projects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.section
      className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Header */}
      <motion.div className="text-center mb-10" variants={itemVariants}>
        <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-semibold text-white">
          My <span className="text-blue-400">Projects</span>
        </h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
          Real-world work showcasing what I build with code and creativity.
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

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto justify-items-center"
        variants={containerVariants}
        key={`page-${currentPage}`}
      >
        {currentProjects.map((project, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Pagination Controls */}
      <motion.div
        className="flex justify-center items-center gap-2 mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Previous Button */}
        <motion.button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 sm:px-4 sm:py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-all duration-300 ${
            currentPage === 1
              ? "opacity-70 cursor-not-allowed bg-gray-700/30 border border-gray-600"
              : "hover:bg-blue-500/20 active:bg-blue-500/30 border border-blue-400/30"
          }`}
          style={{
            backdropFilter: "blur(8px)",
          }}
        >
          <ChevronLeft className="w-5 h-5 text-blue-300" />
          <span className="hidden sm:inline text-blue-100">Previous</span>
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1.5 mx-2">
          {pageNumbers.map((number) => (
            <motion.button
              key={number}
              onClick={() => handlePageChange(number)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-10 h-10 flex items-center justify-center text-sm rounded-xl transition-all duration-300 ${
                currentPage === number
                  ? "text-white bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl"
                  : "text-gray-300 hover:bg-white/10"
              }`}
              style={{
                boxShadow:
                  currentPage === number
                    ? "0 8px 32px rgba(59, 130, 246, 0.4)"
                    : "none",
              }}
            >
              {number}
              {currentPage === number && (
                <motion.span
                  className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"
                  layoutId="activePage"
                  transition={{
                    type: "spring",
                    bounce: 0.3,
                    duration: 0.6,
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          whileHover={{ scale: 1.05, x: 3 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 sm:px-4 sm:py-2.5 text-sm font-medium rounded-xl flex items-center gap-2 transition-all duration-300 ${
            currentPage === totalPages
              ? "opacity-70 cursor-not-allowed bg-gray-700/30 border border-gray-600"
              : "hover:bg-blue-500/20 active:bg-blue-500/30 border border-blue-400/30"
          }`}
          style={{
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="hidden sm:inline text-blue-100">Next</span>
          <ChevronRight className="w-5 h-5 text-blue-300" />
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default Projects;