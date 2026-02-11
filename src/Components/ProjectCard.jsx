import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { GiSpanner } from "react-icons/gi";

const ProjectCard = ({ image, title, description, tools, github, demo }) => {
  return (
    <div className="group relative w-full h-full bg-black border border-gray-800 hover:border-blue-500/50 transition-colors duration-300 flex flex-col">
      {/* Corner Accents */}
      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Image Section with Scanline Overlay */}
      <div className="relative h-48 overflow-hidden border-b border-gray-800 group-hover:border-blue-500/30 transition-colors">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300 z-10" />
        
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
        />
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2 z-20">
           <span className="px-2 py-1 bg-black/80 border border-gray-700 text-[10px] font-mono text-gray-400 uppercase tracking-widest backdrop-blur-sm">
             {demo ? "LIVE_SIGNAL" : "OFFLINE"}
           </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow relative">
         {/* Holographic grid background on hover */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 pointer-events-none" />

        <div className="mb-4 relative z-10">
            <h3 className="text-xl font-bold text-white font-mono uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                {title}
            </h3>
            <div className="h-px w-12 bg-gray-700 mt-2 mb-3 group-hover:w-full group-hover:bg-blue-500/50 transition-all duration-500" />
            
            <p className="text-sm text-gray-400 font-light leading-relaxed h-[4.5rem] overflow-hidden">
                {description}
            </p>
        </div>

        {/* Tools */}
        <div className="mt-auto mb-6 relative z-10">
            <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                    <span key={index} className="text-[10px] uppercase font-mono text-gray-500 border border-gray-800 px-1.5 py-0.5">
                        {tool}
                    </span>
                ))}
            </div>
        </div>

        {/* Actions - Cyber Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-auto relative z-10">
            {github && (
                <a 
                    href={github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 border border-gray-700 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group/btn"
                >
                    <FaGithub className="text-sm" />
                    <span className="text-xs font-mono font-bold uppercase">SRC_CODE</span>
                </a>
            )}
            
            {demo ? (
                <a 
                    href={demo} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2 bg-blue-600 border border-blue-600 text-white hover:bg-blue-500 transition-all duration-300"
                >
                    <span className="text-xs font-mono font-bold uppercase">DEPLOY</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                </a>
            ) : (
                <div className="flex items-center justify-center gap-2 py-2 border border-yellow-800/50 text-yellow-600 bg-yellow-900/10 cursor-not-allowed">
                    <GiSpanner className="text-sm" />
                    <span className="text-xs font-mono font-bold uppercase">WIP_..</span>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;