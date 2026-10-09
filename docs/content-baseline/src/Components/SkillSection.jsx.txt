import React from "react";
import { motion } from "framer-motion";
import SkillCard from "./SkillCard";

const SkillSection = ({ title, skills }) => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="mb-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Trigger animation only once
    >
      {/* Section Title */}
      <motion.h2
        className="text-xl sm:text-2xl md:text-2xl text-white font-bold text-center"
        variants={itemVariants}
      >
        {title}
      </motion.h2>

      {/* Horizontal Divider */}
      <motion.hr
        className="h-[2px] w-[200px] sm:w-[300px] mx-auto mt-3 mb-6 bg-gray-700"
        variants={itemVariants}
      />

      {/* Skill Cards Grid */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8"
        variants={containerVariants}
      >
        {skills.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <SkillCard image={item.image} name={item.name} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SkillSection;
