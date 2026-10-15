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
  } | null;
}

export const Hero = ({ data, contact }: HeroProps) => {
  const normalizeUrl = (url?: string) =>
    !url ? undefined : /^https?:\/\//.test(url) ? url : `https://${url}`;
  return (
    <section id="home" className="hero page-width">
      <div className="hero-topline">
        <span className="eyebrow">AI / ML & Software Development</span>
        <span className="availability">
          <i aria-hidden="true" /> Available for work
        </span>
      </div>
      <div className="hero-layout">
        <div className="hero-copy">
          <h1>
            {data?.hero_title || "Creative Developer"}
            <span className="accent">.</span>
          </h1>
          <p className="hero-subtitle">
            {data
              ? data.hero_subtitle
              : "Building efficient, scalable systems."}
          </p>
          <div className="hero-actions">
            <a className="action action-primary" href="#projects">
              View Work <ArrowUpRight size={18} />
            </a>
            <a className="action action-outline" href="#contact">
              Contact Me <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="social-links">
            <a
              href={normalizeUrl(contact?.github_url) || "https://github.com"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={17} /> GitHub
            </a>
            <a
              href={
                normalizeUrl(contact?.linkedin_url) || "https://linkedin.com"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={17} /> LinkedIn
            </a>
            <a href={`mailto:${contact?.email || "savanthhemanth@gmail.com"}`}>
              <Mail size={17} /> Email
            </a>
          </div>
        </div>
        <figure
          className={
            data?.profile_image_url
              ? "hero-portrait has-portrait"
              : "hero-portrait"
          }
        >
          <div className="portrait-frame">
            {data?.profile_image_url ? (
              <img
                src={data.profile_image_url}
                alt={
                  data.hero_title
                    ? `Portrait of ${data.hero_title}`
                    : "Profile portrait"
                }
                fetchPriority="high"
              />
            ) : (
              <div className="engineering-board" aria-hidden="true">
                <div className="board-top">
                  <span>Engineering perspective</span>
                  <span>↗</span>
                </div>
                <div className="board-statement">
                  Ideas into
                  <br />
                  <span>working</span>
                  <br />
                  software.
                </div>
                <div className="board-system">
                  <span className="system-node">Engineering</span>
                  <span className="system-connector" />
                  <span className="system-node">Design</span>
                  <span className="system-connector" />
                  <span className="system-node">Execution</span>
                </div>
                <div className="board-bottom">
                  <span>Thoughtfully designed.</span>
                  <span>Carefully built.</span>
                </div>
              </div>
            )}
          </div>
          <figcaption>
            <span>Engineering. Design. Execution.</span>
            <span aria-hidden="true">↗</span>
          </figcaption>
        </figure>
      </div>
      <a href="#about" className="hero-bottom">
        <span className="eyebrow">Explore the portfolio</span>
        <ArrowDown size={18} />
      </a>
    </section>
  );
};
