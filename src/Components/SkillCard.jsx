import React from "react";

const SkillCard = ({image,name}) => {
  return (
    <div className="card w-[120px] px-4 py-5 border border-gray-700 bg-gray-900 rounded-xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
      <img
        className="w-12 h-12 object-contain"
        src={image}
        alt={name}
      />
      <h3 className="text-white text-md font-bold mt-3">{name}</h3>
    </div>
  );
};

export default SkillCard;
