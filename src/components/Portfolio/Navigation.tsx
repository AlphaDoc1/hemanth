import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Code, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  websiteName?: string;
}

export const Navigation = ({ websiteName }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Nav Items with Icons for both mobile and desktop
  const navigation = [
    { name: "Home", href: "#home", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Contact", href: "#contact", icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Intelligent Scroll Spy
      const sections = navigation.map(item => item.href.substring(1));

      // Find the current section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusted detection zone for better accuracy
          if (rect.top >= -300 && rect.top < 300) {
            setActiveSection(navigation.find(item => item.href === `#${section}`)?.name || "Home");
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false); // Close menu on click
    const element = document.querySelector(href);
    if (element) {
      const offset = 100; // Account for the floating header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* --- DESKTOP FLOATING ISLAND --- */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none hidden lg:flex"
      >
        <div className={cn(
          "pointer-events-auto flex items-center gap-1 p-2 rounded-full transition-all duration-500",
          scrolled
            ? "bg-[#0a0e1a]/90 backdrop-blur-2xl shadow-2xl shadow-primary/20 border border-white/20"
            : "bg-[#0a0e1a]/60 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/50"
        )}>
          {/* Brand Logo inside the island */}
          <div
            onClick={() => scrollToSection('#home')}
            className="pl-5 pr-3 text-lg font-bold text-gradient-brand cursor-pointer hidden lg:block hover:scale-105 transition-transform"
          >
            {websiteName || 'Port.'}
          </div>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-white/10 mx-2 hidden lg:block" />

          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 z-10",
                activeSection === item.name ? "text-white" : "text-muted-foreground hover:text-white"
              )}
            >
              {activeSection === item.name && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 bg-white/10 border border-white/5 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {item.name}
            </button>
          ))}

          {/* CTA */}
          <button
            onClick={() => scrollToSection('#contact')}
            className="ml-2 px-6 py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-bold rounded-full hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/30"
          >
            Hire Me
          </button>
        </div>
      </motion.div>


      {/* --- MOBILE TOP BAR (BRAND & TOGGLE) --- */}
      <div className="lg:hidden fixed top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
        {/* Brand/Profile Placeholder */}
        <div
          className="pointer-events-auto px-5 py-2.5 bg-[#0a0e1a]/80 backdrop-blur-xl border border-white/20 rounded-full shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all cursor-pointer"
          onClick={() => scrollToSection('#home')}
        >
          <span className="font-bold text-gradient-brand text-base">
            {websiteName || 'Port.'}
          </span>
        </div>

        {/* Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="pointer-events-auto p-3 bg-[#0a0e1a]/80 backdrop-blur-xl border border-white/20 rounded-full text-foreground hover:bg-primary/20 hover:border-primary/40 transition-all shadow-xl shadow-primary/10"
        >
          {isMobileMenuOpen ? <X size={20} className="transition-transform rotate-90" /> : <Menu size={20} />}
        </button>
      </div>

      {/* --- MOBILE GLASS DOCK (TOGGLABLE) --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-sm bg-[#0a0e1a]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-3 shadow-2xl shadow-primary/20">
              <div className="grid grid-cols-5 gap-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300",
                      activeSection === item.name ? "text-primary" : "text-[#888] hover:text-white"
                    )}
                  >
                    <item.icon
                      size={activeSection === item.name ? 22 : 20}
                      strokeWidth={activeSection === item.name ? 2.5 : 1.5}
                      className={cn("transition-all duration-300 mb-1", activeSection === item.name && "drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]")}
                    />

                    {/* Optional: Label for better UX on slightly larger mobile screens, hidden on very small ones if needed */}
                    <span className="text-[10px] font-medium leading-none opacity-80">{item.name}</span>

                    {activeSection === item.name && (
                      <motion.span
                        layoutId="mobile-indicator"
                        className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_2px_hsl(var(--primary))]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};