import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NavItem = ({ to, label, index, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 group flex items-center gap-2 ${
          isActive ? "text-cyan-400" : "text-gray-500 hover:text-gray-300"
        }`
      }
    >
      {({ isActive }) => (
        <>
            <span className={`text-[10px] opacity-50 ${isActive ? 'text-cyan-600' : 'text-gray-700'}`}>0{index}</span>
            {label}
            {isActive && (
                <motion.div
                layoutId="navIndicator"
                className="absolute inset-0 border border-cyan-500/30 bg-cyan-500/5 -skew-x-12"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            {/* Hover Bracket Effect */}
            <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      )}
    </NavLink>
  );
};

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <>
    <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent"}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex justify-between items-center max-w-[1920px] mx-auto">
        
        {/* Logo / System ID */}
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white text-black font-black flex items-center justify-center text-xs">
                MA
            </div>
            <div className="hidden md:block">
                <div className="text-white text-xs font-mono tracking-widest">ASHIQE_SYSTEMS</div>
                <div className="text-gray-600 text-[10px] tracking-tight">
                    STATUS: <span className="text-green-500">ONLINE</span>
                </div>
            </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
            <ul className="flex items-center gap-2">
                <NavItem to="/" label="CORE" index={1} />
                <NavItem to="/projects" label="WORKS" index={2} />
                <NavItem to="/experience" label="LOGS" index={3} />
                <NavItem to="/skills" label="TECH" index={4} />
                <NavItem to="/contact" label="COMM" index={5} />
            </ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white font-mono text-xs border border-white/20 px-3 py-2 hover:border-blue-500 transition-colors"
        >
            {mobileMenuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>
    </motion.header>

    {/* Mobile Menu Drawer */}
    <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 bottom-0 w-[280px] bg-black border-l border-white/10 z-[60] md:hidden"
            >
                <div className="p-6 pt-24">
                    <nav>
                        <ul className="flex flex-col gap-4">
                            <NavItem to="/" label="CORE" index={1} onClick={() => setMobileMenuOpen(false)} />
                            <NavItem to="/projects" label="WORKS" index={2} onClick={() => setMobileMenuOpen(false)} />
                            <NavItem to="/experience" label="LOGS" index={3} onClick={() => setMobileMenuOpen(false)} />
                            <NavItem to="/skills" label="TECH" index={4} onClick={() => setMobileMenuOpen(false)} />
                            <NavItem to="/contact" label="COMM" index={5} onClick={() => setMobileMenuOpen(false)} />
                        </ul>
                    </nav>

                    {/* System Info */}
                    <div className="mt-12 border-t border-white/10 pt-6">
                        <div className="text-xs font-mono text-gray-500 space-y-1">
                            <p>SYSTEM_VER: 2.0.4</p>
                            <p>BUILD: CYBER_BRUTALIST</p>
                            <p className="flex items-center gap-2">
                                STATUS: <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> ONLINE
                            </p>
                        </div>
                    </div>
                </div>

                {/* Grain Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </motion.div>
        )}
    </AnimatePresence>

    {/* Backdrop Overlay */}
    <AnimatePresence>
        {mobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[59] md:hidden"
            />
        )}
    </AnimatePresence>
    </>
  );
};

export default Navbar;