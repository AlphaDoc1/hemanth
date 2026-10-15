import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, User } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [text, setText] = useState("");
  const fullText = data ? (data.hero_subtitle || "") : "Building efficient, scalable systems.";

  // Custom Typewriter Effect
  useEffect(() => {
    // Immediate reset
    setText("");

    if (!fullText) {
      return;
    }

    let index = 0;
    const typing = setInterval(() => {
      index++;
      // Use substring for deterministic rendering based on current string
      // This prevents race conditions or state mismatches
      setText(fullText.substring(0, index));

      if (index >= fullText.length) {
        clearInterval(typing);
      }
    }, 50); // Speed of typing

    return () => clearInterval(typing);
  }, [fullText]);

  const normalizeUrl = (url?: string) => {
    if (!url) return undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const githubUrl = normalizeUrl(contact?.github_url) || "https://github.com";
  const linkedinUrl = normalizeUrl(contact?.linkedin_url) || "https://linkedin.com";
  const emailHref = `mailto:${contact?.email || "savanthhemanth@gmail.com"}`;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32 md:pb-0">

      {/* Enhanced Background */}
      <div className="absolute inset-0 w-full h-full bg-background">
        {/* Multi-layer Gradient Orbs */}
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-purple-600/10 blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-secondary/20 to-cyan-400/10 blur-[140px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-[100px] opacity-50" />
      </div>

      <div className="container px-4 md:px-6 relative z-10 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-24 -mt-12 md:mt-0">

        {/* Left Content (Text) */}
        <div className="flex-1 text-center md:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full border border-secondary/30 bg-gradient-to-r from-secondary/10 to-primary/10 backdrop-blur-sm shadow-lg shadow-secondary/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-gradient-brand">Available for work</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.05]">
              <span className="text-gradient">{data?.hero_title || "Creative Developer"}</span>
              <span className="text-gradient-brand inline-block animate-pulse-glow">.</span>
            </h1>

            <div className="h-12 flex items-center justify-center md:justify-start">
              <p className="text-xl md:text-2xl text-muted-foreground font-mono">
                {text}
                <span className="animate-blink">|</span>
              </p>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary-glow flex items-center gap-2 group shadow-xl"
            >
              <span>View Work</span>
              <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-tech"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex items-center gap-6 text-muted-foreground pt-6 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:border-primary/50 hover:bg-primary/10 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20">
              <Github className="w-5 h-5" />
            </a>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:border-secondary/50 hover:bg-secondary/10 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-secondary/20">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={emailHref} className="p-3 rounded-full border border-white/10 hover:border-accent/50 hover:bg-accent/10 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accent/20">
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Content / Image */}
        <motion.div
          className="relative w-64 h-64 md:w-[480px] md:h-[480px] flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* Enhanced Decorative Rings */}
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-[spin_12s_linear_infinite] shadow-[0_0_30px_rgba(124,58,237,0.2)]" />
          <div className="absolute inset-6 rounded-full border border-secondary/20 animate-[spin_18s_linear_infinite_reverse] shadow-[0_0_30px_rgba(6,182,212,0.2)]" />
          <div className="absolute inset-12 rounded-full border border-accent/20 animate-[spin_25s_linear_infinite] shadow-[0_0_20px_rgba(16,185,129,0.2)]" />

          <div className="absolute inset-10 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl shadow-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay" />
            {data?.profile_image_url ? (
              <img
                src={data?.profile_image_url}
                alt="Profile"
                className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 text-zinc-600">
                <User size={80} className="opacity-50" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};