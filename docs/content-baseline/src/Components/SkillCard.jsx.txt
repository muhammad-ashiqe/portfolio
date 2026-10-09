import React from "react";
import { motion } from "framer-motion";

const SkillCard = ({ icon: Icon, name, color }) => {
  return (
    <motion.div
      className="group w-[90px] sm:w-[100px] md:w-[120px] p-3 sm:p-4 border border-gray-800 bg-gray-900/50 rounded-xl backdrop-blur-sm shadow-lg flex flex-col items-center transition-all duration-300 hover:border-blue-400/30 hover:bg-gray-800/30"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Skill Icon with glow effect */}
      <div className="relative p-2 rounded-full group-hover:bg-white/5 transition-colors duration-300">
        <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[8px] group-hover:blur-[12px] transition-all duration-300 -z-10" />
        {Icon ? (
            <Icon className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]`} style={{ color: color || '#fff' }} />
        ) : (
            <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
        )}
      </div>

      {/* Skill Name with animated underline */}
      <h3 className="relative text-white text-xs sm:text-sm font-medium mt-2 sm:mt-3 text-center tracking-wide font-mono">
        {name}
        <span className="absolute left-0 bottom-0 h-[1px] bg-blue-400 w-0 group-hover:w-full transition-all duration-300" />
      </h3>
    </motion.div>
  );
};

export default SkillCard;
