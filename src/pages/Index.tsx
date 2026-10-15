import { Navigation } from "@/components/Portfolio/Navigation";
import { Hero } from "@/components/Portfolio/Hero";
import { About } from "@/components/Portfolio/About";
import { Projects } from "@/components/Portfolio/Projects";
import { Skills } from "@/components/Portfolio/Skills";
import { Contact } from "@/components/Portfolio/Contact";
import { Footer } from "@/components/Portfolio/Footer";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useEffect, useRef } from "react";
import { PortfolioSkeleton } from "@/components/Portfolio/PortfolioSkeleton";

const Index = () => {
  const main = useRef<HTMLElement>(null);
  const {
    portfolioInfo,
    projects,
    skills,
    contactInfo,
    loading,
    refetch,
    source,
  } = usePortfolioData();

  useEffect(() => {
    const handlePortfolioUpdate = () => {
      refetch();
    };

    // Listen for portfolio updates
    window.addEventListener("portfolioUpdated", handlePortfolioUpdate);
    window.addEventListener("storage", handlePortfolioUpdate);

    return () => {
      window.removeEventListener("portfolioUpdated", handlePortfolioUpdate);
      window.removeEventListener("storage", handlePortfolioUpdate);
    };
  }, [refetch]);

  // Update document title when portfolio info changes
  useEffect(() => {
    if (portfolioInfo?.website_name) {
      document.title = `${portfolioInfo.website_name} - Portfolio`;
    }
  }, [portfolioInfo?.website_name]);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.IntersectionObserver
    )
      return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: "translateY(12px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 450, easing: "cubic-bezier(.2,.65,.3,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );
    main.current
      ?.querySelectorAll(
        ".section-heading, .project-study, .skill-category, .journey, .contact-form",
      )
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [portfolioInfo, projects, skills]);

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation websiteName={portfolioInfo?.website_name} />
      <main id="main-content" tabIndex={-1} ref={main}>
        {source !== "live" && (
          <div className="portfolio-notice page-width" role="status">
            <span className="eyebrow">
              {source === "loading" ? "Loading portfolio" : "Frontend preview"}
            </span>
            <p>
              {source === "loading"
                ? "Loading your saved portfolio…"
                : source === "unavailable"
                  ? "Saved portfolio data is temporarily unavailable. Sample content is shown below."
                  : "Sample content — explore the design and interactions."}
            </p>
            {source === "unavailable" && (
              <button className="text-action" onClick={() => void refetch()}>
                Try again ↗
              </button>
            )}
          </div>
        )}
        <Hero
          key={
            (portfolioInfo?.updated_at || "hero") +
            (portfolioInfo?.hero_subtitle || "")
          }
          data={portfolioInfo}
          contact={contactInfo}
          featuredProject={projects[0]}
        />
        <About data={portfolioInfo} />
        <Projects data={projects} />
        <Skills data={skills} />
        <Contact data={contactInfo} />
      </main>
      <Footer portfolio={portfolioInfo} contact={contactInfo} />
    </div>
  );
};

export default Index;
