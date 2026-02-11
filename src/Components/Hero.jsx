import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import KineticTypography from "../Components/overhaul/KineticTypography";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero = () => {
  return (
    <motion.section
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 pt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Glitchy Decorative Elements */}
      <div className="absolute top-32 right-10 md:right-32 w-24 h-24 border-r-2 border-t-2 border-blue-500/30 rounded-tr-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 md:left-24 w-16 h-16 border-l-2 border-b-2 border-pink-500/30 rounded-bl-2xl pointer-events-none" />

      {/* Main Headline */}
      <div className="mb-8 z-10">
        <motion.p 
            variants={itemVariants} 
            className="text-blue-400 font-mono mb-4 tracking-widest text-sm md:text-base uppercase"
        >
            // System Online
        </motion.p>
        
        <KineticTypography text="ASHIQE" className="mb-[-1rem] md:mb-[-2rem] z-20 relative mix-blend-difference" />
        <KineticTypography text="DEV_" className="text-gray-500/50" />
      </div>

      {/* Description */}
      <motion.div variants={itemVariants} className="max-w-2xl backdrop-blur-sm bg-black/20 p-6 rounded-lg border-l-4 border-blue-500">
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
          Fullstack Developer crafting <span className="text-white font-bold">future-ready</span> web applications.
          Specializing in <span className="text-blue-300">JavaScript</span>, <span className="text-cyan-300">React</span>, <span className="text-emerald-300">Node.js</span>, and <span className="text-purple-300">MongoDB</span>.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap gap-6 mt-12"
        variants={itemVariants}
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-none border border-white/20 hover:border-blue-500 transition-colors duration-300"
        >
            <div className="absolute inset-0 w-0 bg-blue-600 transition-all duration-[250ms] ease-out group-hover:w-full opacity-10" />
            <span className="relative text-white font-mono tracking-wider group-hover:text-blue-300 flex items-center gap-2">
                VIEW_RESUME <span className="text-xs">↗</span>
            </span>
        </a>

        <Link to="/contact">
          <button className="group relative px-8 py-3 bg-white text-black font-bold tracking-wider hover:bg-blue-400 hover:text-white transition-all duration-300 clip-path-slant">
            CONTACT_ME
          </button>
        </Link>
      </motion.div>

      {/* Social & Meta */}
      <motion.div 
        className="flex items-center gap-8 mt-16 md:absolute md:bottom-12 md:right-12" 
        variants={itemVariants}
      >
         {[
            { icon: "github", url: "https://github.com/muhammad-ashiqe" },
            { icon: "linkedin", url: "https://www.linkedin.com/in/muhammad-ashiqe" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-white text-2xl transition-transform hover:scale-125 duration-300"
            >
              <i className={`fa-brands fa-${social.icon}`} />
            </a>
          ))}
          <div className="h-px w-12 bg-gray-700" />
          <a 
              href="tel:+919562647893" 
              className="group flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-gray-400 font-mono text-xs tracking-widest group-hover:text-blue-400">REQUEST_A_CALLBACK</span>
          </a>
      </motion.div>

    </motion.section>
  );
};

export default Hero;
