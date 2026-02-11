import React from "react";
import { motion } from "framer-motion";
import {
  backendAndDatabase,
  cloudAndDeployment,
  designAndContent,
  frontendDevelopment,
  librariesAndDevTools,
  paymentGateways,
  programmingLanguages,
} from "../assets/data";
import KineticTypography from "../Components/overhaul/KineticTypography";

/* Reusing the SkillSection logic but with new styling */
const CyberSkillSection = ({ title, skills, accentColor }) => (
  <div className="mb-12">
    <h3 className={`text-xl font-mono uppercase mb-6 ${accentColor} border-l-4 pl-4 border-current`}>
      {title}
    </h3>
    <div className="flex flex-wrap gap-4">
      {skills.map((skill, index) => {
        const IconComponent = skill.icon;
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="relative px-4 py-3 bg-white/5 border border-white/10 backdrop-blur-sm group overflow-hidden"
          >
            {/* Glitch overlay on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-current transition-opacity ${accentColor}`} />
            
            <div className="flex items-center gap-3 relative z-10">
              {/* Render Icon Component */}
              {IconComponent && (
                <IconComponent 
                  className="w-6 h-6 grayscale group-hover:grayscale-0 transition-all" 
                  style={{ color: skill.color || '#fff' }}
                />
              )}
              <span className="text-sm font-bold tracking-wide text-gray-300 group-hover:text-white uppercase">{skill.name}</span>
            </div>
            
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20" />
          </motion.div>
        );
      })}
    </div>
  </div>
);

const Skills = () => {
  return (
    <motion.section
      className="relative min-h-screen px-4 sm:px-12 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
        {/* Header */}
       <div className="mb-16 relative z-10">
            <div className="flex items-baseline gap-4">
                 <span className="text-blue-500 font-mono text-sm tracking-widest">04 // CAPABILITIES</span>
                 <div className="h-px flex-grow bg-blue-900/50" />
            </div>
            <KineticTypography text="TECH_STACK" className="text-5xl md:text-7xl mt-2" />
        </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12">
        <CyberSkillSection
          title="Programming Languages"
          skills={programmingLanguages}
          accentColor="text-blue-400"
        />
        <CyberSkillSection
          title="Frontend Development"
          skills={frontendDevelopment}
          accentColor="text-cyan-400"
        />
        <CyberSkillSection
          title="Backend & Database"
          skills={backendAndDatabase}
          accentColor="text-emerald-400"
        />
        <CyberSkillSection
          title="Dev Tools & Libraries"
          skills={librariesAndDevTools}
          accentColor="text-purple-400"
        />
        <CyberSkillSection
          title="Cloud & Deployment"
          skills={cloudAndDeployment}
          accentColor="text-amber-400"
        />
         <CyberSkillSection
          title="Design & Content"
          skills={designAndContent}
          accentColor="text-pink-400"
        />
      </div>
    </motion.section>
  );
};

export default Skills;
