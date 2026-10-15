import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, ChevronUp, Cpu, Database, Layout, Server, Wrench, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillsProps {
  data?: Array<{
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'framework' | 'database' | 'aiml' | 'tools';
    percentage: number;
  }>;
}

const SkillBar = ({ skill, percentage, delay }: { skill: string, percentage: number, delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay }}
      className="mb-5 group"
    >
      <div className="flex justify-between items-end mb-3">
        <span className="font-semibold text-base text-foreground group-hover:text-gradient-brand transition-all">{skill}</span>
        <span className="text-sm font-mono text-primary font-bold">{percentage}%</span>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="h-2 bg-white/5 rounded-full overflow-hidden relative shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-secondary absolute top-0 left-0 shadow-[0_0_10px_rgba(124,58,237,0.5)]"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
        >
          {/* Glowing Tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.9)] opacity-90" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const SkillCategoryCard = ({ title, icon: Icon, skills, delay }: { title: string, icon: any, skills: any[], delay: number }) => {
  const [showAll, setShowAll] = useState(false);
  const skillsToShow = showAll ? skills : skills.slice(0, 5);

  if (skills.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="tech-card bg-gradient-to-br from-[#0a0e1a]/70 to-[#0a0e1a]/50 hover:from-[#0a0e1a]/90 hover:to-[#0a0e1a]/70 border-white/10 hover:border-primary/30"
    >
      <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-5">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-bold text-gradient-brand">{title}</h3>
      </div>

      <div className="space-y-1">
        {skillsToShow.map((item, index) => (
          <SkillBar
            key={item.id}
            skill={item.name}
            percentage={item.percentage}
            delay={0.05 * index}
          />
        ))}
      </div>

      {skills.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-2 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors border-t border-white/5"
        >
          {showAll ? "Close" : `View All (${skills.length - 5}+)`}
          {showAll ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      )}
    </motion.div>
  );
};

export const Skills = ({ data = [] }: SkillsProps) => {
  // Group logic
  const skillsByCategory = data.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  const categories = [
    { id: 'aiml', title: 'AI & Machine Learning', icon: Brain },
    { id: 'frontend', title: 'Frontend Engineering', icon: Layout },
    { id: 'backend', title: 'Backend Systems', icon: Server },
    { id: 'framework', title: 'Frameworks', icon: Cpu },
    { id: 'database', title: 'Databases', icon: Database },
    { id: 'tools', title: 'DevOps & Tools', icon: Wrench },
  ];

  return (
    <section id="skills" className="pt-20 pb-20 relative overflow-hidden">
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Technical <br /><span className="text-gradient-neural">Proficiency</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              Constantly evolving with cutting-edge technologies and best practices to deliver exceptional solutions.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <SkillCategoryCard
              key={cat.id}
              title={cat.title}
              icon={cat.icon}
              skills={skillsByCategory[cat.id] || []}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};