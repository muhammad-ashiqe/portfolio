import React from "react";
import { motion } from "framer-motion";
import KineticTypography from "../Components/overhaul/KineticTypography";

const experiences = [
  {
    company: "Behind The Scene App",
    role: "Software Engineer",
    duration: "2025 - Present",
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
    duration: "2024 - 2025",
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
    duration: "2021 - 2024",
    location: "Mysore, India",
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
      className="relative min-h-screen px-4 py-20 sm:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative z-10 mb-20">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm tracking-widest theme-accent">
            03 // TIMELINE
          </span>
          <div className="h-px flex-grow" style={{ backgroundColor: "var(--color-accent-track)" }} />
        </div>
        <KineticTypography text="EXP_LOGS" className="mt-2 text-5xl md:text-7xl" />
      </div>

      <div
        className="relative mx-auto max-w-4xl border-l-2 border-dashed pl-8 md:ml-0 md:pl-0"
        style={{ borderColor: "var(--color-border-strong)" }}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative mb-16"
          >
            <div
              className="absolute top-0 h-4 w-4 rotate-45 origin-center transform border md:-left-[9px] -left-[41px]"
              style={{
                backgroundColor: "var(--color-accent)",
                borderColor: "var(--color-accent-strong)",
              }}
            />

            <div className="group border p-6 backdrop-blur transition-colors md:ml-12 theme-border theme-panel theme-hover-border-strong">
              <div className="mb-4 flex flex-col justify-between md:flex-row">
                <div>
                  <h3 className="group-hover-theme-accent text-2xl font-bold theme-text-primary transition-colors">
                    {exp.role}
                  </h3>
                  <p className="mt-1 font-mono text-sm theme-accent">
                    {exp.company}
                  </p>
                </div>
                <div className="mt-2 text-right md:mt-0">
                  <p className="font-mono text-sm theme-text-secondary">
                    {exp.duration}
                  </p>
                  <p className="text-xs theme-text-muted">{exp.location}</p>
                </div>
              </div>

              <ul className="mb-6 space-y-2 text-sm font-light theme-text-secondary">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="theme-accent">▹</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tool, i) => (
                  <span
                    key={i}
                    className="border px-2 py-1 text-xs font-mono uppercase"
                    style={{
                      backgroundColor: "var(--color-accent-soft)",
                      borderColor: "color-mix(in srgb, var(--color-accent) 28%, transparent)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="relative mb-16 mt-24">
          <div
            className="absolute top-0 h-4 w-4 rotate-45 origin-center transform border md:-left-[9px] -left-[41px]"
            style={{ backgroundColor: "#a855f7", borderColor: "#c084fc" }}
          />

          <div className="md:ml-12">
            <h2
              className="mb-8 inline-block border-b pb-4 text-4xl font-bold text-transparent bg-clip-text"
              style={{
                borderColor: "var(--color-border)",
                backgroundImage:
                  "linear-gradient(90deg, #a855f7, var(--color-accent))",
              }}
            >
              ACADEMY_ARCHIVE
            </h2>

            {education.map((edu, index) => (
              <div key={index} className="border p-6 theme-border theme-panel">
                <h3 className="text-xl font-bold theme-text-primary">
                  {edu.degree}
                </h3>
                <p style={{ color: "#a855f7" }} className="font-mono">
                  {edu.institution}
                </p>
                <p className="mt-1 text-sm theme-text-muted">{edu.duration}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {edu.courses.map((c, i) => (
                    <span
                      key={i}
                      className="border px-2 py-1 text-xs theme-text-secondary"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      {c}
                    </span>
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
