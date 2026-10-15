import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import {
  previewPortfolio,
  previewProjects,
  previewSkills,
  previewContact,
} from "@/data/portfolioPreview";

type Portfolio = Partial<Tables<"portfolio_info">> &
  Partial<typeof previewPortfolio>;
type Skill = Pick<Tables<"skills">, "id" | "name"> & {
  category:
    "aiml" | "frontend" | "backend" | "framework" | "database" | "tools";
  percentage?: number;
};
type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image_url?: string;
  github_url?: string;
  demo_url?: string;
};
type Content = {
  portfolioInfo: Portfolio;
  projects: Project[];
  skills: Skill[];
  contactInfo: Partial<Tables<"contact_info">>;
};
const preview: Content = {
  portfolioInfo: previewPortfolio,
  projects: previewProjects,
  skills: previewSkills,
  contactInfo: previewContact,
};

export function usePortfolioData() {
  const [content, setContent] = useState<Content>(preview);
  const [source, setSource] = useState<
    "loading" | "preview" | "live" | "unavailable"
  >(supabase ? "loading" : "preview");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const request = useRef<AbortController | null>(null);
  const liveContent = useRef(false);

  const refetch = useCallback(async () => {
    if (!supabase) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    try {
      let query = supabase.from("portfolio_info").select("*");
      if (currentUserId) query = query.eq("user_id", currentUserId);
      const { data: portfolio, error } = await query
        .order("updated_at", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(1)
        .abortSignal(controller.signal)
        .maybeSingle();
      if (controller.signal.aborted) return;
      if (error) throw error;
      if (!portfolio) {
        // A successful but empty database must not look like saved sample projects.
        setContent({
          portfolioInfo: {},
          projects: [],
          skills: [],
          contactInfo: {},
        });
        liveContent.current = true;
        setSource("live");
        return;
      }
      const [projects, skills, contact] = await Promise.all([
        supabase
          .from("projects")
          .select("*")
          .eq("user_id", portfolio.user_id)
          .eq("is_featured", true)
          .order("sort_order", { ascending: true })
          .abortSignal(controller.signal),
        supabase
          .from("skills")
          .select("*")
          .eq("user_id", portfolio.user_id)
          .order("category", { ascending: true })
          .order("sort_order", { ascending: true })
          .abortSignal(controller.signal),
        supabase
          .from("contact_info")
          .select("*")
          .eq("user_id", portfolio.user_id)
          .abortSignal(controller.signal)
          .maybeSingle(),
      ]);
      if (controller.signal.aborted) return;
      const failure = projects.error || skills.error || contact.error;
      if (failure) throw failure;
      setContent({
        portfolioInfo: portfolio,
        projects: projects.data || [],
        skills: (skills.data || []) as Skill[],
        contactInfo: contact.data || {},
      });
      liveContent.current = true;
      setSource("live");
    } catch {
      if (controller.signal.aborted) return;
      // Keep already loaded real content during a transient refresh failure.
      if (!liveContent.current) {
        setContent(preview);
        setSource("unavailable");
      }
    }
  }, [currentUserId]);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    void supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (active) setCurrentUserId(session?.user.id || null);
      })
      .catch(() => {
        /* Public reads can still work without an auth session. */
      });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setCurrentUserId(session?.user.id || null);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    void refetch();
    return () => request.current?.abort();
  }, [refetch]);

  // Render the complete frontend immediately, then replace preview content atomically.
  return { ...content, loading: false, source, refetch, currentUserId };
}
