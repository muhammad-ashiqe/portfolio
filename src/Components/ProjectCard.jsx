import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ image, title, description, tools, github, demo }) => {
  return (
    <div className="relative group w-80 h-96 bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg cursor-pointer">
      {/* Project Image */}
      <div className="w-full h-40">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Project Content */}
      <div className="p-4 flex flex-col h-[calc(100%-160px)]">
        {/* Project Title */}
        <h3 className="text-xl font-bold">{title}</h3>

        {/* Scrollable Description */}
        <p className="text-sm text-gray-300 mt-2 h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
          {description}
        </p>

        {/* Tools Used */}
        <p className="text-xs text-green-400 mt-3">Tools: {tools.join(", ")}</p>

        {/* Hover Icons (GitHub & View) */}
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-white text-3xl hover:text-gray-400 transition" />
          </a>
          <a href={demo} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt className="text-white text-3xl hover:text-gray-400 transition" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
