import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ThemeToggle } from "@/components/Portfolio/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { PortfolioInfoForm } from "@/components/Admin/PortfolioInfoForm";
import { ProjectsManager } from "@/components/Admin/ProjectsManager";
import { SkillsManager } from "@/components/Admin/SkillsManager";
import { ContactInfoForm } from "@/components/Admin/ContactInfoForm";

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!supabase) {
      navigate("/auth", { replace: true });
      return;
    }
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const handleDataSaved = () => {
    // Dispatch custom event to trigger portfolio data refresh
    window.dispatchEvent(new CustomEvent("portfolioUpdated"));
    // Trigger local storage event for cross-tab synchronisation
    localStorage.setItem("portfolio-update-timestamp", Date.now().toString());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="page-width py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="eyebrow mb-3">Portfolio / Workspace</p>
            <h1 className="text-xl sm:text-2xl font-bold">Portfolio Admin</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Welcome back, Admin
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <ThemeToggle />
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full sm:w-auto text-sm"
            >
              View Portfolio
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full sm:w-auto text-sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="page-width admin-main">
        <Tabs defaultValue="portfolio" className="admin-workspace">
          <TabsList className="admin-tabs" aria-label="Portfolio management">
            <TabsTrigger value="portfolio" className="text-xs sm:text-sm">
              Portfolio Info
            </TabsTrigger>
            <TabsTrigger value="projects" className="text-xs sm:text-sm">
              Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs sm:text-sm">
              Skills
            </TabsTrigger>
            <TabsTrigger value="contact" className="text-xs sm:text-sm">
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <PortfolioInfoForm
              userId={user?.id}
              onDataSaved={handleDataSaved}
            />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager userId={user?.id} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager userId={user?.id} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactInfoForm userId={user?.id} onDataSaved={handleDataSaved} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
