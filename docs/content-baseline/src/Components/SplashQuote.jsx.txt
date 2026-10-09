import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootSequence = [
  "INSTALLING_DEPENDENCIES...",
  "COMPILING_SOURCE_CODE...",
  "BUNDLING_ASSETS...",
  "RUNNING_BUILD_SCRIPTS...",
  "BUILD_SUCCESSFUL: PORTFOLIO_READY",
];

const BootLine = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2, duration: 0.3 }}
    className="mb-1 font-mono text-xs md:text-sm theme-accent"
  >
    <span className="mr-2 theme-text-faint">
      [{new Date().toLocaleTimeString()}]
    </span>
    <span>{text}</span>
  </motion.div>
);

export function SplashQuote({ isVisible }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 15, 100));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[60] theme-bg flex items-center justify-center overflow-hidden"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className="w-full max-w-lg px-6">
            <div
              className="mb-8 flex h-32 flex-col justify-end overflow-hidden pl-4 text-left font-mono"
              style={{ borderLeft: "2px solid var(--color-accent)" }}
            >
              {bootSequence.map((line, index) => (
                <BootLine key={index} text={line} index={index} />
              ))}
            </div>

            <div className="relative mb-2 h-1 w-full overflow-hidden theme-panel">
              <motion.div
                className="h-full theme-accent-bg"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs font-mono theme-text-muted">
              <span>SYSTEM_BOOT</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
