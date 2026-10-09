import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export function SectionHeading({ number, label, title, punctuate = true }) {
  return (
    <header className="section-heading">
      <p className="eyebrow">
        <span>{number}</span> / {label}
      </p>
      <h1>
        {title}
        {punctuate && (
          <span className="signal" aria-hidden="true">
            .
          </span>
        )}
      </h1>
    </header>
  );
}
SectionHeading.propTypes = {
  punctuate: PropTypes.bool,
  number: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
};
export function ExternalLink({ href, children, className = "" }) {
  const local = href.startsWith("/") && !href.startsWith("//");
  if (local && !href.endsWith(".pdf"))
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  return (
    <a
      href={href}
      className={className}
      target={
        href.startsWith("https:") || href.endsWith(".pdf")
          ? "_blank"
          : undefined
      }
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};
