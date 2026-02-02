import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const NavItem = ({ to, label }) => {
  return (
    <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `relative px-3 py-2 text-sm sm:text-[0.95rem] font-medium transition-all duration-200 ${
            isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {label}
            {isActive && (
              <motion.span
                className="absolute left-0 bottom-0 h-0.5 bg-blue-400 w-full"
                layoutId="navUnderline"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
            )}
          </>
        )}
      </NavLink>
    </motion.li>
  );
};

const Navbar = () => {
  return (
    <div className="px-4 sm:px-[10%] lg:px-[20%] xl:px-[30%] mt-10">
      <motion.div 
        className="p-1 bg-gray-900/50 backdrop-blur-md rounded-xl border border-gray-700 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="flex justify-between items-center px-3 py-2">
          <NavItem to="/" label="Home" />
          <NavItem to="experience" label="Experience" />
          <NavItem to="skills" label="Skills" />
          <NavItem to="projects" label="Projects" />
          <NavItem to="contact" label="Contact" />
        </ul>
      </motion.div>
    </div>
  );
};

export default Navbar;