import { ArrowUpRight, Github, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";
import { SectionHeading } from "./SectionHeading";
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
    const resize = () => setVisibleCount(window.innerWidth < 768 ? 3 : 6);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const projects = data;
  return (
    <section id="projects" className="portfolio-section page-width">
      <SectionHeading
        number="02"
        label="Selected Work"
        title="Featured Projects"
      >
        Exploring innovative solutions through code, design, and engineering
        excellence.
      </SectionHeading>
      {!projects.length && (
        <p className="section-intro">No featured projects yet.</p>
      )}
      <div id="project-list">
        {(showAll ? projects : projects.slice(0, visibleCount)).map(
          (project, index) => (
            <article
              key={project.id}
              className={`project-study project-tone-${index % 3}`}
            >
              <div className="project-visual">
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.image_url &&
                project.image_url !== "/placeholder.svg" ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="stack-visual" aria-hidden="true">
                    <div className="stack-visual-heading">
                      <span>Technology overview</span>
                      <span>↗</span>
                    </div>
                    <div className="stack-diagram">
                      {(project.technologies || [])
                        .slice(0, 4)
                        .map((tech, i) => (
                          <div className="stack-diagram-row" key={i}>
                            <span className="stack-order">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{tech}</span>
                            <span className="stack-port" />
                          </div>
                        ))}
                    </div>
                    <div className="stack-visual-footer">{project.title}</div>
                  </div>
                )}
              </div>
              <div className="project-copy">
                <p className="eyebrow">
                  Project / {String(index + 1).padStart(2, "0")}
                </p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <p className="eyebrow stack-label">Built with</p>
                <div className="tech-tags">
                  {(project.technologies || []).map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github size={16} /> Source code{" "}
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live demo`}
                    >
                      Live project <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ),
        )}
      </div>
      {projects.length > visibleCount && (
        <div className="section-action">
          <button
            className="action action-outline"
            aria-expanded={showAll}
            aria-controls="project-list"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View More Projects"}
            {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      )}
    </section>
  );
};
