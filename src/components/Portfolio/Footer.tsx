import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

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
  const currentYear = new Date().getFullYear();
  const displayName = portfolio?.hero_title || portfolio?.website_name || "Portfolio";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/20 bg-gradient-to-b from-[#0a0e1a]/95 to-[#0a0e1a]/80 backdrop-blur-2xl pt-12 pb-3 overflow-hidden shadow-[0_-10px_50px_-10px_rgba(124,58,237,0.1)]">

      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent -z-10" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-2">
            <h2 className="text-xl md:text-2xl font-bold text-gradient-brand mb-2 md:mb-3">
              {displayName}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md text-xs md:text-sm">
              Building digital experiences with passion and precision. Let's create something meaningful together.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-foreground mb-2 md:mb-3 text-sm md:text-base">Navigation</h3>
            <ul className="space-y-1.5 md:space-y-2">
              {["About", "Projects", "Skills", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-muted-foreground hover:text-primary transition-all text-sm md:text-base group flex items-center gap-2"
                  >
                    <span className="w-0 h-0.5 bg-primary group-hover:w-4 transition-all"></span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-bold text-foreground mb-2 md:mb-3 text-sm md:text-base">Connect</h3>
            <div className="flex gap-3 md:gap-4 flex-wrap">
              <a href={contact?.github_url || "#"} target="_blank" className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-primary/50 hover:bg-primary/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
                <Github size={20} className="md:hidden" />
                <Github size={22} className="hidden md:block" />
              </a>
              <a href={contact?.linkedin_url || "#"} target="_blank" className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-secondary/50 hover:bg-secondary/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-secondary/20">
                <Linkedin size={20} className="md:hidden" />
                <Linkedin size={22} className="hidden md:block" />
              </a>
              <a href={`mailto:${contact?.email}`} className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:border-accent/50 hover:bg-accent/10 transition-all hover:scale-110 hover:shadow-lg hover:shadow-accent/20">
                <Mail size={20} className="md:hidden" />
                <Mail size={22} className="hidden md:block" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-xs text-muted-foreground">© {currentYear} {displayName}. Crafted with precision and passion.</p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-white/10 hover:border-primary/50 hover:from-primary/20 text-xs font-semibold text-muted-foreground hover:text-primary transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};