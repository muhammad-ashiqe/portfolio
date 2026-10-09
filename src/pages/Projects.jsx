import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "react-feather";
import ProjectCard from "../Components/ProjectCard";
import { projects } from "../assets/data";
import KineticTypography from "../Components/overhaul/KineticTypography";

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const totalProjects = projects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.section
      className="relative min-h-screen overflow-hidden px-4 py-20 sm:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative z-10 mb-16">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm tracking-widest theme-accent">
            02 // WORKS
          </span>
          <div className="h-px flex-grow" style={{ backgroundColor: "var(--color-accent-track)" }} />
        </div>
        <KineticTypography text="PROJECT_VAULT" className="mt-2 text-5xl md:text-7xl" />
      </div>

      <div className="perspective-1000 mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        <AnimatePresence mode="wait">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.title + currentPage}
              initial={{ opacity: 0, scale: 0.9, rotateY: 10, x: 50 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -10, x: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative ${index % 2 === 1 ? "md:translate-y-12" : ""}`}
            >
              <div
                className="relative h-full p-[1px] transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(to bottom, color-mix(in srgb, var(--color-accent) 55%, transparent), transparent)",
                }}
              >
                <div className="relative z-10 h-full p-4 theme-surface">
                  <ProjectCard {...project} />
                </div>

                <div
                  className="absolute left-0 top-0 h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
                <div
                  className="absolute bottom-0 right-0 h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-20 mx-auto mt-24 flex max-w-md items-center justify-between rounded-full border p-4 backdrop-blur theme-border theme-surface">
        <button
          type="button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="theme-hover-accent p-2 transition-colors disabled:opacity-30"
        >
          <ChevronLeft />
        </button>

        <span className="font-mono tracking-widest theme-text-secondary">
          PAGE {currentPage.toString().padStart(2, "0")} /{" "}
          {totalPages.toString().padStart(2, "0")}
        </span>

        <button
          type="button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="theme-hover-accent p-2 transition-colors disabled:opacity-30"
        >
          <ChevronRight />
        </button>
      </div>
    </motion.section>
  );
};

export default Projects;
