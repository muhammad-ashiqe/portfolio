import { MagneticLink } from "./Motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, Download } from "lucide-react";
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
            ASHIQE<span className="signal">.</span>
            <span className="outline-word">DEV_</span>
          </h1>
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
          <ExternalLink className="text-link" href={profile.resume}>
            VIEW_RESUME <Download size={15} />
          </ExternalLink>
        </div>
      </div>
      <div className="hero-rail">
        <div className="social-links">
          {profile.socials.map((s) => (
            <ExternalLink href={s.url} key={s.label}>
              {s.label}
              <ArrowUpRight size={13} />
            </ExternalLink>
          ))}
        </div>
        <a href={profile.phone} className="callback">
          REQUEST_A_CALLBACK <ArrowUpRight size={14} />
        </a>
        <Link to="/overview" className="overview-link">
          Quick overview <ArrowDownRight size={18} />
        </Link>
      </div>
    </section>
  );
}
