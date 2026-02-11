import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  "INSTALLING_DEPENDENCIES...",
  "COMPILING_SOURCE_CODE...",
  "BUNDLING_ASSETS...",
  "RUNNING_BUILD_SCRIPTS...",
  "BUILD_SUCCESSFUL: PORTFOLIO_READY"
];

const BootLine = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2, duration: 0.3 }}
    className="font-mono text-xs md:text-sm text-blue-500 mb-1"
  >
    <span className="text-gray-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
    <span>{text}</span>
  </motion.div>
);

export function SplashQuote({ isVisible }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
        setProgress(prev => Math.min(prev + Math.random() * 15, 100));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center overflow-hidden"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="w-full max-w-lg px-6">
                
                {/* Boot Log */}
                <div className="mb-8 font-mono text-left border-l-2 border-blue-500 pl-4 h-32 overflow-hidden flex flex-col justify-end">
                    {bootSequence.map((line, index) => (
                        <BootLine key={index} text={line} index={index} />
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="relative w-full h-1 bg-gray-900 overflow-hidden mb-2">
                    <motion.div 
                        className="h-full bg-blue-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                
                <div className="flex justify-between text-xs font-mono text-gray-500">
                    <span>SYSTEM_BOOT</span>
                    <span>{Math.round(progress)}%</span>
                </div>

                {/* Glitch Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
