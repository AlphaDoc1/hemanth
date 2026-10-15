import { motion } from "framer-motion";
import { Code, Palette, Rocket, Users, Terminal } from "lucide-react";

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

export const About = ({ data }: AboutProps) => {
  const features = [
    {
      icon: Code,
      title: "Engineering",
      description: "Robust, scalable architecture."
    },
    {
      icon: Rocket,
      title: "Optimization",
      description: "High-performance execution."
    },
    {
      icon: Palette,
      title: "UX/UI Design",
      description: "Intuitive digital experiences."
    },
    {
      icon: Users,
      title: "Leadership",
      description: "Driving technical excellence."
    }
  ];

  return (
    <section id="about" className="pt-24 pb-20 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] -z-10" />
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-gradient">{data?.about_title || "About Me"}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            {data?.about_content || "Passionate about bridging the gap between complex backend logic and beautiful frontend interfaces."}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Stats/Features Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {features.map((feature, idx) => (
              <div key={idx} className="tech-card group hover:scale-[1.02] active:scale-[0.98]">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient-brand transition-all">{feature.title}</h4>
                <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Right: The Journey/Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            {/* Decorative border wrapper */}
            <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-[#0a0e1a]/80 to-[#0a0e1a]/60 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/10">
              {/* Terminal Header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <Terminal size={16} className="text-primary" />
                <span className="text-sm text-foreground/80 font-mono font-semibold">user_bio.txt</span>
                <div className="flex-1" />
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40 hover:bg-red-500/60 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40 hover:bg-yellow-500/60 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40 hover:bg-green-500/60 transition-colors" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 space-y-6">
                <h3 className="text-3xl font-bold text-gradient-brand">
                  {data?.journey_title || "My Journey"}
                </h3>

                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  {data?.journey_content ? (
                    data.journey_content.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-base md:text-lg group/line hover:text-foreground/90 transition-colors">
                        <span className="text-primary/60 mr-3 font-mono text-lg font-bold">{`>`}</span>
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-base md:text-lg hover:text-foreground/90 transition-colors">
                      <span className="text-primary/60 mr-3 font-mono text-lg font-bold">{`>`}</span>
                      Starting as a curious builder, I've evolved into a systems thinker. I focus on creating software that matters, paying equal attention to code quality and user experience.
                    </p>
                  )}
                </div>

                {/* Tech Pills */}
                <div className="pt-8 border-t border-white/10">
                  <p className="text-xs font-mono text-muted-foreground/80 mb-5 uppercase tracking-widest font-semibold">Core Technologies</p>
                  <div className="flex flex-wrap gap-3">
                    {(data?.journey_technologies ?
                      data.journey_technologies.split(',').map(tech => tech.trim()).filter(tech => tech) :
                      ["React", "TypeScript", "Node.js", "AWS", "Docker", "PostgreSQL"]
                    ).map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 bg-gradient-to-r from-primary/10 to-transparent text-sm md:text-base text-foreground border border-primary/20 rounded-xl hover:border-primary/50 hover:bg-primary/20 hover:scale-105 transition-all cursor-default shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};