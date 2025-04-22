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
import SkillSection from "../Components/SkillSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const Skills = () => {
  return (
    <motion.div
      className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Section Header */}
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-2">
          My <span className="text-blue-400">Skills</span>
        </h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Technologies I use to craft great web experiences.
        </p>
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent w-full max-w-xs mx-auto mt-6 "
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: {
              scaleX: 1,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              },
            },
          }}
        />
      </motion.div>

      {/* Skill Categories */}
      <div className="grid gap-6 sm:gap-7 max-w-5xl mx-auto">
        <SkillSection
          title="Programming Languages"
          skills={programmingLanguages}
          accentColor="text-blue-400"
          icon="fa-code"
        />
        <SkillSection
          title="Frontend Development"
          skills={frontendDevelopment}
          accentColor="text-cyan-400"
          icon="fa-laptop-code"
        />
        <SkillSection
          title="Backend & Database"
          skills={backendAndDatabase}
          accentColor="text-emerald-400"
          icon="fa-server"
        />
        <SkillSection
          title="Dev Tools & Libraries"
          skills={librariesAndDevTools}
          accentColor="text-purple-400"
          icon="fa-tools"
        />
        <SkillSection
          title="Cloud & Deployment"
          skills={cloudAndDeployment}
          accentColor="text-amber-400"
          icon="fa-cloud"
        />
        <SkillSection
          title="Design & Content"
          skills={designAndContent}
          accentColor="text-pink-400"
          icon="fa-palette"
        />
        <SkillSection
          title="Payment Gateways"
          skills={paymentGateways}
          accentColor="text-green-400"
          icon="fa-credit-card"
        />
      </div>
    </motion.div>
  );
};

export default Skills;
