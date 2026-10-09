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
        className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--color-text-primary), var(--color-text-faint))",
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
};

export default KineticTypography;
