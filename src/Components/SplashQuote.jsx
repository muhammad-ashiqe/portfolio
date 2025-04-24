import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "I never dreamed about success. I worked for it.", author: "Estée Lauder" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" }
];

const quoteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export function SplashQuote({ isVisible }) {
  const [currentQuote, setCurrentQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <div
      className={`
        fixed inset-0
        bg-gray-900/90 backdrop-blur-sm
        flex items-center justify-center
        transition-opacity duration-500 z-50
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <motion.div
        className="px-4 text-center"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={quoteVariants}
      >
        <h1 className="text-sm md:text-xl lg:text-xl font-medium text-white leading-tight">
          “{currentQuote.text}”
        </h1>
        <p className="mt-4 text-sm md:text-base italic text-blue-200">
          — {currentQuote.author}
        </p>
      </motion.div>
    </div>
  );
}
