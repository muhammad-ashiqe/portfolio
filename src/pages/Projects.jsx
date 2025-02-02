import React from "react";
import ProjectCard from "../Components/ProjectCard";
import { projects } from "../assets/data";

const Projects = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 text-center">
      <h1 className="text-white text-4xl font-bold">Projects</h1>
      <div className="h-[5px] w-[300px] bg-green-600 mt-10 mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            image={project.image}
            title={project.title}
            description={project.description}
            tools={project.tools}
            github={project.github}
            demo={project.demo}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
