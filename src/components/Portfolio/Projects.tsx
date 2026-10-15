import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp, Folder } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  data?: Array<{
    id: string;
    title: string;
    description: string;
    image_url?: string;
    technologies: string[];
    github_url?: string;
    demo_url?: string;
  }>;
}

export const Projects = ({ data = [] }: ProjectsProps) => {
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      // Mobile (< 768px) -> Show 3
      // Desktop (>= 768px) -> Show 6
      if (window.innerWidth < 768) {
        setVisibleCount(3);
      } else {
        setVisibleCount(6);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, cart management, and payment processing.",
      image: "/placeholder.svg",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      demo: "#"
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/placeholder.svg",
      tech: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
      github: "#",
      demo: "#"
    },
    {
      id: "3",
      title: "AI-Powered Analytics",
      description: "Data analytics dashboard with machine learning insights, interactive charts, and predictive analysis capabilities.",
      image: "/placeholder.svg",
      tech: ["Python", "Django", "TensorFlow", "D3.js"],
      github: "#",
      demo: "#"
    },
    {
      id: "4",
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication, transaction history, and financial planning tools.",
      image: "/placeholder.svg",
      tech: ["React Native", "Firebase", "Redux", "Expo"],
      github: "#",
      demo: "#"
    }
  ];

  // Use data from props if available, otherwise use default projects
  const displayData = data.length > 0 ? data : projects;
  const projectsToShow = showAll ? displayData : displayData.slice(0, visibleCount);

  return (
    <section id="projects" className="pt-20 pb-20 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 -skew-y-2 transform origin-top-left -z-10" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1.5 w-16 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]" />
            <span className="text-gradient-brand font-mono tracking-widest text-sm uppercase font-bold">Selected Work</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Featured <span className="text-gradient-brand">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">Exploring innovative solutions through code, design, and engineering excellence.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsToShow.length > 0 ? projectsToShow.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group tech-card p-0 flex flex-col h-full border-gradient hover:border-gradient transition-all duration-500 bg-gradient-to-br from-[#0a0e1a]/60 to-[#0a0e1a]/40"
            >
              {/* Image Window */}
              <div className="relative overflow-hidden aspect-video w-full border-b border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800">
                {/* Enhanced Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

                <img
                  src={project.image_url || ((project as any).image) || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />

                {/* Enhanced Floating Actions */}
                <div className="absolute top-4 right-4 flex gap-3 z-20 translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <a href={project.github_url || (project as any).github} target="_blank" className="p-2.5 bg-black/70 backdrop-blur-md rounded-xl text-white hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 hover:scale-110 transition-all shadow-lg">
                    <Github size={18} />
                  </a>
                  <a href={project.demo_url || (project as any).demo} target="_blank" className="p-2.5 bg-black/70 backdrop-blur-md rounded-xl text-white hover:bg-gradient-to-r hover:from-secondary hover:to-cyan-400 hover:scale-110 transition-all shadow-lg">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Content Box */}
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-gradient-brand transition-all duration-300">
                    {project.title}
                  </h3>
                  <Folder className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack Footer */}
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
                  {(project.technologies || (project as any).tech || []).map((t: string, i: number) => (
                    <span key={i} className="text-xs font-mono text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-32 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Folder className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No Projects Yet</h3>
                <p className="text-muted-foreground">Projects are loading or coming soon...</p>
              </div>
            </div>
          )}
        </div>

        {displayData.length > visibleCount && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 hover:border-primary/50 bg-gradient-to-r from-white/5 to-transparent hover:from-primary/10 hover:to-primary/5 transition-all duration-300 shadow-lg hover:shadow-primary/20"
            >
              <span className="text-sm font-semibold">{showAll ? "Show Less" : "View More Projects"}</span>
              {showAll ? <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> : <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};