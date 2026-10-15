import { ArrowUpRight, Check, Code2, Layers, LayoutGrid } from "lucide-react";

// A decorative project cover, never presented as a screenshot or real analytics.
export function ProjectArtwork({
  title,
  technologies = [],
  image,
  variant = 0,
}: {
  title: string;
  technologies?: string[];
  image?: string;
  variant?: number;
}) {
  if (image && image !== "/placeholder.svg")
    return (
      <img
        className="project-image"
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
      />
    );
  const type = variant % 3;
  return (
    <div className={`project-art art-${type}`} aria-hidden="true">
      <div className="art-grid" />
      <div className="art-window">
        <div className="art-window-bar">
          <span className="art-window-brand">
            <Layers size={12} /> Workspace
          </span>
          <span className="art-dots">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="art-window-body">
          <div className="art-sidebar">
            <LayoutGrid size={13} />
            <span />
            <span />
            <span />
            <Code2 size={13} />
          </div>
          <div className="art-content">
            <div className="art-heading">
              <span>
                {type === 1
                  ? "Project board"
                  : type === 2
                    ? "Overview"
                    : "Your workspace"}
              </span>
              <span className="art-small-button">
                <ArrowUpRight size={12} />
              </span>
            </div>
            <div className="art-rule" />
            {type === 1 ? (
              <div className="art-kanban">
                {["To do", "In progress", "Done"].map((label, i) => (
                  <div key={label}>
                    <span className="art-column-label">{label}</span>
                    {[0, 1, 2].slice(i === 1 ? 1 : 0).map((n) => (
                      <div className="art-task" key={n}>
                        <i />
                        <span />
                        <span />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : type === 2 ? (
              <div className="art-chart">
                <div className="art-chart-grid" />
                <svg viewBox="0 0 300 125" preserveAspectRatio="none">
                  <path
                    d="M0 108 C25 108 20 60 52 72 S95 115 122 60 S150 90 180 48 S210 82 240 36 S275 40 300 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>
                <div className="art-chart-key">
                  <i /> Project illustration
                </div>
              </div>
            ) : (
              <>
                <div className="art-modules">
                  <div>
                    <span className="art-module-symbol">↗</span>
                    <span className="art-module-line" />
                    <span className="art-module-line short" />
                  </div>
                  <div>
                    <span className="art-module-symbol">
                      <Code2 size={22} />
                    </span>
                    <span className="art-module-line" />
                    <span className="art-module-line short" />
                  </div>
                </div>
                <div className="art-activity">
                  {[0, 1].map((i) => (
                    <div key={i}>
                      <Check size={10} />
                      <span />
                      <span />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="art-stack-sticker">
        <span className="art-sticker-icon">
          <Code2 size={16} />
        </span>
        <div>
          <span>Built with</span>
          <strong>
            {technologies.slice(0, 2).join(" + ") || "Software & design"}
          </strong>
        </div>
      </div>
      <span className="art-caption">
        Project illustration / {String(type + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
