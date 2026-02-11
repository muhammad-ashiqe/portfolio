import React from "react";
import { motion } from "framer-motion";

const KineticTypography = ({ text, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.h1
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500"
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default KineticTypography;
