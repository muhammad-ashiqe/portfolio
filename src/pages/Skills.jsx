import React from "react";
import { backendAndDatabase, cloudAndDeployment, designAndContent, frontendDevelopment, librariesAndDevTools, paymentGateways, programmingLanguages } from "../assets/data";
import SkillSection from "../Components/SkillSection";
import Divider from "../Components/Divider";

const Skills = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-center">
      <h1 className="text-white text-4xl font-bold">Skills</h1>
      <div className="h-[5px] w-[300px] bg-green-600 mt-8 "></div>

      <div className="skill-dev">
        <SkillSection title="Programming Languages" skills={programmingLanguages} />
        <SkillSection title="Frontend Development" skills={frontendDevelopment} />
        <SkillSection title="Backend Development" skills={backendAndDatabase} />
        <SkillSection title="Dev Tools" skills={librariesAndDevTools} />
        <SkillSection title="Cloud & Deployment" skills={cloudAndDeployment} />
        <SkillSection title="Design & Content" skills={designAndContent} />
        <SkillSection title="Payment Gateways" skills={paymentGateways} />
      </div>

      <div className="h-[5px] w-[600px] bg-green-600 mt-10 mb-20"></div>
    </div>
  );
};

export default Skills;
