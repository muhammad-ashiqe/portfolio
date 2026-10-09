import React from "react";
import { motion } from "framer-motion";
import {
  backendAndDatabase,
  cloudAndDeployment,
  designAndContent,
  frontendDevelopment,
  librariesAndDevTools,
  programmingLanguages,
} from "../assets/data";
import KineticTypography from "../Components/overhaul/KineticTypography";

const CyberSkillSection = ({ title, skills, accentColor }) => (
  <div className="mb-12">
    <h3
      className="mb-6 border-l-4 pl-4 font-mono text-xl uppercase"
      style={{ color: accentColor, borderColor: "currentColor" }}
    >
      {title}
    </h3>
    <div className="flex flex-wrap gap-4">
      {skills.map((skill, index) => {
        const IconComponent = skill.icon;
        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1, backgroundColor: "var(--color-accent-soft)" }}
            className="group relative overflow-hidden border px-4 py-3 backdrop-blur-sm theme-border theme-surface"
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-20"
              style={{ backgroundColor: accentColor }}
            />

            <div className="relative z-10 flex items-center gap-3">
              {IconComponent && (
                <IconComponent
                  className="h-6 w-6 grayscale transition-all group-hover:grayscale-0"
                  style={{ color: skill.color || accentColor }}
                />
              )}
              <span className="group-hover-theme-text-primary text-sm font-bold uppercase tracking-wide theme-text-secondary">
                {skill.name}
              </span>
            </div>

            <div className="absolute right-0 top-0 h-2 w-2 border-r border-t theme-border" />
            <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l theme-border" />
          </motion.div>
        );
      })}
    </div>
  </div>
);

const Skills = () => {
  return (
    <motion.section
      className="relative min-h-screen px-4 py-20 sm:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative z-10 mb-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm tracking-widest theme-accent">
            04 // CAPABILITIES
          </span>
          <div className="h-px flex-grow" style={{ backgroundColor: "var(--color-accent-track)" }} />
        </div>
        <KineticTypography text="TECH_STACK" className="mt-2 text-5xl md:text-7xl" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-12 md:grid-cols-2">
        <CyberSkillSection
          title="Programming Languages"
          skills={programmingLanguages}
          accentColor="#60a5fa"
        />
        <CyberSkillSection
          title="Frontend Development"
          skills={frontendDevelopment}
          accentColor="#38bdf8"
        />
        <CyberSkillSection
          title="Backend & Database"
          skills={backendAndDatabase}
          accentColor="#34d399"
        />
        <CyberSkillSection
          title="Dev Tools & Libraries"
          skills={librariesAndDevTools}
          accentColor="#c084fc"
        />
        <CyberSkillSection
          title="Cloud & Deployment"
          skills={cloudAndDeployment}
          accentColor="#fbbf24"
        />
        <CyberSkillSection
          title="Design & Content"
          skills={designAndContent}
          accentColor="#f472b6"
        />
      </div>
    </motion.section>
  );
};

export default Skills;
