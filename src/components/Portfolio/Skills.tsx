import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
interface Skill {
  id: string;
  name: string;
  category:
    "frontend" | "backend" | "framework" | "database" | "aiml" | "tools";
  percentage?: number;
}
const categories = [
  ["aiml", "AI & Machine Learning"],
  ["frontend", "Frontend Engineering"],
  ["backend", "Backend Systems"],
  ["framework", "Frameworks"],
  ["database", "Databases"],
  ["tools", "DevOps & Tools"],
];
function SkillCategory({
  id,
  title,
  skills,
  number,
}: {
  id: string;
  number: number;
  title: string;
  skills: Skill[];
}) {
  const [showAll, setShowAll] = useState(false);
  if (!skills.length) return null;
  return (
    <article className="skill-category">
      <div className="skill-category-title">
        <span className="eyebrow">{String(number).padStart(2, "0")}</span>
        <h3>{title}</h3>
      </div>
      <div id={`skills-${id}`} className="skill-items">
        {(showAll ? skills : skills.slice(0, 5)).map((skill) => (
          <div className="skill-row" key={skill.id}>
            <div>
              <span>{skill.name}</span>
              {typeof skill.percentage === "number" && (
                <span className="skill-value">{skill.percentage}%</span>
              )}
            </div>
            {typeof skill.percentage === "number" && (
              <meter
                min="0"
                max="100"
                value={skill.percentage}
                aria-label={`${skill.name} proficiency`}
              >
                {skill.percentage}%
              </meter>
            )}
          </div>
        ))}
      </div>
      {skills.length > 5 && (
        <button
          className="text-action"
          aria-controls={`skills-${id}`}
          aria-expanded={showAll}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Close" : `View All (${skills.length - 5}+)`}
          {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      )}
    </article>
  );
}
export const Skills = ({ data = [] }: { data?: Skill[] }) => (
  <section id="skills" className="portfolio-section page-width">
    <SectionHeading
      number="03"
      label="Capabilities"
      title="Technical Proficiency"
    >
      Constantly evolving with cutting-edge technologies and best practices to
      deliver exceptional solutions.
    </SectionHeading>
    <div className="skills-layout">
      {categories.map(([id, title], index) => (
        <SkillCategory
          key={id}
          id={id}
          number={index + 1}
          title={title}
          skills={data.filter((s) => s.category === id)}
        />
      ))}
    </div>
  </section>
);
