import { SectionHeading } from "./SectionHeading";
interface AboutProps {
  data?: {
    about_title?: string;
    about_content?: string;
    profile_image_url?: string;
    journey_title?: string;
    journey_content?: string;
    journey_technologies?: string;
  };
}

const principles = [
  ["Engineering", "Robust, scalable architecture."],
  ["Optimization", "High-performance execution."],
  ["UX/UI Design", "Intuitive digital experiences."],
  ["Leadership", "Driving technical excellence."],
];
export const About = ({ data }: AboutProps) => (
  <section id="about" className="portfolio-section page-width">
    <SectionHeading
      number="02"
      label="About"
      title={data?.about_title || "About Me"}
    >
      {data?.about_content ||
        "Passionate about bridging the gap between complex backend logic and beautiful frontend interfaces."}
    </SectionHeading>
    <div className="about-layout">
      <div className="principles">
        {principles.map(([title, description], i) => (
          <div className="principle" key={title}>
            <span className="eyebrow">0{i + 1}</span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        ))}
      </div>
      <article className="journey">
        <p className="eyebrow">Background & perspective</p>
        <h3>{data?.journey_title || "My Journey"}</h3>
        <div className="prose">
          {(
            data?.journey_content ||
            "Starting as a curious builder, I've evolved into a systems thinker. I focus on creating software that matters, paying equal attention to code quality and user experience."
          )
            .split("\n")
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
        <div className="journey-stack">
          <p className="eyebrow">Core Technologies</p>
          <div className="tech-tags">
            {(data?.journey_technologies
              ? data.journey_technologies
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
              : [
                  "React",
                  "TypeScript",
                  "Node.js",
                  "AWS",
                  "Docker",
                  "PostgreSQL",
                ]
            ).map((tech, i) => (
              <span key={i}>{tech}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  </section>
);
