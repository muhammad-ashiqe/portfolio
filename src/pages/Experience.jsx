import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronRight, ExternalLink } from "lucide-react";
import KineticTypography from "../components/overhaul/KineticTypography";

/* -------------------- Data (Preserved) -------------------- */
const experiences = [
  {
    company: "Behind The Scene App",
    role: "Software Engineer",
    duration: "2024 – Present",
    location: "Trivandrum",
    type: "Full-time",
    logo: "https://play-lh.googleusercontent.com/jQ0F61ikSFYtN5u9nVAnjHnm9MhVLQqyQQzPS0APYRtp2zUIIVUT0XI3PfmEgSG-lZrJ=w240-h480-rw",
    points: [
      "Developing robust and scalable backend services using NestJS and TypeScript.",
      "Implementing and managing database systems with MySQL using Prisma ORM.",
      "Building high-quality cross-platform mobile applications using Flutter.",
      "Contributing across the full development lifecycle from API design to deployment and maintenance.",
    ],
    tech: ["NestJS", "TypeScript", "MySQL", "Prisma", "Flutter"],
  },
  {
    company: "Luminar Technolab",
    role: "MERN Stack Intern",
    duration: "8 Months Internship",
    location: "Kochi, India",
    type: "Internship",
    logo: "https://d3eqn3hw2x95rk.cloudfront.net/seo/og_images/logo_qZlpEoR.png",
    points: [
      "Completed an intensive 8-month internship focused on MERN stack development.",
      "Built full-stack applications using MongoDB, Express, React, and Node.js.",
      "Working with REST APIs, authentication, and real-world project workflows.",
      "Strengthened core software engineering concepts and best practices.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
  },
];

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "University of Mysore",
    duration: "2021 – 2024",
    location: "Mysore, India",
    // grade: "First Class", // Commented out in original
    courses: [
      "Data Structures",
      "Web Development",
      "Database Systems",
      "Software Engineering",
    ],
  },
];

const Experience = () => {
  return (
    <motion.section
      className="relative min-h-screen px-4 sm:px-12 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
       {/* Header */}
       <div className="mb-20 relative z-10">
            <div className="flex items-baseline gap-4">
                 <span className="text-blue-500 font-mono text-sm tracking-widest">03 // TIMELINE</span>
                 <div className="h-px flex-grow bg-blue-900/50" />
            </div>
            <KineticTypography text="EXP_LOGS" className="text-5xl md:text-7xl mt-2" />
        </div>

      <div className="max-w-4xl mx-auto relative border-l-2 border-dashed border-gray-800 ml-4 md:ml-0 pl-8 md:pl-0">
        
        {/* Experience Stream */}
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="mb-16 relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] md:-left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-none border border-blue-400 rotate-45 transform origin-center" />

            <div className="md:ml-12 p-6 bg-gray-900/40 border border-gray-800 backdrop-blur hover:border-blue-500/50 transition-colors group">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                 <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
                    <p className="text-blue-500 font-mono text-sm mt-1">{exp.company}</p>
                 </div>
                 <div className="text-right mt-2 md:mt-0">
                    <p className="text-gray-400 font-mono text-sm">{exp.duration}</p>
                    <p className="text-gray-500 text-xs">{exp.location}</p>
                 </div>
              </div>

              <ul className="space-y-2 mb-6 text-gray-300 font-light text-sm">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-500">▹</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tool, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono uppercase">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Education Segment */}
         <div className="mt-24 mb-16 relative">
            <div className="absolute -left-[41px] md:-left-[9px] top-0 w-4 h-4 bg-purple-600 rounded-none border border-purple-400 rotate-45 transform origin-center" />
            
            <div className="md:ml-12">
                 <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-8 border-b border-gray-800 pb-4 inline-block">
                    ACADEMY_ARCHIVE
                 </h2>

                 {education.map((edu, index) => (
                     <div key={index} className="p-6 bg-gray-900/40 border border-purple-900/30">
                        <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-purple-400 font-mono">{edu.institution}</p>
                        <p className="text-sm text-gray-500 mt-1">{edu.duration}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                            {edu.courses.map((c, i) => (
                                <span key={i} className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded-sm">{c}</span>
                            ))}
                        </div>
                     </div>
                 ))}
            </div>
         </div>

      </div>
    </motion.section>
  );
};

export default Experience;
