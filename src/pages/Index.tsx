import { Navigation } from "@/components/Portfolio/Navigation";
import { Hero } from "@/components/Portfolio/Hero";
import { About } from "@/components/Portfolio/About";
import { Projects } from "@/components/Portfolio/Projects";
import { Skills } from "@/components/Portfolio/Skills";
import { Contact } from "@/components/Portfolio/Contact";
import { Footer } from "@/components/Portfolio/Footer";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useEffect } from "react";
import { PortfolioSkeleton } from "@/components/Portfolio/PortfolioSkeleton";

const Index = () => {
  const { portfolioInfo, projects, skills, contactInfo, loading, refetch } = usePortfolioData();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePortfolioUpdate = () => {
      refetch();
    };

    // Listen for portfolio updates
    window.addEventListener('portfolioUpdated', handlePortfolioUpdate);
    window.addEventListener('storage', handlePortfolioUpdate);

    return () => {
      window.removeEventListener('portfolioUpdated', handlePortfolioUpdate);
      window.removeEventListener('storage', handlePortfolioUpdate);
    };
  }, [refetch]);

  // Update document title when portfolio info changes
  useEffect(() => {
    if (portfolioInfo?.website_name) {
      document.title = `${portfolioInfo.website_name} - Portfolio`;
    }
  }, [portfolioInfo?.website_name]);

  if (loading) {
    return <PortfolioSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Admin Access Button - Stealth Mode */}
      {/* Mobile: Bottom Left, Desktop: Top Left */}
      <div className="fixed bottom-4 left-4 md:bottom-auto md:top-4 z-[60] pointer-events-auto opacity-10 hover:opacity-100 transition-opacity duration-300">
        <Button onClick={() => navigate('/auth')} variant="ghost" size="sm" className="bg-transparent hover:bg-background/80 text-foreground/50 hover:text-foreground">
          <User className="h-4 w-4" />
        </Button>
      </div>

      <Navigation websiteName={portfolioInfo?.website_name} />
      <main>
        <Hero
          key={(portfolioInfo?.updated_at || 'hero') + (portfolioInfo?.hero_subtitle || '')}
          data={portfolioInfo}
          contact={contactInfo}
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
