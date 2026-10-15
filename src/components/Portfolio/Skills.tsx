import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  PanelsTopLeft,
  Server,
  Layers3,
  Database,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
interface Skill {
  id: string;
  name: string;
  category:
    "frontend" | "backend" | "framework" | "database" | "aiml" | "tools";
}
const categories: {
  id: Skill["category"];
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description: "Working with data and intelligent systems.",
    icon: BrainCircuit,
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Interfaces that bring ideas to life.",
    icon: PanelsTopLeft,
  },
  {
    id: "backend",
    title: "Backend Systems",
    description: "The logic and services behind the experience.",
    icon: Server,
  },
  {
    id: "framework",
    title: "Frameworks",
    description: "Building blocks for modern applications.",
    icon: Layers3,
  },
  {
    id: "database",
    title: "Databases",
    description: "Organizing, storing, and connecting data.",
    icon: Database,
  },
  {
    id: "tools",
    title: "DevOps & Tools",
    description: "From the local workspace to deployment.",
    icon: Terminal,
  },
];
function SkillCategory({
  id,
  title,
  description,
  icon: Icon,
  skills,
  number,
}: {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  skills: Skill[];
}) {
  const [showAll, setShowAll] = useState(false);
  if (!skills.length) return null;
  return (
    <article className={`skill-category skill-domain-${id}`}>
      <div className="skill-card-top">
        <span className="skill-domain-icon" aria-hidden="true">
          <Icon size={25} strokeWidth={1.6} />
        </span>
        <span className="eyebrow">/{String(number).padStart(2, "0")}</span>
      </div>
      <div className="skill-category-title">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <ul
        id={`skills-${id}`}
        className="skill-items"
        aria-label={`${title} technologies`}
      >
        {(showAll ? skills : skills.slice(0, 5)).map((skill) => (
          <li className="skill-tag" key={skill.id}>
            <span aria-hidden="true" className="skill-tag-dot" />
            {skill.name}
          </li>
        ))}
      </ul>
      {skills.length > 5 && (
        <button
          className="text-action"
  );
}
export const Skills = ({ data = [] }: { data?: Skill[] }) => (
  <section id="skills" className="portfolio-section page-width skills-section">
    <SectionHeading
      number="03"
      label="The toolkit"
      title="Tools behind the work."
    >
      The languages, frameworks, and tools I use to turn ideas into working
      software.
    </SectionHeading>
    <div className="skills-layout">
      {categories.map((category, index) => (
        <SkillCategory
          key={category.id}
          {...category}
          number={index + 1}
          skills={data.filter((s) => s.category === category.id)}
        />
      ))}
    </div>
    {!data.length && (
      <p className="skills-empty">
        My toolkit is being updated. Explore my projects to see the technologies
        in use.
      </p>
    )}
  </section>
);
