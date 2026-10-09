import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const Section = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className={cn("w-full mb-20 last:mb-0", className)}
  >
    {children}
  </motion.div>
);

export const SectionTitle = ({ children, subtitle, align = "left" }) => (
  <div className={cn("mb-12", align === "center" && "text-center")}>
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="w-20 h-1 bg-primary rounded-full"
        style={{ margin: align === "center" ? "0 auto" : "0" }}
      />
    )}
  </div>
);

export const Badge = ({ children, className }) => (
  <span className={cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    className
  )}>
    {children}
  </span>
);

Section.propTypes = { children: PropTypes.node, className: PropTypes.string, delay: PropTypes.number };

SectionTitle.propTypes = { children: PropTypes.node, subtitle: PropTypes.string, align: PropTypes.string };

Badge.propTypes = { children: PropTypes.node, className: PropTypes.string };
