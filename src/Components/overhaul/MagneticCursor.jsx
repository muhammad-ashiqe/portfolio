import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const MagneticCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorSize = isHovering ? 60 : 20;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  };

  const manageMouseOver = (e) => {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.closest('a') || e.target.closest('button')) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mouseover", manageMouseOver);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mouseover", manageMouseOver);
    };
  }, [isHovering]);

  return (
    <motion.div
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        height: cursorSize,
        width: cursorSize,
      }}
      className="fixed z-[9999] pointer-events-none rounded-full border border-white mix-blend-difference hidden md:block" // Hidden on mobile
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Center dot */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full transition-all duration-300 ${isHovering ? 'w-2 h-2' : 'w-1 h-1'}`} 
      />
    </motion.div>
  );
};

export default MagneticCursor;
