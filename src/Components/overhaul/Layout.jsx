import React from "react";
import GlobalCanvas from "./GlobalCanvas";
import Atmospherics from "./Atmospherics";
import MagneticCursor from "./MagneticCursor";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-transparent text-white overflow-x-hidden selection:bg-blue-500 selection:text-white">
      <GlobalCanvas />
      <Atmospherics />
      <MagneticCursor />
      
      {/* Main Content Wrapper */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default Layout;
