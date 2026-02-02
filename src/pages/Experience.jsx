import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronRight, ExternalLink } from "lucide-react";

/* -------------------- Animations -------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -4,
    transition: { duration: 0.3 },
  },
};

/* -------------------- Data -------------------- */

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
      "Worked with REST APIs, authentication, and real-world project workflows.",
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
    // grade: "First Class",
    courses: [
      "Data Structures",
      "Web Development",
      "Database Systems",
      "Software Engineering",
    ],
  },
];

/* -------------------- Component -------------------- */

const Experience = () => {
  return (
    <motion.section
      className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 sm:py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* ---------- Header ---------- */}
      <motion.div className="text-center mb-10" variants={itemVariants}>
        <h2 className="text-2xl sm:text-3xl md:text-[2.2rem] font-semibold text-white">
          My <span className="text-blue-400">Experience</span>
        </h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto mt-2">
          Professional journey and educational background
        </p>
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent w-full max-w-xs mx-auto mt-6"
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

      {/* ---------- Experience Cards ---------- */}
      <div className="max-w-6xl mx-auto space-y-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="group relative"
          >
            <motion.div
              variants={cardHoverVariants}
              className="p-5 sm:p-6 bg-gray-800/50 border border-gray-700 rounded-xl backdrop-blur-sm shadow-lg hover:border-blue-400/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Logo */}
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-16 h-16 rounded-lg bg-gray-900/60 border border-gray-700 flex items-center justify-center group-hover:border-blue-400/40 transition p-2">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-semibold text-white">
                          {exp.role}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-lg text-blue-300 font-medium">
                        {exp.company}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                      <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded-full border border-blue-500/20 w-fit">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="list-disc list-inside space-y-2 text-sm text-gray-300 mb-4">
                    {exp.points.map((point, i) => (
                      <li key={i} className="pl-1">
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tool, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-gray-700/50 text-blue-300 border border-gray-600"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ---------- Education Section ---------- */}
      <motion.div
        className="max-w-6xl mx-auto mt-12"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Education
            </span>{" "}
            & Background
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Formal education that laid the foundation for my technical career
          </p>
        </motion.div>

        {education.map((edu, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            className="group relative"
          >
            <motion.div
              variants={cardHoverVariants}
              className="p-5 sm:p-6 bg-gray-800/40 border border-gray-700 rounded-xl backdrop-blur-sm shadow-lg hover:border-blue-400/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Icon */}
                <div className="flex-shrink-0 flex items-start">
                  <div className="w-16 h-16 rounded-lg bg-gray-900/60 border border-gray-700 flex items-center justify-center group-hover:border-blue-400/40 transition p-2">
                    <span className="text-2xl">
                      <img
                        src="https://www.uni-mysore.in/assets/images/emblem.png"
                        alt=""
                      />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-1">
                        {edu.degree}
                      </h4>
                      <p className="text-lg text-blue-300 font-medium">
                        {edu.institution}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        {edu.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-500/10 text-green-300 rounded-full border border-green-500/20 w-fit">
                        {edu.grade}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-4">
                    Studied computer science fundamentals including programming,
                    databases, web development, and software engineering
                    principles.
                  </p>

                  {/* Courses */}
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-gray-700/50 text-blue-300 border border-gray-600"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* ---------- CTA Section ---------- */}
      <motion.div
        className="text-center mt-12 pt-8 border-t border-gray-800/50 max-w-6xl mx-auto"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <p className="text-gray-400 mb-6">Interested in working together?</p>
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/50 border border-gray-700 text-white font-medium rounded-lg hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 group"
          >
            View Full Resume
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Experience;
