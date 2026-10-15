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
  return (
    <div className={`project-art art-${variant % 3}`} aria-hidden="true">
      <span className="art-caption">
        CONCEPT / {String(variant + 1).padStart(2, "0")}
      </span>
      <div className="cover-scene">
        {variant % 3 === 0 ? (
          <div className="cover-browser">
            <div className="cover-chrome">
              <i />
              <i />
              <i />
              <span>Design meets engineering</span>
            </div>
            <div className="cover-browser-body">
              <div className="cover-orbit" />
              <div className="cover-type">
                Built to
                <br />
                <strong>work better.</strong>
              </div>
              <div className="cover-pill">Explore the possibilities ↗</div>
            </div>
          </div>
        ) : variant % 3 === 1 ? (
          <div className="cover-phone">
            <div className="phone-speaker" />
            <span className="phone-greeting">Make room for</span>
            <strong>
              good
              <br />
              ideas.
            </strong>
            <div className="phone-shapes">
              <i />
              <i />
              <i />
            </div>
            <span className="phone-button">Let’s get started ↗</span>
          </div>
        ) : (
          <div className="cover-stack">
            <div />
            <div />
            <div>
              <span>✳</span>
              <strong>
                Think beyond
                <br />
                the ordinary.
              </strong>
            </div>
          </div>
        )}
      </div>
      <span className="art-index">
        {technologies.slice(0, 2).join(" + ")} · Illustration
      </span>
    </div>
  );
}
