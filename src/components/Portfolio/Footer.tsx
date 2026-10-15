import { ArrowUpRight, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
interface FooterProps {
  portfolio?: {
    hero_title?: string;
    hero_subtitle?: string;
    website_name?: string;
  } | null;
  contact?: {
    email?: string;
    github_url?: string;
    linkedin_url?: string;
  } | null;
}

export const Footer = ({ portfolio, contact }: FooterProps) => {
  const name = portfolio?.hero_title || portfolio?.website_name || "Portfolio";
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-top">
          <div>
            <h2>{name}</h2>
            <p>
              Building digital experiences with passion and precision. Let's
              create something meaningful together.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {["About", "Projects", "Skills", "Contact"].map((name) => (
              <a key={name} href={`#${name.toLowerCase()}`}>
                {name}
              </a>
            ))}
          </nav>
          <nav aria-label="Social links">
            <a
              href={contact?.github_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={14} />
            </a>
            <a
              href={contact?.linkedin_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={14} />
            </a>
            <a href={`mailto:${contact?.email || ""}`}>
              Email <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {name}. Crafted with precision and
            passion.
          </p>
          <Link to="/auth">Admin access</Link>
          <a href="#home">
            Back to Top <ArrowUp size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
};
