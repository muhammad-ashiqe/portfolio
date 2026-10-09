import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
export function ScrollProgress() {
  const bar = useRef();
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance =
          document.documentElement.scrollHeight - window.innerHeight;
        if (bar.current)
          bar.current.style.transform = `scaleX(${distance > 0 ? Math.min(window.scrollY / distance, 1) : 0})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      ref={bar}
      className="scroll-progress"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}

export function MagneticLink({ to, children, className }) {
  const reduced = useReducedMotion();
  const reset = (event) => {
    event.currentTarget.style.transform = "";
  };
  return (
    <Link
      to={to}
      className={className}
      onPointerMove={(event) => {
        if (
          reduced ||
          !window.matchMedia("(hover:hover) and (pointer:fine)").matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.07}px,${(event.clientY - rect.top - rect.height / 2) * 0.07}px)`;
      }}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </Link>
  );
}
MagneticLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};
