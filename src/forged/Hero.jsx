import { MagneticLink } from "./Motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Github,
  Linkedin,
  Phone,
} from "lucide-react";
import { profile } from "./content";
import { ExternalLink } from "./ui";
import Core from "./three/Core";
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-topline">
        <span className="eyebrow">
          <i className="status-dot" /> System Online
        </span>
        <span className="eyebrow">01 / CORE</span>
      </div>
      <div className="hero-composition">
        <div className="hero-title">
          <p className="eyebrow">MUHAMMAD</p>
          <h1>
            <span className="hero-name-line">
              <span className="hero-name">
                <span className="name-fill">ASHIQE</span>
                <span className="name-overlap" aria-hidden="true">
                  ASHIQE
                </span>
              </span>
              <span className="signal">.</span>
            </span>
            <span className="outline-word">DEV_</span>
          </h1>
          <div className="hero-profile-links">
            {profile.socials.map((s) => (
              <ExternalLink
                className="button profile-button"
                key={s.label}
                href={s.url}
              >
                {s.label === "github" ? (
                  <Github size={17} />
                ) : (
                  <Linkedin size={17} />
                )}
                {s.label}
              </ExternalLink>
            ))}
            <ExternalLink
              className="button profile-button"
              href={profile.resume}
            >
              <Download size={17} />
              View Resume
            </ExternalLink>
          </div>
        </div>
        <div className="hero-art">
          <Core />
          <span className="art-coordinate coord-top">
            FIG. 01 — ENGINEERING CORE
          </span>
          <span className="art-coordinate coord-bottom">
            INTERFACE / SERVICES / DATA
          </span>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="intro-block">
          <span className="tiny-cross" aria-hidden="true">
            +
          </span>
          <p>{profile.introduction}</p>
        </div>
        <div className="hero-actions">
          <MagneticLink className="button primary" to="/projects">
            Explore Work <ArrowUpRight size={19} />
          </MagneticLink>
          <Link className="text-link" to="/contact">
            Contact <ArrowUpRight size={16} />
          </Link>
          <a href={profile.phone} className="button callback">
            <Phone size={17} />
            Request a Callback
          </a>
        </div>
      </div>
      <div className="hero-rail">
        <Link to="/overview" className="overview-link">
          Quick overview <ArrowDownRight size={18} />
        </Link>
      </div>
    </section>
  );
}
