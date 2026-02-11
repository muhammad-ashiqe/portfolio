import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "react-feather";
import ProjectCard from "../Components/ProjectCard";
import { projects } from "../assets/data";
import KineticTypography from "../Components/overhaul/KineticTypography";

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
      // Scroll to top of page for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      className="relative min-h-screen px-4 sm:px-12 py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
        {/* Header */}
        <div className="mb-16 relative z-10">
            <div className="flex items-baseline gap-4">
                 <span className="text-blue-500 font-mono text-sm tracking-widest">02 // WORKS</span>
                 <div className="h-px flex-grow bg-blue-900/50" />
            </div>
            <KineticTypography text="PROJECT_VAULT" className="text-5xl md:text-7xl mt-2" />
        </div>

      {/* Projects Grid - Asymmetrical / 3D feel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto perspective-1000">
        <AnimatePresence mode="wait">
        {currentProjects.map((project, index) => (
          <motion.div 
            key={project.title + currentPage} 
            initial={{ opacity: 0, scale: 0.9, rotateY: 10, x: 50 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: -10, x: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative ${index % 2 === 1 ? 'md:translate-y-12' : ''}`} // Staggered grid
          >
             {/* Holographic Card Wrapper */}
             <div className="relative p-[1px] bg-gradient-to-b from-blue-500/50 to-transparent transition-all duration-300 group-hover:from-blue-400 group-hover:to-purple-500">
                <div className="bg-black/80 backdrop-blur-md p-4 h-full relative z-10">
                    <ProjectCard {...project} />
                </div>
                
                {/* Decor corners */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      <div className="mt-24 flex justify-between items-center max-w-md mx-auto relative z-20 bg-black/50 backdrop-blur p-4 border border-white/10 rounded-full">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 hover:text-blue-400 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft />
        </button>

        <span className="font-mono text-blue-300 tracking-widest">
            PAGE {currentPage.toString().padStart(2, '0')} / {totalPages.toString().padStart(2, '0')}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 hover:text-blue-400 disabled:opacity-30 transition-colors"
        >
          <ChevronRight />
        </button>
      </div>
    </motion.section>
  );
};

export default Projects;