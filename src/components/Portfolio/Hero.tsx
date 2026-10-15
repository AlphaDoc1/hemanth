import { SpatialScene } from "./SpatialScene";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowDown } from "lucide-react";

interface HeroProps {
  data?: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_image_url?: string;
    profile_image_url?: string;
  };
  contact?: {
    email?: string;
    github_url?: string;
    linkedin_url?: string;
    location?: string;
  } | null;
  featuredProject?: {
    id: string;
    title: string;
    image_url?: string;
    technologies: string[];
  };
}
export const Hero = ({ data, contact }: HeroProps) => {
  const normalizeUrl = (url?: string) =>
    !url ? undefined : /^https?:\/\//.test(url) ? url : `https://${url}`;
  const title = data?.hero_title || "Creative Developer";
  const words = title.split(" ");
  const lastWord = words.pop();
  return (
    <section id="home" className="hero page-width">
      <div className="hero-topline">
        <span className="eyebrow">
          <span className="small-star" aria-hidden="true">
            ↳
          </span>{" "}
          Code. Curiosity. A little imagination.
        </span>
        <span className="availability">
          <i aria-hidden="true" /> Available for work
        </span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          {(data?.profile_image_url || data?.hero_image_url) && (
            <img
              className="hero-avatar"
              src={data.profile_image_url || data.hero_image_url}
              alt="Profile portrait"
              fetchPriority="high"
            />
          )}
          <h1>
            {words.join(" ")}
            {words.length > 0 && " "}
            <span className="hero-title-end">
              {lastWord}
              <span className="hero-period">.</span>
            </span>
          </h1>
          <p className="hero-subtitle">
            {data?.hero_subtitle || "Building efficient, scalable systems."}
          </p>
          <div className="hero-actions">
            <a className="action action-primary" href="#projects">
              Explore my work <ArrowDown size={17} />
            </a>
            <a className="hero-contact-link" href="#contact">
              Let's talk <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-social-row">
            <span className="eyebrow">Find me on</span>
            <div className="social-links">
              <a
                href={normalizeUrl(contact?.github_url) || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={
                  normalizeUrl(contact?.linkedin_url) || "https://linkedin.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${contact?.email || "savanthhemanth@gmail.com"}`}
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        <SpatialScene />
      </div>
      <div className="hero-bottom">
        <span className="hero-location">
          {contact?.location || "Bengaluru, Whitefield"}
          <span>Open to meaningful collaborations</span>
        </span>
        <a href="#about">
          <span className="eyebrow">A little more about me</span>
          <ArrowDown size={17} />
        </a>
      </div>
    </section>
  );
};
