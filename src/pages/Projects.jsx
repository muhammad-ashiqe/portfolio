import React from "react";
import { motion } from "framer-motion";
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
  return (
    <motion.section
      className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
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
      <motion.div className="w-full" variants={containerVariants}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto justify-items-center"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Projects;
