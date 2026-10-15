import {
  ArrowUpRight,
  Blocks,
  Gauge,
  PenTool,
  Users,
  Code2,
  Sparkles,
} from "lucide-react";
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
  {
    title: "Engineering",
    description: "Robust, scalable architecture.",
    detail: "Built on solid foundations",
    icon: Blocks,
  },
  {
    title: "Optimization",
    description: "High-performance execution.",
    detail: "Every interaction counts",
    icon: Gauge,
  },
  {
    title: "UX/UI Design",
    description: "Intuitive digital experiences.",
    detail: "Clarity in every detail",
    icon: PenTool,
  },
  {
    title: "Leadership",
    description: "Driving technical excellence.",
    detail: "Better work, together",
    icon: Users,
  },
];
export const About = ({ data }: AboutProps) => {
  const technologies = data?.journey_technologies
    ? data.journey_technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : ["React", "TypeScript", "Node.js", "AWS", "Docker", "PostgreSQL"];
  return (
    <section id="about" className="portfolio-section page-width about-section">
      <SectionHeading
        number="02"
        label="The person behind the code"
        title={data?.about_title || "About Me"}
      >
        {data?.about_content ||
          "Passionate about bridging the gap between complex backend logic and beautiful frontend interfaces."}
      </SectionHeading>
      <div className="about-layout">
        <article className="journey">
          <div className="story-top">
            <span className="story-icon" aria-hidden="true">
              <Sparkles size={20} />
            </span>
            <span className="eyebrow">Curiosity → Craft</span>
            <span className="story-index" aria-hidden="true">
              02
            </span>
          </div>
          <h3>{data?.journey_title || "My Journey"}</h3>
          <div className="prose">
            {(
              data?.journey_content ||
              "Starting as a curious builder, I've evolved into a systems thinker. I focus on creating software that matters, paying equal attention to code quality and user experience."
            )
              .split("\n")
              .filter((p) => p.trim())
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
          <div className="story-bottom">
            <span className="story-note">
              From a first idea
              <br />
              <strong>to something that works.</strong>
            </span>
            <a href="#projects" className="story-link">
              Explore my work <ArrowUpRight size={18} />
            </a>
          </div>
        </article>
        <div className="about-practice">
          <p className="eyebrow practice-label">What I bring to the work</p>
          <div className="principles">
            {principles.map(({ title, description, detail, icon: Icon }, i) => (
              <article className="principle" key={title}>
                <div className="principle-top">
                  <span className="principle-icon" aria-hidden="true">
                    <Icon size={21} />
                  </span>
                  <span className="eyebrow">0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className="principle-detail">{detail}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="about-toolbox">
        <div className="toolbox-label">
          <Code2 size={22} aria-hidden="true" />
          <div>
            <p className="eyebrow">My everyday toolkit</p>
            <p>Tools that turn ideas into software.</p>
          </div>
        </div>
        <div className="tech-tags">
          {technologies.map((tech, i) => (
            <span key={`${tech}-${i}`}>{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
