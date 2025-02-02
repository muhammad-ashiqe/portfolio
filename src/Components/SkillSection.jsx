import React from "react";
import SkillCard from "./SkillCard";

const SkillSection = ({ title, skills }) => {
  return (
    <div className="mb-5 mt-8">
      <h2 className="text-2xl text-white">{title}</h2>
      <hr className="h-[2px] w-[900px] mt-3 mb-8 bg-gray-700" />
      <div className="flex gap-8 flex-wrap items-center justify-center">
        {skills.map((item, index) => (
          <SkillCard key={index} image={item.image} name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default SkillSection;
