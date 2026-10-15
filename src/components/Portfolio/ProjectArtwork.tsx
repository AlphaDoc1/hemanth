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
        {technologies.slice(0, 2).join(" / ") || "Software engineering"}
      </span>
      <svg viewBox="0 0 600 360" fill="none">
        <g transform="translate(300 180)">
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={-105 + i * 3}
              y={-105 + i * 3}
              width={210 - i * 6}
              height={210 - i * 6}
              rx={variant % 3 === 1 ? 70 : 4}
              transform={`rotate(${i * 8})`}
            />
          ))}
        </g>
      </svg>
      <span className="art-index">
        {String(variant + 1).padStart(2, "0")} / PROJECT STUDY
      </span>
    </div>
  );
}
