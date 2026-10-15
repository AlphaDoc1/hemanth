import { ArrowUpRight, Github, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { SectionHeading } from "./SectionHeading";
import { ProjectArtwork } from "./ProjectArtwork";
interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
}
export const Projects = ({ data = [] }: { data?: Project[] }) => {
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [filter, setFilter] = useState<string | null>(null);
  useEffect(() => {
    const resize = () => setVisibleCount(window.innerWidth < 768 ? 3 : 6);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  const filters = useMemo(
    () => [...new Set(data.flatMap((p) => p.technologies || []))].slice(0, 5),
    [data],
  );
  const activeFilter = filter && filters.includes(filter) ? filter : null;
  const projects = activeFilter
    ? data.filter((p) => p.technologies?.includes(activeFilter))
    : data;
  return (
    <section id="projects" className="portfolio-section page-width">
      <SectionHeading
        number="01"
        label="Selected work"
        title="Ideas, made real."
      >
        Exploring innovative solutions through code, design, and engineering
        excellence.
      </SectionHeading>
      {data.length > 0 && (
        <div className="project-toolbar">
          <div
            className="project-filters"
            aria-label="Filter projects by technology"
          >
            <button
              aria-pressed={!activeFilter}
              onClick={() => {
                setFilter(null);
                setShowAll(false);
              }}
            >
              All work <span>{data.length}</span>
            </button>
            {filters.map((tech) => (
              <button
                key={tech}
                aria-pressed={activeFilter === tech}
                onClick={() => {
                  setFilter(tech);
                  setShowAll(false);
                }}
              >
                {tech}
              </button>
            ))}
          </div>
          <span className="eyebrow project-count">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
      )}
      {!projects.length && (
        <p className="section-intro">No featured projects yet.</p>
      )}
      <div id="project-list" className="project-grid">
        {(showAll ? projects : projects.slice(0, visibleCount)).map(
          (project, index) => (
            <article
              key={project.id}
              id={`project-${project.id}`}
              className={`project-study ${index === 0 ? "project-featured" : ""}`}
            >
              <div className="project-visual">
                <ProjectArtwork
                  title={project.title}
                  technologies={project.technologies}
                  image={project.image_url}
                  variant={index}
                />
              </div>
              <div className="project-copy">
                <div className="project-kicker">
                  <span className="eyebrow">
                    {index === 0 ? "In focus" : "Selected project"}
                  </span>
                  <span className="eyebrow">
                    /{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
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
                      <Github size={15} /> Source code{" "}
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live demo`}
                    >
                      Live project <ArrowUpRight size={15} />
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
            {showAll ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
          </button>
        </div>
      )}
    </section>
  );
};
