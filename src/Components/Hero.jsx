import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import KineticTypography from "../Components/overhaul/KineticTypography";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero = () => {
  return (
    <motion.section
      className="relative flex min-h-screen flex-col justify-center px-6 pt-20 sm:px-12 md:px-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div
        className="pointer-events-none absolute right-10 top-32 h-24 w-24 rounded-tr-3xl border-r-2 border-t-2 md:right-32"
        style={{ borderColor: "var(--color-accent-track)" }}
      />
      <div
        className="pointer-events-none absolute bottom-20 left-10 h-16 w-16 rounded-bl-2xl border-b-2 border-l-2 md:left-24"
        style={{ borderColor: "rgba(236, 72, 153, 0.28)" }}
      />

      <div className="z-10 mb-8">
        <motion.p
          variants={itemVariants}
          className="mb-4 font-mono text-sm uppercase tracking-widest md:text-base theme-accent"
        >
          // System Online
        </motion.p>

        <KineticTypography
          text="ASHIQE"
          className="relative z-20 mb-[-1rem] mix-blend-difference md:mb-[-2rem]"
        />
        <KineticTypography text="DEV_" className="opacity-50" />
      </div>

      <motion.div
        variants={itemVariants}
        className="max-w-2xl border-l-4 p-6"
        style={{ borderColor: "var(--color-accent)" }}
      >
        <div
          className="rounded-lg px-1 py-1 backdrop-blur-[2px]"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-overlay-soft) 72%, transparent)",
          }}
        >
          <p className="text-lg font-light leading-relaxed theme-text-secondary md:text-xl">
          Software Engineer building{" "}
          <span className="font-bold theme-text-primary">scalable</span> mobile
          {" "}and web apps with <span className="theme-accent">clean architecture</span>
          {" "}and <span style={{ color: "var(--color-accent-strong)" }}>solid system design</span>.
          </p>
        </div>
      </motion.div>

      <motion.div className="mt-12 flex flex-wrap gap-6" variants={itemVariants}>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-none border px-8 py-3 transition-colors duration-300 theme-border theme-hover-border-strong"
          style={{ backgroundColor: "var(--color-overlay-soft)" }}
        >
          <div className="absolute inset-0 w-0 transition-all duration-[250ms] ease-out group-hover:w-full theme-accent-soft" />
          <span className="group-hover-theme-accent relative flex items-center gap-2 font-mono tracking-wider theme-text-primary">
            VIEW_RESUME <span className="text-xs">-&gt;</span>
          </span>
        </a>

        <Link to="/contact">
          <button
            type="button"
            className="clip-path-slant px-8 py-3 font-bold tracking-wider transition-all duration-300"
            style={{
              backgroundColor: "var(--color-text-primary)",
              color: "var(--color-bg)",
            }}
          >
            CONTACT_ME
          </button>
        </Link>
      </motion.div>

      <motion.div
        className="mt-16 flex items-center gap-8 md:absolute md:bottom-12 md:right-12"
        variants={itemVariants}
      >
        {[
          { icon: "github", url: "https://github.com/muhammad-ashiqe" },
          {
            icon: "linkedin",
            url: "https://www.linkedin.com/in/muhammad-ashiqe",
          },
        ].map((social, i) => (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-hover-text-primary text-2xl theme-text-faint transition-transform duration-300 hover:scale-125"
          >
            <i className={`fa-brands fa-${social.icon}`} />
          </a>
        ))}
        <div className="h-px w-12 theme-border" />
        <a
          href="tel:+919562647893"
          className="group flex items-center gap-2 border px-4 py-2 transition-all duration-300 theme-border theme-hover-border-strong"
          style={{ backgroundColor: "var(--color-overlay-soft)" }}
        >
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--color-success)" }}
          />
          <span className="group-hover-theme-accent text-xs font-mono tracking-widest theme-text-muted">
            REQUEST_A_CALLBACK
          </span>
        </a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
