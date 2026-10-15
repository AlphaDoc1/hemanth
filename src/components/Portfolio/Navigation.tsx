import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const navigation = ["Home", "About", "Projects", "Skills", "Contact"];
export const Navigation = ({ websiteName }: { websiteName?: string }) => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => {
      let current = "home";
      for (const name of navigation) {
        const el = document.getElementById(name.toLowerCase());
        if (el && el.getBoundingClientRect().top <= 160)
          current = name.toLowerCase();
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 800) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="page-width header-inner">
        <a className="wordmark" href="#home" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            /
          </span>
          {websiteName || "Port."}
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "main-nav is-open" : "main-nav"}
        >
          {navigation.map((name) => (
            <a
              key={name}
              href={`#${name.toLowerCase()}`}
              aria-current={
                active === name.toLowerCase() ? "location" : undefined
              }
              onClick={() => setOpen(false)}
            >
              {name}
            </a>
          ))}
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Hire Me <ArrowUpRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  );
};
